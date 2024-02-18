import z from "zod";

const Output = z.object({
  status: z.union([
    z.literal("idle"),
    z.literal("loading"),
    z.literal("running"),
    z.literal("success"),
    z.literal("error")
  ]),
  msg: z.string()
});

type OutputType = z.infer<typeof Output>;

export { Output };
export type { OutputType };
