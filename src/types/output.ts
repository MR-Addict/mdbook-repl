import z from "zod";

const Output = z.object({
  status: z.union([
    z.literal("idle"),
    z.literal("start"),
    z.literal("running"),
    z.literal("success"),
    z.literal("error")
  ]),
  msg: z.string().optional()
});

type OutputType = z.infer<typeof Output>;

export { Output };
export type { OutputType };
