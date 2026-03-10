import { z } from "zod";

export const sendMessageSchema = z.object({
  phone: z
    .string()
    .length(
      13,
      "Invalid phone number! It must be exactly 13 digits with country code (e.g., 8801915910291)",
    )
    .regex(/^\d+$/, "Phone must be numbers only"),
  message: z.string().min(1, "Message cannot be empty"),
});
