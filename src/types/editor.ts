import z from "zod";

const Editor = z.object({
  lang: z.literal("python"),
  code: z.string(),
  theme: z.union([z.literal("light"), z.literal("dark")]),
  defaultCode: z.string()
});

type EditorType = z.infer<typeof Editor>;

export { Editor };
export type { EditorType };
