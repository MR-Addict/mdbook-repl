import z from "zod";

const Output = z.object({
  status: z.enum(["idle", "loading", "running", "finished"]),
  data: z.array(
    z.object({
      msg: z.array(z.any()),
      color: z.enum(["red", "yellow", "normal"])
    })
  )
});

const Outputs = z.object({
  python: Output,
  typescript: Output,
  javascript: Output
});

type OutputType = z.infer<typeof Output>;
type OutputsType = z.infer<typeof Outputs>;

export { Output, Outputs };
export type { OutputType, OutputsType };
