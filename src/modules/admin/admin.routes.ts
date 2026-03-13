import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { 
    approveCourse,  
    approveInstructorRequest,  
    getAllPendingCourses, 
    getAllRequests, 
    rejectCourse, 
    rejectInstructorRequest 
} from "./admin.controller.js";
import { verifyRole } from "../../middlewares/role.middleware.js";
import { Role } from "../../../generated/prisma/enums.js";

const adminRouter = Router();

adminRouter
    .use(verifyJWT)
    .use(verifyRole(Role.ADMIN))
    .get("/pending-courses", getAllPendingCourses)
    .patch("/courses/:courseId/approve", approveCourse)
    .patch("/courses/:courseId/reject", rejectCourse)
    .patch("/instructors/:requestId/approve", approveInstructorRequest)
    .patch("/instructors/:requestId/reject", rejectInstructorRequest)
    .get("/requests", getAllRequests)

export default adminRouter; 