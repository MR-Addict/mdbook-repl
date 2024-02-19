import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

import { useAppContext } from "@/contexts/AppProvider";

const defaultOptions = {
  tabSize: 4,
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
  const { editor, setEditor } = useAppContext();

  return (
    <div className="bg-stone-100 dark:bg-zinc-800 py-2 px-1 ace-editor">
      <AceEditor
        width="100%"
        name={editor.lang}
        mode={editor.lang}
        value={editor.code}
        className="bg-transparent"
        readOnly={editor.readonly}
        defaultValue={editor.defaultCode}
        theme={editor.theme === "light" ? "textmate" : "monokai"}
        onChange={(code) => setEditor({ ...editor, code })}
        {...defaultOptions}
      />
    </div>
  );
}
