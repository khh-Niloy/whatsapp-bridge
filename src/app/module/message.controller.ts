import { NextFunction, Request, Response } from "express";
import { messageServices } from "./message.services";

const sendWpMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { phone, message } = req.body;
    const msgResponse = await messageServices.sendWpMessageService(
      phone,
      message,
    );
    res.json({
      success: true,
      status: 200,
      message: `message sent from ${msgResponse.from} to ${msgResponse.to}, successfully`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const messageController = {
  sendWpMessage,
};
