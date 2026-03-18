import AceEditor from "react-ace";
import { useEffect, useMemo } from "react";

import "ace-builds/src-noconflict/mode-lua";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-cloud9_day";
import "ace-builds/src-noconflict/theme-cloud9_night";
import "ace-builds/src-noconflict/theme-cloud9_night_low_color";
import "ace-builds/src-noconflict/theme-cloud_editor";
import "ace-builds/src-noconflict/theme-cloud_editor_dark";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-github_light_default";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-gruvbox_dark_hard";
import "ace-builds/src-noconflict/theme-gruvbox_light_hard";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-iplastic";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-kr_theme";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-mono_industrial";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-xcode";

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
  const { outputs, editor, setEditor, execuateCode, clearOutput } = useAppContext();

  const theme = useMemo(() => {
    if (editor.theme === "light") return editor.editorTheme || "textmate";
    return editor.editorDarkTheme || editor.editorTheme || "monokai";
  }, [editor.theme, editor.editorTheme, editor.editorDarkTheme]);

  // listen ctrl + r
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.view?.window === window) {
        if (e.ctrlKey && e.key.toLowerCase() === "r") {
          e.preventDefault();
          execuateCode();
        } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
          e.preventDefault();
          clearOutput();
        }
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
        theme={theme}
        name={editor.lang}
        mode={editor.lang}
        value={editor.code}
        className="bg-transparent"
        readOnly={editor.readonly}
        defaultValue={editor.defaultCode}
        setOptions={{ useWorker: false }}
        tabSize={editor.lang === "python" ? 4 : 2}
        onChange={(code) => setEditor({ ...editor, code })}
        {...defaultOptions}
      />
    </div>
  );
}
