import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

import { Output, OutputType, OutputsType } from "@/types/output";
import { Editor, EditorType, Languages, LanguagesType } from "@/types/editor";

import useResizeObserver from "@/hooks/useResizeObserver";

import pythonWorker from "../workers/python-worker.js?url";
import typescriptWorker from "../workers/typescript-worker.js?url";
import javascriptWorker from "../workers/javascript-worker.js?url";

const workers = {
  python: pythonWorker,
  typescript: typescriptWorker,
  javascript: javascriptWorker
};

const defaultOutputs: OutputsType = {
  python: { status: "loading", data: [] },
  typescript: { status: "loading", data: [] },
  javascript: { status: "loading", data: [] }
};

const defaultCodes = {
  python: '# This is a default python code\n\nprint("Hello world")',
  typescript: '// This is a default typescript code\n\nlet message: string = "Hello, world!";\nconsole.log(message);',
  javascript: '// This is a default javascript code\n\nlet message = "Hello, world!";\nconsole.log(message);'
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
  setOutputs: Dispatch<SetStateAction<OutputsType>>;

  worker: Worker | null;
}

const AppContext = createContext<AppContextProps>({
  editor: defaultEditorOptions,
  setEditor: () => {},

  outputs: defaultOutputs,
  setOutputs: () => {},

  worker: null
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

  function setOutput(lang: LanguagesType, output: OutputType) {
    setOutputs((prev) => ({ ...prev, [lang]: { status: output.status, data: [...prev[lang].data, ...output.data] } }));
  }

  function postmessage() {
    const message = { id, editor, output: outputs[editor.lang], dimensions };
    window.parent.postMessage({ repl: message }, "*");
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
      const parsedOutput = Output.safeParse(event.data.output);
      const parsedLang = Languages.safeParse(event.data.lang);
      if (!parsedOutput.success || !parsedLang.success) return;
      setOutput(parsedLang.data, parsedOutput.data);
    };
    setWorker(newWorker);
  }, [editor.lang]);

  // post message to parent window
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (id) postmessage();
    }, 10);

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
    <AppContext.Provider value={{ editor, setEditor, outputs, setOutputs, worker }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
