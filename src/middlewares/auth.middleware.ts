import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { access_token } from "../config/env";
import { prisma } from "../lib/prisma";

interface CustomPayload extends JwtPayload {
    id: string;
}

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if(!token) {
            throw new ApiError(401, "Unauthorized");
        }

        const decodedToken = jwt.verify(token, access_token!) as CustomPayload;

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(decodedToken?.id)
            }
        })

        if(!user) {
            throw new ApiError(404, "User not found");
        } 

        (req as any).user = user;
        next();
        
    } catch (error) {
        next(error);
    }
}