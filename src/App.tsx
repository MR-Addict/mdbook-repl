import Editor from "@/components/Editor/Editor";
import Buttons from "@/components/Buttons/Buttons";
import Output from "@/components/Output/Output";

export default function App() {
  return (
    <main className="relative rounded-md py-2 flex flex-col gap-3">
      <Editor />
      <Buttons />
      <Output />
    </main>
  );
}
