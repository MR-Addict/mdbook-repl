import Editor from "@/components/Editor/Editor";
import Buttons from "@/components/Buttons/Buttons";
import Output from "@/components/Output/Output";

export default function App() {
  return (
    <main className="relative flex flex-col gap-2">
      <Editor />
      <Buttons />
      <Output />
    </main>
  );
}
