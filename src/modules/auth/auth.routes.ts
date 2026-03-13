import { Router } from "express";
import { 
    deleteAccount, 
    applyForInstructor, 
    loginAccount, 
    registerAccount 
} from "./auth.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";
import { verifyRole } from "../../middlewares/role.middleware";
import { Role } from "../../../generated/prisma/enums";

const authRouter = Router();

authRouter
    .post("/register", registerAccount)
    .post("/login", loginAccount)
    .use(verifyJWT)
    .delete("/delete-account/:accountId", deleteAccount)
    .post("/instructor-request", verifyRole(Role.STUDENT, Role.INSTRUCTOR), applyForInstructor)

export default authRouter;
