import z from "zod";

import { Output } from "./output";
import { Editor } from "./editor";
import { Dimensions } from "./dimensions";

const Message = z.object({
  id: z.string(),
  output: Output,
  editor: Editor,
  dimensions: Dimensions
});

type MessageType = z.infer<typeof Message>;

export { Message };
export type { MessageType };
