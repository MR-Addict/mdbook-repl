import React from "react";

const Editor = React.lazy(() => import("@/components/Editor/Editor"));
const Output = React.lazy(() => import("@/components/Output/Output"));
const Buttons = React.lazy(() => import("@/components/Buttons/Buttons"));

export default function App() {
  return (
    <main className="relative rounded-md flex flex-col gap-3 dark:bg-zinc-950">
      <Editor />
      <Buttons />
      <Output />
    </main>
  );
}
