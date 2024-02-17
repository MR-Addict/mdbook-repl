import { useAppContext } from "@/contexts/AppProvider";

export default function Output() {
  const { output, setOutput } = useAppContext();

  if (output.status === "idle") return null;

  const message = output.status === "start" ? "Running..." : output.msg;

  return (
    <div className="relative group dark:text-gray-300">
      <p className="whitespace-pre-wrap p-2 bg-stone-100 dark:bg-zinc-800 font-mono empty:hidden">{message}</p>
      <button
        type="button"
        className="absolute right-2 top-2 opacity-0 duration-300 group-hover:opacity-100"
        onClick={() => setOutput({ status: "idle", msg: "" })}
      >
        clear
      </button>
    </div>
  );
}
