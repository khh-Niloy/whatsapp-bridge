import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/AppError";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error!";

  if (err instanceof ZodError) {
    console.log(err);
    statusCode = 400;
    message = err.issues.map((issue) => issue.message).join(", ");
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
