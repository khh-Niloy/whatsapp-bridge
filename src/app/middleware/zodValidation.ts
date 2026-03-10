import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const zodValidation =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        throw result.error;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
