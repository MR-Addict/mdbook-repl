import { useAppContext } from "@/contexts/AppProvider";

export default function Output() {
  const { output } = useAppContext();

  if (output.status === "idle") return null;

  const message = output.status === "start" ? "Running..." : output.msg;

  return (
    <p className="whitespace-pre-wrap px-4 py-2 rounded-sm bg-stone-100 dark:text-gray-300 dark:bg-zinc-800 font-mono">
      {message}
    </p>
  );
}
