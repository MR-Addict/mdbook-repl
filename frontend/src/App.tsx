import Editor from "./parts/Editor/Editor";
import Output from "./parts/Output/Output";

import { useAppContext } from "@/contexts/AppProvider";

export default function App() {
  const { isFullscreen } = useAppContext();

  return (
    <main data-fullscreen={isFullscreen}>
      <Editor />
      <Output />
    </main>
  );
}
