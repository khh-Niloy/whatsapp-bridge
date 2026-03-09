import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

export const wpClient = new Client({
  authStrategy: new LocalAuth(),
});

wpClient.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

wpClient.on("ready", () => {
  console.log("WhatsApp ready!");
});

wpClient.on("authenticated", () => {
  console.log("authenticated");
});

wpClient.on("auth_failure", () => {
  console.log("auth_failure");
});

wpClient.on("disconnected", () => {
  console.log("disconnected");
});
