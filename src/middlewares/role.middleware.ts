import { Request, Response, NextFunction } from "express";
import { Role } from "../../generated/prisma/enums";

interface AuthRequest extends Request {
  user?: {
    id: number
    role: string
  }
}

export const verifyRole = (...allowedRoles: Role[]) => {

  return (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    if (!allowedRoles.includes(req.user?.role as Role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid permissions"
      });
    }

    next();
  };
};
