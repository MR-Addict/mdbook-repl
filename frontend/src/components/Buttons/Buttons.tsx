import clsx from "clsx";
import { useState } from "react";
import { IconType } from "react-icons/lib";
import { IoCheckmark } from "react-icons/io5";
import { VscHistory, VscCopy, VscPlay, VscDebugStop } from "react-icons/vsc";

import style from "./Buttons.module.css";
import { useAppContext } from "@/contexts/AppProvider";

interface ButtonProps {
  title: string;
  Icon: IconType;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ Icon, onClick, disabled, title }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      title={title}
      className="dark:bg-zinc-900 dark:text-gray-400 sm:dark:enabled:hover:text-gray-300 sm:enabled:hover:text-blue-600 dark:border-zinc-600"
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
    const worker = workers.find((w) => w.lang === editor.lang)?.worker;
    if (worker) {
      setOutput({ status: "running", data: [] });
      worker.postMessage({ lang: editor.lang, code: editor.code });
    }
  };

  return (
    <div className={clsx(style.wrapper, "buttons")}>
      {!editor.readonly && editor.code !== editor.defaultCode && (
        <Button title="reset code" Icon={VscHistory} onClick={handleReset} />
      )}
      {output.status !== "loading" && (
        <Button
          title="run code"
          onClick={handlePlay}
          disabled={output.status === "running"}
          Icon={output.status === "running" ? VscDebugStop : VscPlay}
        />
      )}
      <Button title="copy code" Icon={copied ? IoCheckmark : VscCopy} onClick={handleCopy} />
    </div>
  );
}
