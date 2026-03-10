import express, { Request, Response } from "express";
import { routes } from "./route";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { rateLimiter } from "./app/middleware/rateLimiter";

export const app = express();

app.use(express.json());

app.use(rateLimiter);

app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to whatsapp-bridge backend",
  });
});

app.use(globalErrorHandler);
