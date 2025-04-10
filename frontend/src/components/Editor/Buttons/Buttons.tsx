import { useState } from "react";
import { IconType } from "react-icons/lib";
import { IoCheckmark } from "react-icons/io5";
import { VscHistory, VscCopy, VscPlay, VscLoading } from "react-icons/vsc";

import style from "../Editor.module.css";
import { useAppContext } from "@/contexts/AppProvider";

interface ButtonProps {
  title: string;
  Icon: IconType;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ Icon, onClick, title, disabled }: ButtonProps) {
  return (
    <button disabled={disabled} type="button" onClick={onClick} title={title} className="group">
      <Icon size={13} className="group-disabled:animate-spin" />
    </button>
  );
}

export default function Buttons() {
  const [copied, setCopied] = useState(false);
  const { editor, setEditor, outputs, execuateCode } = useAppContext();

  const output = outputs[editor.lang];

  const handleReset = () => setEditor({ ...editor, code: editor.defaultCode });

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(editor.code);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className={style.buttons}>
      {!editor.readonly && editor.code !== editor.defaultCode && (
        <Button title="reset code" Icon={VscHistory} onClick={handleReset} />
      )}
      <Button title="copy code" Icon={copied ? IoCheckmark : VscCopy} onClick={handleCopy} />
      <Button
        title="run code"
        onClick={execuateCode}
        disabled={output.status === "loading" || output.status === "running"}
        Icon={output.status === "loading" || output.status === "running" ? VscLoading : VscPlay}
      />
    </div>
  );
}
