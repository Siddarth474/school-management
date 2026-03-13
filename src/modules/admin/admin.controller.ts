import { NextFunction, Request, Response } from "express"
import * as adminService from "./admin.service.js"

const approveInstructorRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { requestId } = req.params;
        const request = await adminService.approveInstructorRequest(String(requestId));

        return res.status(200).json({
            success: true,
            message: "Instructor Approved",
            data: request
        });

    } catch (error) {
        next(error);
    }
}

const rejectInstructorRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { requestId } = req.params;
        const request = await adminService.rejectInstructorRequest(String(requestId));

        return res.status(200).json({
            success: true,
            message: "Instructor Rejected",
            data: request
        });

    } catch (error) {
        next(error);
    }
}

const getAllPendingCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await adminService.getAllPendingCourses();

        return res.status(200).json({
            success: true,
            message: "Pending Courses Fetched",
            data: courses
        });

    } catch (error) {
        next(error);
    }
}

const approveCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId } = req.params;
        const course = await adminService.approveCourse(Number(courseId));

        return res.status(200).json({
            success: true,
            message: "Course Approved",
            data: course
        });

    } catch (error) {
        next(error);
    }
}

const rejectCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId } = req.params;
        const course = await adminService.rejectCourse(Number(courseId));

        return res.status(200).json({
            success: true,
            message: "Course Rejected",
            data: course
        });

    } catch (error) {
        next(error);
    }
}

const getAllRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requests = await adminService.getAllRequests();

        return res.status(200).json({
            success: true,
            message: "Requests Fetched",
            data: requests
        });

    } catch (error) {
        next(error);
    }
}


export {
    getAllPendingCourses,
    approveCourse,
    rejectCourse,
    approveInstructorRequest,
    rejectInstructorRequest,
    getAllRequests
}