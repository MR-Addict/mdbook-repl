import z from "zod";

const Dimensions = z.object({
  width: z.number(),
  height: z.number()
});

type DimensionsType = z.infer<typeof Dimensions>;

export { Dimensions };
export type { DimensionsType };
