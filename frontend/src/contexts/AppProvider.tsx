import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

import useResizeObserver from "@/hooks/useResizeObserver";

import { defaultCodes } from "@/data/app";
import { Output, OutputsType } from "@/types/output";
import { Editor, EditorType, Language } from "@/types/editor";

const workers = {
  python: new URL("../workers/python-worker.js", import.meta.url).toString(),
  typescript: new URL("../workers/typescript-worker.js", import.meta.url).toString(),
  javascript: new URL("../workers/javascript-worker.js", import.meta.url).toString()
};

const defaultOutputs: OutputsType = {
  python: { status: "loading", data: [] },
  typescript: { status: "loading", data: [] },
  javascript: { status: "loading", data: [] }
};

const defaultEditorOptions: EditorType = {
  theme: "light",
  lang: "javascript",
  code: defaultCodes.javascript,
  defaultCode: defaultCodes.javascript,
  readonly: false
};

interface AppContextProps {
  editor: EditorType;
  setEditor: Dispatch<SetStateAction<EditorType>>;

  outputs: OutputsType;

  execuateCode: () => void;
  clearOutput: () => void;
}

const AppContext = createContext<AppContextProps>({
  editor: defaultEditorOptions,
  setEditor: () => {},

  outputs: defaultOutputs,

  execuateCode: () => {},
  clearOutput: () => {}
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const dimensions = useResizeObserver("#root");

  const [id, setId] = useState<string>("");
  const [worker, setWorker] = useState<Worker | null>(null);
  const [outputs, setOutputs] = useState<OutputsType>(defaultOutputs);
  const [editor, setEditor] = useState<EditorType>(defaultEditorOptions);

  function postmessage() {
    const message = { id, editor, output: outputs[editor.lang], dimensions };
    window.parent.postMessage({ repl: message }, "*");
  }

  // post message to worker
  function execuateCode() {
    if (!worker) return;
    if (outputs[editor.lang].status === "loading" || outputs[editor.lang].status === "running") return;

    setOutputs((prev) => ({ ...prev, [editor.lang]: { status: "running", data: [] } }));
    worker.postMessage({ lang: editor.lang, code: editor.code });
  }

  function clearOutput() {
    setOutputs((prev) => ({ ...prev, [editor.lang]: { status: "idle", data: [] } }));
  }

  // listen theme change
  useEffect(() => {
    document.body.classList.toggle("dark", editor.theme === "dark");
  }, [editor.theme]);

  // listen lang change
  useEffect(() => {
    const lang = editor.lang;
    // terminate previous worker
    if (worker) worker.terminate();
    // start new worker
    const newWorker = new Worker(workers[lang], { type: "classic", name: `${lang}-worker` });
    newWorker.onmessage = (event: MessageEvent) => {
      const parsedLang = Language.safeParse(event.data.lang);
      const parsedOutput = Output.safeParse(event.data.output);
      if (!parsedOutput.success || !parsedLang.success) return;

      const data = parsedOutput.data.data;
      const status = parsedOutput.data.status;
      setOutputs((prev) => ({ ...prev, [parsedLang.data]: { status, data: [...prev[lang].data, ...data] } }));
    };
    setWorker(newWorker);
  }, [editor.lang]);

  // post message to parent window
  useEffect(() => {
    const timeout = setTimeout(() => id && postmessage(), 10);

    return () => clearTimeout(timeout);
  }, [id, dimensions.height]);

  // listen for messages from parent window
  useEffect(() => {
    const onmessage = (event: MessageEvent) => {
      if (event.source === window || !event.data.repl) return;
      if (typeof event.data.repl.id !== "string") return;

      const parsedEditor = Editor.safeParse(Object.assign(editor, event.data.repl.editor));
      if (!parsedEditor.success) return;

      setId(event.data.repl.id);
      setEditor({ ...parsedEditor.data });
    };

    window.addEventListener("message", onmessage);
    postmessage();

    return () => window.removeEventListener("message", onmessage);
  }, []);

  return (
    <AppContext.Provider value={{ editor, setEditor, outputs, execuateCode, clearOutput }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
