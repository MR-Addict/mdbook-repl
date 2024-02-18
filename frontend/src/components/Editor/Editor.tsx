import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";

import { useAppContext } from "@/contexts/AppProvider";

const defaultOptions = {
  placeholder: "Try writing some code...",
  fontSize: 17,
  showPrintMargin: false,
  highlightActiveLine: false,
  showGutter: false,
  maxLines: Infinity,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  tabSize: 4,
  minLines: 1,
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
        theme={editor.theme === "light" ? "tomorrow" : "tomorrow_night"}
        onChange={(code) => setEditor({ ...editor, code })}
        {...defaultOptions}
      />
    </div>
  );
}
