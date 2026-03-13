import { NextFunction, Request, Response } from "express";
import * as enrollService from "../enrollment/enroll.service.js";

const enrollInCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId } = req.params;
        const { id } = (req as any).user;

        const enrolled = await enrollService.enrollInCourse(id, Number(courseId));

        return res.status(200).json({
            success: true,
            message: "Enrolled in course",
            data: enrolled
        });
    } catch (error) {
        next(error);
    }
}

export {
    enrollInCourse,
}