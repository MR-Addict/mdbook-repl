import { FaCopy, FaPlay, FaHistory } from "react-icons/fa";

import style from "./Buttons.module.css";
import { useAppContext } from "@/contexts/AppProvider";

export default function Buttons() {
  const { editor, setEditor, output, setOutput, workers } = useAppContext();

  const handleCopy = () => navigator.clipboard.writeText(editor.code);
  const handleReset = () => setEditor({ ...editor, code: editor.defaultCode });
  const handlePlay = () => {
    setOutput({ status: "start", msg: "" });
    const worker = workers.find((w) => w.lang === editor.lang)?.worker;
    if (worker) worker.postMessage({ lang: editor.lang, code: editor.code });
  };

  return (
    <div className={style.wrapper}>
      <button type="button" aria-label="play button" onClick={handleReset}>
        <FaHistory size={14} />
      </button>
      <button type="button" aria-label="copy button" onClick={handleCopy}>
        <FaCopy size={14} />
      </button>
      <button
        type="button"
        aria-label="reset button"
        onClick={handlePlay}
        disabled={output.status === "start" || output.status === "running"}
      >
        <FaPlay size={14} />
      </button>
    </div>
  );
}
