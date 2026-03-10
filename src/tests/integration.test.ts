import request from "supertest";
import { messageServices } from "../app/module/message.services";
import { app } from "../app";
import { AppError } from "../app/error/AppError";

describe("POST request for /api/v1/messages/send", () => {
  test("should return 503 if whatsapp is not connected", async () => {
    jest
      .spyOn(messageServices, "sendWpMessageService")
      .mockRejectedValue(
        new AppError(503, "whatsapp not connected, please try again"),
      );

    const res = await request(app)
      .post("/api/v1/messages/send")
      .send({ phone: "8801915910291", message: "hello" });

    expect(res.status).toBe(503);
  });

  test("should send message successfully", async () => {
    jest.spyOn(messageServices, "sendWpMessageService").mockResolvedValue({
      from: "8801915910291@c.us",
      to: "8801915910291@c.us",
    } as any);

    const res = await request(app)
      .post("/api/v1/messages/send")
      .send({ phone: "8801915910291", message: "hello" });

    expect(res.body.status).toBe(200);
  });

  test("should fail if phone is missing", async () => {
    const res = await request(app)
      .post("/api/v1/messages/send")
      .send({ message: "hello" });
    expect(res.status).toBe(400);
  });

  test("should fail if message is missing", async () => {
    const res = await request(app)
      .post("/api/v1/messages/send")
      .send({ phone: "8801915910291" });
    expect(res.status).toBe(400);
  });

  test("should fail if phone digit > 13", async () => {
    const res = await request(app)
      .post("/api/v1/messages/send")
      .send({ phone: "880191591029123" });
    expect(res.status).toBe(400);
  });

  test("should fail if phone does not have country code", async () => {
    const res = await request(app)
      .post("/api/v1/messages/send")
      .send({ phone: "01915910291" });
    expect(res.status).toBe(400);
  });
});
