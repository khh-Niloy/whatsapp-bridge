import rateLimit from "express-rate-limit";
import { envVars } from "../config/env";

export const rateLimiter = rateLimit({
  windowMs: envVars.RATE_LIMIT_WINDOW_MS,
  max: envVars.RATE_LIMIT_MAX,
  message: {
    success: false,
    status: 429,
    message: "Too many requests, please try again later",
  },
});
