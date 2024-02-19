import clsx from "clsx";
import { GrClear } from "react-icons/gr";
import { IconType } from "react-icons/lib";
import { BsTextWrap } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";

import style from "./Output.module.css";

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
      className={
        "dark:bg-zinc-900 dark:text-gray-400 sm:hover:text-blue-600 sm:dark:hover:text-gray-300 dark:border-zinc-600"
      }
    >
      <Icon size={13} />
    </button>
  );
}

export default function Output() {
  const [isWrap, setIsWrap] = useState(false);
  const [isOutputOverflowed, setIsOutputOverflowed] = useState(false);

  const { output, setOutput } = useAppContext();
  const outputRef = useRef<HTMLDivElement>(null);
  const lines = output.msg.split("\n").filter((line) => line !== "");

  useEffect(() => {
    if (outputRef.current) setIsOutputOverflowed(outputRef.current.scrollWidth > outputRef.current.clientWidth);
  }, [output]);

  if (output.status === "idle" || output.status === "loading") return null;

  return (
    <div
      data-wrap={isWrap}
      data-status={output.status}
      className={clsx(style.wrapper, "dark:bg-zinc-800 dark:text-gray-300")}
    >
      <div ref={outputRef} className="w-full overflow-x-auto">
        {lines.map((line, index) => (
          <p key={index}>{"> " + line}</p>
        ))}
      </div>
      <div className={style.buttons}>
        {isOutputOverflowed && (
          <Button title="wrap output" Icon={BsTextWrap} onClick={() => setIsWrap((prev) => !prev)} />
        )}
        <Button title="clear output" Icon={GrClear} onClick={() => setOutput({ status: "idle", msg: "" })} />
      </div>
    </div>
  );
}
