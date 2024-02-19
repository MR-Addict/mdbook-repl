import clsx from "clsx";
import { IoCloseCircleOutline } from "react-icons/io5";

import style from "./Output.module.css";

import { useAppContext } from "@/contexts/AppProvider";

export default function Output() {
  const { output, setOutput } = useAppContext();
  const lines = output.msg.split("\n").filter((line) => line !== "");

  if (output.status === "idle" || output.status === "loading") return null;

  return (
    <div data-status={output.status} className={clsx(style.wrapper, "dark:text-gray-300")}>
      <div className={clsx(style.output, "dark:bg-zinc-800")}>
        {lines.length === 0 && <p>Sorry, there is no output</p>}
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <button
        type="button"
        className={clsx(style["clear-button"], "dark:text-gray-400 sm:hover:text-blue-600 sm:dark:hover:text-gray-300")}
        onClick={() => setOutput({ status: "idle", msg: "" })}
      >
        <IoCloseCircleOutline size={19} />
      </button>
    </div>
  );
}
