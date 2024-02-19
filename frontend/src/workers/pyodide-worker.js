self.importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

let message = "";
let pyodide = null;

const stderr = (msg) => (message += msg + "\n");
const stdout = (msg) => (message += msg + "\n");
const postmessage = (status, msg) => self.postMessage({ lang: "python", output: { status, msg } });

async function waitPyodideReady() {
  postmessage("loading", "Python is loading, please wait...");
  pyodide = await loadPyodide({ stdout, stderr });
  postmessage("idle", "Python is ready");
}

self.onmessage = async (event) => {
  const { data, ...context } = event.data;

  // only run the code if the language is python
  const { lang, code } = event.data;
  if (lang === "python") {
    // add all the context to the worker
    for (const key of Object.keys(context)) self[key] = context[key];

    // wait for pyodide to be ready
    if (!pyodide) await waitPyodideReady();

    if (!code) postmessage("error", "Python code is empty");
    else {
      try {
        postmessage("running", "Python is running, please wait...");
        await pyodide.loadPackagesFromImports(code);
        await pyodide.runPythonAsync(code);
        postmessage("success", message.trim());
      } catch (err) {
        postmessage("error", err.message);
      } finally {
        message = "";
      }
    }
  }
};

waitPyodideReady();
