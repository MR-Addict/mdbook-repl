self.importScripts("https://cdn.jsdelivr.net/npm/wasmoon@1.16.0/dist/index.min.js");

const factory = new wasmoon.LuaFactory();

const postmessage = (status, msg) => self.postMessage({ lang: "lua", output: { status, data: msg } });

const stderr = (...msg) => postmessage("running", [{ color: "red", msg }]);
const stdout = (...msg) => { if (msg.length) postmessage("running", [{ color: "normal", msg }]);};

async function waitWasmoonReady() {
  postmessage("idle", []);
}

self.onmessage = async (event) => {
  const { data, ...context } = event.data;

  // only run the code if the language is lua
  const { lang, code } = event.data;
  if (lang !== "lua") return;

  // add all the context to the worker
  for (const key of Object.keys(context)) self[key] = context[key];

  const lua = await factory.createEngine()
  try{
    lua.global.set('print', wasmoon.decorateFunction((thread, argsQuantity) => {
        const values = [];
        for (let i = 1; i <= argsQuantity; i++) {
            values.push(thread.indexToString(i));
        }
        stdout(...values.map(String));
    }, {
        receiveArgsQuantity: true,
        receiveThread: true
    }));

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
  }
  catch(e){
    stderr(e.toString());
  }
  finally{
    lua.global.close();
    postmessage("finished", []);
  }
};

waitWasmoonReady();
