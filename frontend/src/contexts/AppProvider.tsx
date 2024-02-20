import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

import { MessageType } from "@/types/message";
import { Output, OutputType, OutputsType } from "@/types/output";
import { Editor, EditorType, Languages, LanguagesType } from "@/types/editor";

import useResizeObserver from "@/hooks/useResizeObserver";

const defaultOutputs: OutputsType = {
  python: { status: "loading", data: [] },
  typescript: { status: "loading", data: [] }
};

const defaultCodes = {
  python: '# This is a default python code\n\nprint("Hello world")',
  typescript:
    '// This is a default typescript code\nfunction greet(msg: string){\n  console.log(msg);\n}\n\ngreet("Hello world");'
};

const defaultEditorOptions: EditorType = {
  theme: "light",
  lang: "python",
  code: defaultCodes.python,
  defaultCode: defaultCodes.python,
  readonly: false
};

interface AppContextProps {
  editor: EditorType;
  setEditor: Dispatch<SetStateAction<EditorType>>;

  outputs: OutputsType;
  setOutputs: Dispatch<SetStateAction<OutputsType>>;

  workers: { lang: string; worker: Worker }[];
}

const AppContext = createContext<AppContextProps>({
  editor: defaultEditorOptions,
  setEditor: () => {},

  outputs: defaultOutputs,
  setOutputs: () => {},

  workers: []
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

const workers = [
  { lang: "python", worker: new Worker(new URL("@/workers/pyodide-worker.js", import.meta.url)) },
  { lang: "typescript", worker: new Worker(new URL("@/workers/babel-worker.js", import.meta.url)) }
];

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const dimensions = useResizeObserver("#root");

  const [id, setId] = useState<string>("");
  const [outputs, setOutputs] = useState<OutputsType>(defaultOutputs);
  const [editor, setEditor] = useState<EditorType>(defaultEditorOptions);

  function setOutput(lang: LanguagesType, output: OutputType) {
    setOutputs((prev) => ({ ...prev, [lang]: { status: output.status, data: [...prev[lang].data, ...output.data] } }));
  }

  // listen theme change
  useEffect(() => {
    document.body.classList.toggle("dark", editor.theme === "dark");
  }, [editor.theme]);

  // listen lang change
  useEffect(() => {
    setEditor((prev) => ({ ...prev, code: defaultCodes[prev.lang], defaultCode: defaultCodes[prev.lang] }));
  }, [editor.lang]);

  // post message to parent window
  useEffect(() => {
    const output = outputs[editor.lang];
    const message: MessageType = { id, editor, output, dimensions };
    window.parent.postMessage({ repl: message }, "*");
  }, [dimensions, outputs, editor]);

  // listen for messages from parent window
  useEffect(() => {
    const onmessage = (event: MessageEvent) => {
      if (event.source === window || !event.data.repl) return;
      if (typeof event.data.repl.id === "string") setId(event.data.repl.id);

      const parsedEditor = Editor.safeParse(Object.assign(editor, event.data.repl.editor));
      if (parsedEditor.success) setEditor({ ...parsedEditor.data });
    };
    window.addEventListener("message", onmessage);
    return () => window.removeEventListener("message", onmessage);
  }, []);

  // listen for messages from worker
  useEffect(() => {
    const onmessage = (event: MessageEvent) => {
      const parsedOutput = Output.safeParse(event.data.output);
      const parsedLang = Languages.safeParse(event.data.lang);
      if (!parsedOutput.success || !parsedLang.success) return;
      setOutput(parsedLang.data, parsedOutput.data);
    };
    workers.forEach((w) => (w.worker.onmessage = onmessage));
  }, []);

  return (
    <AppContext.Provider value={{ editor, setEditor, outputs, setOutputs, workers }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
