import z from "zod";

const EditorOptions = z.object({
  theme: z.union([z.literal("tomorrow"), z.literal("tomorrow_night")]),
  lang: z.literal("python"),
  code: z.string(),
  defaultCode: z.string()
});

type EditorOptionsType = z.infer<typeof EditorOptions>;

export { EditorOptions };
export type { EditorOptionsType };
