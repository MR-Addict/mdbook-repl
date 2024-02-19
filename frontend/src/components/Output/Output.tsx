import clsx from "clsx";

import style from "./Output.module.css";

import { useAppContext } from "@/contexts/AppProvider";

export default function Output() {
  const { output } = useAppContext();
  const lines = output.msg.split("\n").filter((line) => line !== "");

  if (output.status === "idle" || output.status === "loading") return null;

  return (
    <div data-status={output.status} className={clsx(style.wrapper, "dark:bg-zinc-800 dark:text-gray-300")}>
      {lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
}
