import type { NextFunction, Request, Response } from "express"
import { ApiError } from "../utils/ApiError.js"

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        })
    }

    console.log(err)

    return res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
    });
}
