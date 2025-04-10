import { useState } from "react";
import { GrClear } from "react-icons/gr";
import { IconType } from "react-icons/lib";
import { VscCopy } from "react-icons/vsc";
import { IoCheckmark } from "react-icons/io5";

import style from "./Output.module.css";
import { useAppContext } from "@/contexts/AppProvider";

interface ButtonProps {
  title: string;
  Icon: IconType;
  onClick: () => void;
}

function Button({ Icon, onClick, title }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} title={title}>
      <Icon size={13} />
    </button>
  );
}

export default function Output() {
  const [copied, setCopied] = useState(false);
  const { editor, outputs, clearOutput } = useAppContext();

  const output = outputs[editor.lang];

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(output.data.map((line) => line.msg).join("\n"));
    setTimeout(() => setCopied(false), 1000);
  };

  if (
    output.status === "idle" ||
    output.status === "loading" ||
    (output.status === "running" && output.data.length === 0)
  )
    return null;

  return (
    <div className={style.wrapper}>
      <div className={style.output}>
        {output.data.length === 0 && output.status === "finished" && (
          <p className={style.line}>&gt; Sorry, there is no output</p>
        )}
        {output.data.map((line, index) => (
          <div key={index} data-color={line.color} className={style.line}>
            <span>&gt;</span>
            <ul>
              {line.msg.map((msg, index) => (
                <li key={index}>{typeof msg === "string" ? msg : JSON.stringify(msg, null, 2)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={style.buttons}>
        {output.status === "finished" && (
          <>
            <Button Icon={copied ? IoCheckmark : VscCopy} title="copy output" onClick={handleCopy} />
            <Button Icon={GrClear} title="clear output" onClick={clearOutput} />
          </>
        )}
      </div>
    </div>
  );
}
