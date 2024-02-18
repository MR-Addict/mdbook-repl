import { useAppContext } from "@/contexts/AppProvider";

import style from "./Output.module.css";
import clsx from "clsx";

export default function Output() {
  const { output, setOutput } = useAppContext();

  if (output.status === "idle") return null;

  return (
    <div data-status={output.status} className={clsx(style.wrapper, "dark:text-gray-300")}>
      <p className={clsx(style.output, "dark:bg-zinc-800")}>{output.msg || "Sorry, there is no output"}</p>
      <button type="button" className={style["clear-button"]} onClick={() => setOutput({ status: "idle", msg: "" })}>
        clear
      </button>
    </div>
  );
}
