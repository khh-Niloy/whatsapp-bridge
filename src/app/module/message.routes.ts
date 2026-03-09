import { Router } from "express";
import { messageController } from "./message.controller";

export const messageRoutes = Router();

messageRoutes.post("/send", messageController.sendWpMessage);
