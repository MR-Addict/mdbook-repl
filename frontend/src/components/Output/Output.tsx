import clsx from "clsx";
import { GrClear } from "react-icons/gr";
import { IconType } from "react-icons/lib";

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
  const { output, setOutput } = useAppContext();

  if (output.status === "idle" || output.status === "loading") return null;

  return (
    <div className={clsx(style.wrapper, "dark:bg-zinc-800")}>
      <div className={clsx(style.output, "dark:text-gray-300")}>
        {output.data.length === 0 && <p className={style.line}>&gt; Sorry, ther is no output</p>}
        {output.data.map((line, index) => (
          <p key={index} data-color={line.color} className={style.line}>
            {"> " + line.msg}
          </p>
        ))}
      </div>
      <div className={style.buttons}>
        <Button title="clear output" Icon={GrClear} onClick={() => setOutput({ status: "idle", data: [] })} />
      </div>
    </div>
  );
}
