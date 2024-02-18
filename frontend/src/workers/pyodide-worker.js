self.importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

let message = "";
const postMessage = (status, msg) => self.postMessage({ lang: "python", output: { status, msg } });

async function waitPyodideReady() {
  const indexURL = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/";
  const stderr = (msg) => (message += msg + "\n");
  const stdout = (msg) => (message += msg + "\n");
  self.pyodide = await loadPyodide({ indexURL, stdout, stderr });
}

self.onmessage = async (event) => {
  const { data, ...context } = event.data;

  // add all the context to the worker
  for (const key of Object.keys(context)) self[key] = context[key];

  if (!self.pyodide) {
    postMessage("loading", "Python is not ready, please wait...");
    await waitPyodideReady();
  }

  // only run the code if the language is python
  const { lang, code } = event.data;
  if (lang === "python") {
    if (!code) postMessage("error", "Python code is empty");
    else {
      try {
        postMessage("running", "Python is running, please wait...");
        await self.pyodide.runPythonAsync(code);
        postMessage("success", message.trim());
      } catch (err) {
        postMessage("error", err.message);
      } finally {
        message = "";
      }
    }
  }
};
