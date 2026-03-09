import { Request, Response } from "express";
import { AppError } from "../error/AppError";

export const globalErrorHandler = (err: any, req: Request, res: Response) => {
  let statusCode = 500;
  let message = "Internal Server Error!";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.json({
    status: statusCode,
    success: false,
    message,
  });
};
