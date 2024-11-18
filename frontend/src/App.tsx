import { lazy } from "react";

const Editor = lazy(() => import("@/components/Editor/Editor"));
const Output = lazy(() => import("@/components/Output/Output"));

export default function App() {
  return (
    <main>
      <Editor />
      <Output />
    </main>
  );
}
