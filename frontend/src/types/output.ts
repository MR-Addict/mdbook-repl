import z from "zod";

const Output = z.object({
  status: z.union([z.literal("idle"), z.literal("loading"), z.literal("running"), z.literal("finished")]),
  data: z.array(
    z.object({
      msg: z.string(),
      color: z.union([z.literal("red"), z.literal("normal")])
    })
  )
});

type OutputType = z.infer<typeof Output>;

export { Output };
export type { OutputType };
