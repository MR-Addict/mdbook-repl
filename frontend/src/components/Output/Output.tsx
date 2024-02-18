import { useAppContext } from "@/contexts/AppProvider";

export default function Output() {
  const { output, setOutput } = useAppContext();

  if (output.status === "idle") return null;

  const message = output.status === "start" ? "Running..." : output.msg;

  return (
    <div className="relative group text-gray-800 dark:text-gray-300">
      <p className="whitespace-pre-wrap p-2 bg-stone-100 dark:bg-zinc-800 font-mono empty:hidden">{message}</p>
      <button
        type="button"
        onClick={() => setOutput({ status: "idle", msg: "" })}
        disabled={output.status === "running" || output.status === "start"}
        className="absolute right-2 top-1 md:opacity-0 duration-300 group-hover:opacity-100 disabled:hidden"
      >
        clear
      </button>
    </div>
  );
}
