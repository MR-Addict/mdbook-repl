import z from "zod";

import { languages } from "@/data/app";

const Language = z.enum(languages);

const Editor = z.object({
  lang: Language,
  code: z.string(),
  defaultCode: z.string(),
  theme: z.enum(["dark", "light"]),
  readonly: z.boolean()
});

type EditorType = z.infer<typeof Editor>;
type LanguageType = z.infer<typeof Language>;

export { Editor, Language };
export type { EditorType, LanguageType };
