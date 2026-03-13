import { Router } from "express";
import { createCourse, deleteCourse, getInstructorAllCourses, getStudentCourses, updateCourse } from "./course.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { verifyRole } from "../../middlewares/role.middleware.js";
import { Role } from "../../../generated/prisma/enums.js";

const courseRouter = Router();

courseRouter.use(verifyJWT);

courseRouter
    .post("/create", verifyRole(Role.ADMIN, Role.INSTRUCTOR), createCourse)
    .patch("/update/:courseId", verifyRole(Role.INSTRUCTOR), updateCourse)
    .delete("/delete/:courseId", verifyRole(Role.INSTRUCTOR, Role.ADMIN), deleteCourse)
    .get("/instructor-courses", verifyRole(Role.ADMIN, Role.INSTRUCTOR), getInstructorAllCourses)
    .get("/student-courses", verifyRole(Role.STUDENT), getStudentCourses)

export default courseRouter;
