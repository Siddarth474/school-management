import { NextFunction, Request, Response } from "express";
import * as authService from "./auth.service.js";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { access_token, access_token_expiry } from "../../config/env.js";

interface AccessPayload {
    id: number,
    email: string,
    role: string
}

const accessToken: Secret = access_token!;
const accessTokenExpiry = (access_token_expiry || "15m") as SignOptions["expiresIn"];

const generateToken = (payload: AccessPayload) => {
    return jwt.sign(
        payload, 
        accessToken, 
        {
            expiresIn: accessTokenExpiry
        }
    )
}

const registerAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        const user = await authService.registerAccount(username, email, password);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                ...user,
                password: undefined
            }
        });
        
    } catch (error) {
        next(error);
    }
} 

const loginAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await authService.loginAccount(email, password);

        const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }

        res.cookie("token", token, options as any);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                ...user,
                password: undefined,
                token
            }
        });
        
    } catch (error) {
        next(error);
    }
}

const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = (req as any).user;
        const { accountId } = req.params;
        await authService.deleteAccount(Number(id), Number(accountId), role);

        return res.status(200).json({
            success: true,
            message: "Account Deleted",
        });

    } catch (error) {
        next(error);
    }
}

const applyForInstructor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = (req as any).user;
        const request = await authService.applyForInstructor(Number(id));

        return res.status(200).json({
            success: true,
            message: "Instructor Request Sent",
            data: request
        });

    } catch (error) {
        next(error);
    }
}

export {
    registerAccount,
    loginAccount,
    deleteAccount,
    applyForInstructor
}