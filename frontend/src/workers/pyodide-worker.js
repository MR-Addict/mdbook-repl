self.importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

let pyodide = null;

const postmessage = (status, msg) => self.postMessage({ lang: "python", output: { status, data: msg } });
const stdout = (msg) => postmessage("running", [{ color: "normal", msg }]);

async function waitPyodideReady() {
  postmessage("loading", [{ color: "normal", msg: "Python is loading..." }]);
  pyodide = await loadPyodide({ stdout });
  postmessage("idle", [{ color: "normal", msg: "Python is ready" }]);
}

self.onmessage = async (event) => {
  const { data, ...context } = event.data;

  // only run the code if the language is python
  const { lang, code } = event.data;
  if (lang !== "python") return;

  // add all the context to the worker
  for (const key of Object.keys(context)) self[key] = context[key];

  // wait for pyodide to be ready
  if (!pyodide) await waitPyodideReady();

  // run the python code
  if (!code) postmessage("finished", [{ color: "normal", msg: "Python code is empty" }]);
  else {
    postmessage("running", []);
    await pyodide.loadPackagesFromImports(code);
    pyodide
      .runPythonAsync(code)
      .then(() => postmessage("finished", []))
      .catch((err) => postmessage("finished", [{ color: "red", msg: err.message }]));
  }
};

waitPyodideReady();
