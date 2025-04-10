import AceEditor from "react-ace";
import { useEffect } from "react";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

import style from "./Editor.module.css";
import Buttons from "./Buttons/Buttons";
import { useAppContext } from "@/contexts/AppProvider";

const defaultOptions = {
  minLines: 1,
  fontSize: 16,
  showGutter: false,
  maxLines: Infinity,
  showPrintMargin: false,
  highlightActiveLine: false,
  enableLiveAutocompletion: false,
  enableBasicAutocompletion: false,
  placeholder: "Try writing some code...",
  editorProps: { $blockScrolling: true }
};

export default function Editor() {
  const { outputs, editor, setEditor, execuateCode } = useAppContext();

  // listen ctrl + r
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.view?.window === window && e.ctrlKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        execuateCode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editor, outputs]);

  return (
    <div className={style.wrapper}>
      <Buttons />
      <AceEditor
        width="100%"
        name={editor.lang}
        mode={editor.lang}
        value={editor.code}
        className="bg-transparent"
        readOnly={editor.readonly}
        defaultValue={editor.defaultCode}
        setOptions={{ useWorker: false }}
        tabSize={editor.lang === "python" ? 4 : 2}
        theme={editor.theme === "light" ? "textmate" : "monokai"}
        onChange={(code) => setEditor({ ...editor, code })}
        {...defaultOptions}
      />
    </div>
  );
}
