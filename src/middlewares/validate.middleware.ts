import type { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";

type RequestPart = "body" | "query" | "params";

export const Validate = (schema: ZodObject, part: RequestPart = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formatZodErrors(result.error),
      });
    }

    Object.defineProperty(req, part, { 
        value: result.data, 
        writable: true, 
        enumerable: true, 
        configurable: true 
    });

    next();
  };
};

function formatZodErrors(error: ZodError) {
  return error.issues.map((e) => ({
    field: e.path.join("."),
    message: e.message,
  }));
}
