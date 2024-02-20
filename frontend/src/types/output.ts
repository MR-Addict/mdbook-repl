import z from "zod";

const Output = z.object({
  status: z.union([z.literal("idle"), z.literal("loading"), z.literal("running"), z.literal("finished")]),
  data: z.array(
    z.object({
      msg: z.string(),
      color: z.union([z.literal("red"), z.literal("yellow"), z.literal("normal")])
    })
  )
});

const Outputs = z.object({
  python: Output,
  typescript: Output
});

type OutputType = z.infer<typeof Output>;
type OutputsType = z.infer<typeof Outputs>;

export { Output, Outputs };
export type { OutputType, OutputsType };
