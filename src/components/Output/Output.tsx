import { useAppContext } from "@/contexts/AppProvider";

export default function Output() {
  const { output } = useAppContext();

  if (output.status === "idle") return null;

  const message = output.status === "start" ? "Running..." : output.msg;

  return <p className="whitespace-pre-wrap p-2 bg-gray-200 rounded-md font-mono">{message}</p>;
}
