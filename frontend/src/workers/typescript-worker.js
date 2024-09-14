self.importScripts("https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/babel-standalone/7.25.6/babel.min.js");

const postmessage = (status, msg) => self.postMessage({ lang: "typescript", output: { status, data: msg } });

self.console.error = (...msg) => postmessage("running", [{ color: "red", msg: msg.join(" ") }]);
self.console.log = (...msgs) => postmessage("running", [{ color: "normal", msg: msgs.join(" ") }]);

async function waitBabelReady() {
  Babel.transform("", { filename: "typescript.ts", presets: ["typescript"] });
  postmessage("idle", []);
}

self.onmessage = async (event) => {
  const { data, ...context } = event.data;

  // only run the code if the language is typescript
  const { lang, code } = event.data;
  if (lang !== "typescript") return;

  // add all the context to the worker
  for (const key of Object.keys(context)) self[key] = context[key];

  // wait for babel to be ready
  if (!Babel) await waitBabelReady();

  // run the typescript code
  if (!code) postmessage("finished", [{ color: "red", msg: "TypeScript code is empty" }]);
  else {
    try {
      const babel = Babel.transform(code, { filename: "typescript.ts", presets: ["typescript"] });
      await eval(babel.code);
      postmessage("finished", []);
    } catch (err) {
      postmessage("finished", [{ color: "red", msg: err.message }]);
    }
  }
};

waitBabelReady();
