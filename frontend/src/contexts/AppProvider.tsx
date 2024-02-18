import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

import { MessageType } from "@/types/message";
import { Output, OutputType } from "@/types/output";
import { Editor, EditorType } from "@/types/editor";

import useResizeObserver from "@/hooks/useResizeObserver";

const defaultCode = `# This is a default python code

print("Hello world")`;

const defaultOutput: OutputType = { status: "idle", msg: "" };

const defaultEditorOptions: EditorType = {
  lang: "python",
  theme: "light",
  code: defaultCode,
  defaultCode
};

interface AppContextProps {
  editor: EditorType;
  setEditor: Dispatch<SetStateAction<EditorType>>;

  output: OutputType;
  setOutput: Dispatch<SetStateAction<OutputType>>;

  workers: { lang: string; worker: Worker }[];
}

const AppContext = createContext<AppContextProps>({
  editor: defaultEditorOptions,
  setEditor: () => {},

  output: defaultOutput,
  setOutput: () => [],

  workers: []
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

const workers = [{ lang: "python", worker: new Worker(new URL("@/workers/pyodide-worker.js", import.meta.url)) }];

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const dimensions = useResizeObserver("#root");

  const [id, setId] = useState<string>("");
  const [output, setOutput] = useState<OutputType>(defaultOutput);
  const [editor, setEditor] = useState<EditorType>(defaultEditorOptions);

  // listen theme change
  useEffect(() => {
    document.body.classList.toggle("dark", editor.theme === "dark");
  }, [editor.theme]);

  // post message to parent window
  useEffect(() => {
    const message: MessageType = { id, editor, output, dimensions };
    window.parent.postMessage({ repl: message }, "*");
  }, [dimensions, output, editor]);

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
      const result = Output.safeParse(event.data.output);
      if (!result.success) setOutput({ status: "error", msg: result.error.message });
      else setOutput(result.data);
    };
    workers.forEach((w) => (w.worker.onmessage = onmessage));
  }, []);

  return (
    <AppContext.Provider value={{ editor, setEditor, output, setOutput, workers }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
