import clsx from "clsx";
import { IconType } from "react-icons/lib";
import { FaRegCopy, FaPlay, FaHistory } from "react-icons/fa";

import style from "./Buttons.module.css";
import { useAppContext } from "@/contexts/AppProvider";

interface ButtonProps {
  name: string;
  Icon: IconType;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ Icon, onClick, disabled, name }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type="button"
      aria-label={`${name} button`}
      onClick={onClick}
      className="dark:bg-black dark:text-gray-400 dark:hover:text-gray-500 hover:text-blue-600"
    >
      <Icon size={13} />
    </button>
  );
}

export default function Buttons() {
  const { editor, setEditor, output, setOutput, workers } = useAppContext();

  const handleCopy = () => navigator.clipboard.writeText(editor.code);
  const handleReset = () => setEditor({ ...editor, code: editor.defaultCode });

  // post message to worker
  const handlePlay = () => {
    setOutput({ status: "start", msg: "" });
    const worker = workers.find((w) => w.lang === editor.lang)?.worker;
    if (worker) worker.postMessage({ lang: editor.lang, code: editor.code });
  };

  return (
    <div className={clsx(style.wrapper, "buttons")}>
      <Button name="play" Icon={FaHistory} onClick={handleReset} />
      <Button name="copy" Icon={FaRegCopy} onClick={handleCopy} />
      <Button
        name="reset"
        Icon={FaPlay}
        onClick={handlePlay}
        disabled={output.status === "start" || output.status === "running"}
      />
    </div>
  );
}
