import z from "zod";

const Languages = z.union([z.literal("python"), z.literal("typescript"), z.literal("javascript")]);

const Editor = z.object({
  lang: Languages,
  code: z.string(),
  theme: z.union([z.literal("light"), z.literal("dark")]),
  defaultCode: z.string(),
  readonly: z.boolean()
});

type EditorType = z.infer<typeof Editor>;
type LanguagesType = z.infer<typeof Languages>;

export { Editor, Languages };
export type { EditorType, LanguagesType };
