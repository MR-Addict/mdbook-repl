self.importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

async function waitPyodideReady() {
  const indexURL = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/";
  const stdout = (msg) => self.postMessage({ lang: "python", output: { status: "running", msg } });
  const stderr = (msg) => self.postMessage({ lang: "python", output: { status: "error", msg } });
  self.pyodide = await loadPyodide({ indexURL, stdout, stderr });
}

self.onmessage = async (event) => {
  const { data, ...context } = event.data;
  for (const key of Object.keys(context)) self[key] = context[key];

  if (!self.pyodide) await waitPyodideReady();

  const { lang, code } = event.data;
  if (lang === "python") {
    try {
      self.postMessage({ lang: "python", output: { status: "running" } });
      await self.pyodide.runPythonAsync(code);
      self.postMessage({ lang: "python", output: { status: "success" } });
    } catch (err) {
      self.postMessage({ lang: "python", output: { status: "error", msg: err.message } });
    }
  }
};
