import { Router } from "express";
import { messageController } from "./message.controller";
import { zodValidation } from "../middleware/zodValidation";
import { sendMessageSchema } from "./message.validation";

export const messageRoutes = Router();

messageRoutes.post(
  "/send",
  zodValidation(sendMessageSchema),
  messageController.sendWpMessage,
);
