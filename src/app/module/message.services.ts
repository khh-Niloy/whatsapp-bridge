import { AppError } from "../error/AppError";
import { wpClient } from "../wp-socket/whatsapp.client";

const sendWpMessageService = async (phone: string, message: string) => {
  const currentState = await wpClient.getState();

  if (currentState !== "CONNECTED") {
    throw new AppError(503, "whatsapp not connected, please try again");
  }

  const isRegistered = await wpClient.isRegisteredUser(`${phone}@c.us`);
  if (!isRegistered) {
    throw new Error("Phone number is not registered on WhatsApp");
  }

  const msgResponsesss = await wpClient.sendMessage(`${phone}@c.us`, message);
  return msgResponsesss;
};

export const messageServices = {
  sendWpMessageService,
};
