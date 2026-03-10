import { sendMessageSchema } from "../app/module/message.validation";

describe("message input validation", () => {
  test("should pass with valid phone and message", () => {
    const data = {
      phone: "8801915910291",
      message: "hello",
    };
    const res = sendMessageSchema.safeParse(data);
    expect(res.success).toBe(true);
  });

  test("should fail if phone does not have country code", () => {
    const data = {
      phone: "01915910291",
      message: "hello",
    };
    const res = sendMessageSchema.safeParse(data);
    expect(res.success).toBe(false);
  });

  test("should fail if phone is missing", () => {
    const data = {
      message: "hello",
    };
    const res = sendMessageSchema.safeParse(data);
    expect(res.success).toBe(false);
  });

  test("should fail if message is missing", () => {
    const data = {
      phone: "8801915910291",
    };
    const res = sendMessageSchema.safeParse(data);
    expect(res.success).toBe(false);
  });
});
