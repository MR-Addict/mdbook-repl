import clsx from "clsx";
import { GrClear } from "react-icons/gr";
import { IconType } from "react-icons/lib";

import style from "./Output.module.css";

import { useAppContext } from "@/contexts/AppProvider";

interface ButtonProps {
  title: string;
  Icon: IconType;
  onClick: () => void;
}

function Button({ Icon, onClick, title }: ButtonProps) {
  return (
    <button
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
  const { editor, outputs, setOutputs } = useAppContext();

  const output = outputs[editor.lang];

  if (
    output.status === "idle" ||
    output.status === "loading" ||
    (output.status === "running" && output.data.length === 0)
  )
    return null;

  return (
    <div className={clsx(style.wrapper, "dark:bg-zinc-800")}>
      <div className={clsx(style.output, "dark:text-gray-300")}>
        {output.data.length === 0 && output.status === "finished" && (
          <p className={style.line}>&gt; Sorry, there is no output</p>
        )}
        {output.data.map((line, index) => (
          <p key={index} data-color={line.color} className={style.line}>
            {"> " + line.msg}
          </p>
        ))}
      </div>
      <div className={style.buttons}>
        {output.status === "finished" && (
          <Button
            Icon={GrClear}
            title="clear output"
            onClick={() => setOutputs((prev) => ({ ...prev, [editor.lang]: { status: "idle", data: [] } }))}
          />
        )}
      </div>
    </div>
  );
}
