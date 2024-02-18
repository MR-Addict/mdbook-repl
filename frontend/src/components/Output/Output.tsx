import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";

import style from "./Output.module.css";

import { useAppContext } from "@/contexts/AppProvider";

export default function Output() {
  const { output, setOutput } = useAppContext();

  if (output.status === "idle" || output.status === "loading") return null;

  return (
    <div data-status={output.status} className={clsx(style.wrapper, "dark:text-gray-300")}>
      <p className={clsx(style.output, "dark:bg-zinc-800")}>{output.msg || "Sorry, there is no output"}</p>
      <button type="button" className={style["clear-button"]} onClick={() => setOutput({ status: "idle", msg: "" })}>
        <IoCloseOutline size={18} />
      </button>
    </div>
  );
}
