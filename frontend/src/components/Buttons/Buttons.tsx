import clsx from "clsx";
import { useState } from "react";
import { IconType } from "react-icons/lib";
import { IoCheckmark } from "react-icons/io5";
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
      onClick={onClick}
      title={`${name} code`}
      className="dark:bg-zinc-900 dark:text-gray-400 dark:hover:text-gray-600 md:hover:text-blue-600 md:dark:border-zinc-600"
    >
      <Icon size={13} />
    </button>
  );
}

export default function Buttons() {
  const [copied, setCopied] = useState(false);
  const { editor, setEditor, output, setOutput, workers } = useAppContext();

  const handleReset = () => setEditor({ ...editor, code: editor.defaultCode });
  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(editor.code);
    setTimeout(() => setCopied(false), 1000);
  };

  // post message to worker
  const handlePlay = () => {
    setOutput({ status: "start", msg: "" });
    const worker = workers.find((w) => w.lang === editor.lang)?.worker;
    if (worker) worker.postMessage({ lang: editor.lang, code: editor.code });
  };

  return (
    <div className={clsx(style.wrapper, "buttons")}>
      <Button name="play" Icon={FaHistory} onClick={handleReset} />
      <Button name="copy" Icon={copied ? IoCheckmark : FaRegCopy} onClick={handleCopy} />
      <Button
        name="reset"
        Icon={FaPlay}
        onClick={handlePlay}
        disabled={output.status === "start" || output.status === "running"}
      />
    </div>
  );
}
