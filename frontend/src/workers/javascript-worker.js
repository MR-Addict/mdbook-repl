const postmessage = (status, msg) => self.postMessage({ lang: "javascript", output: { status, data: msg } });

self.console.error = (...msg) => postmessage("running", [{ color: "red", msg }]);
self.console.log = (...msg) => postmessage("running", [{ color: "normal", msg }]);

self.onmessage = async (event) => {
  const { data, ...context } = event.data;

  // only run the code if the language is javascript
  const { lang, code } = event.data;
  if (lang !== "javascript") return;

  // add all the context to the worker
  for (const key of Object.keys(context)) self[key] = context[key];

  // run the javascript code
  if (!code) postmessage("finished", [{ color: "red", msg: "JavaScript code is empty" }]);
  else {
    try {
      await eval(code);
      postmessage("finished", []);
    } catch (err) {
      postmessage("finished", [{ color: "red", msg: err.message }]);
    }
  }
};

postmessage("idle", []);
