import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

import { EditorOptionsType } from "@/types/editor";
import { Output, OutputType } from "@/types/output";

const defaultCode = '# Try to edit this code and see the output change\nprint("Hello, World!")';

const defaultOutput: OutputType = { status: "idle" };

const defaultEditorOptions: EditorOptionsType = {
  theme: "tomorrow_night",
  lang: "python",
  code: defaultCode,
  defaultCode
};

interface AppContextProps {
  editor: EditorOptionsType;
  setEditor: Dispatch<SetStateAction<EditorOptionsType>>;

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
  const [output, setOutput] = useState<OutputType>(defaultOutput);
  const [editor, setEditor] = useState<EditorOptionsType>(defaultEditorOptions);

  useEffect(() => {
    const onmessage = (event: MessageEvent) => {
      const result = Output.safeParse(event.data.output);
      if (!result.success) setOutput({ status: "error", msg: result.error.message });
      else {
        setOutput((prev) => {
          let msg = prev.msg;
          if (!msg && result.data.msg) msg = result.data.msg.trim();
          else if (msg && result.data.msg) msg += `\n${result.data.msg.trim()}`;
          return { status: result.data.status, msg };
        });
      }
    };
    workers.forEach((w) => (w.worker.onmessage = onmessage));
  }, []);

  return (
    <AppContext.Provider value={{ editor, setEditor, output, setOutput, workers }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
