import z from "zod";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

import { EditorType } from "@/types/editor";
import { Output, OutputType } from "@/types/output";
import { Message, MessageType } from "@/types/message";

import useResizeObserver from "@/hooks/useResizeObserver";

const defaultCode = `# Try to change dec and see the output change
dec = 344

print("The decimal value of", dec, "is:")
print(bin(dec), "in binary.")
print(oct(dec), "in octal.")
print(hex(dec), "in hexadecimal.")`;

const defaultOutput: OutputType = { status: "idle" };

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
      if (event.source === window) return;
      const result = z.object({ repl: Message.omit({ output: true, dimensions: true }) }).safeParse(event.data);
      if (!result.success) return;
      setId(result.data.repl.id);
      setEditor(result.data.repl.editor);
    };
    window.addEventListener("message", onmessage);
    return () => window.removeEventListener("message", onmessage);
  }, []);

  // listen for messages from worker
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
