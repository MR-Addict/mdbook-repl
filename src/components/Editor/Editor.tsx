import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";

import { useAppContext } from "@/contexts/AppProvider";

const defaultOptions = {
  placeholder: "mdbook-repl",
  fontSize: 17,
  showPrintMargin: false,
  highlightActiveLine: false,
  showGutter: true,
  maxLines: Infinity,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  tabSize: 4,
  editorProps: { $blockScrolling: true }
};

export default function Editor() {
  const { editor, setEditor } = useAppContext();

  return (
    <AceEditor
      width="100%"
      name={editor.lang}
      mode={editor.lang}
      value={editor.code}
      defaultValue={editor.defaultCode}
      theme={editor.theme === "light" ? "tomorrow" : "tomorrow_night"}
      onChange={(code) => setEditor({ ...editor, code })}
      {...defaultOptions}
    />
  );
}
