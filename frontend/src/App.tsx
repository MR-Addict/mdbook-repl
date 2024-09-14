import React from "react";

const Editor = React.lazy(() => import("@/components/Editor/Editor"));
const Output = React.lazy(() => import("@/components/Output/Output"));

export default function App() {
  return (
    <main>
      <Editor />
      <Output />
    </main>
  );
}
