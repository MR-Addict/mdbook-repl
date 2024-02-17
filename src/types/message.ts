import z from "zod";

import { Output } from "./output";
import { Dimensions } from "./dimensions";
import { Editor } from "./editor";

const Message = z.object({
  id: z.string(),
  output: Output,
  editor: Editor,
  dimensions: Dimensions
});

type MessageType = z.infer<typeof Message>;

export { Message };
export type { MessageType };
