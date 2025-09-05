self.importScripts("https://cdn.jsdelivr.net/npm/wasmoon@1.16.0/dist/index.min.js");

const factory = new wasmoon.LuaFactory();
let lua = null;

const postmessage = (status, msg) => self.postMessage({ lang: "lua", output: { status, data: msg } });

const stderr = (...msg) => postmessage("running", [{ color: "red", msg }]);
const stdout = (...msg) => { if (msg.length) postmessage("running", [{ color: "normal", msg }]);};

async function waitWasmoonReady() {
  lua = await factory.createEngine()
  postmessage("idle", []);
}

self.onmessage = async (event) => {
  const { data, ...context } = event.data;

  // only run the code if the language is lua
  const { lang, code } = event.data;
  if (lang !== "lua") return;

  // add all the context to the worker
  for (const key of Object.keys(context)) self[key] = context[key];

  await lua.global.set('print', (...args) => {
    stdout(...args.map(String));
  });

  await lua.global.set('error', (...args) => {
    stderr(...args.map(String));
  });

  if (!code) postmessage("finished", [{ color: "red", msg: "lua code is empty" }]);
  else {
    try {
        await lua.doString(code);
        postmessage("finished", []);
    } catch (err) {
        postmessage("finished", [{ color: "red", msg: [err.message] }]);
    }
  }
};

waitWasmoonReady();
