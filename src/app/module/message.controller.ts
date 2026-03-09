import { NextFunction, Request, Response } from "express";
import { messageServices } from "./message.services";

const sendWpMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { phone, message } = req.body;
    const data = await messageServices.sendWpMessageService(phone, message);
    res.json({
      status: 200,
      message: `message sent from ${data.from} to ${data.to}, successfully`,
      data: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const messageController = {
  sendWpMessage,
};
