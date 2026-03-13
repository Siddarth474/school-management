import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { enrollInCourse } from "./enroll.controller.js";

const enrollRouter = Router();

enrollRouter.use(verifyJWT);

enrollRouter
    .post("/:courseId", enrollInCourse)

export default enrollRouter;