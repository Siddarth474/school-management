import { NextFunction, Request, Response } from "express";
import * as courseService from "../courses/course.service.js";

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {title, description, price} = req.body;
        const user = (req as any).user;

        const course = await courseService.createCourse(user?.id, title, description, price);

        return res.status(201).json({
            success: true,
            message: "Course Created",
            data: course
        });
        
    } catch (error) {
        next(error);
    }
}

const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, price } = req.body;
        const { courseId } = req.params;
        const user = (req as any).user;

        const updatedCourse = await courseService.updateCourse(
            Number(courseId), 
            user?.id, 
            {title, description, price}
        );

        return res.status(200).json({
            success: true,
            message: "Course Updated",
            data: updatedCourse
        });
        
    } catch (error) {
        next(error);
    }
}

const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId } = req.params;
        const { id, role } = (req as any).user;

        await courseService.deleteCourse(Number(courseId), id, role);

        return res.status(200).json({
            success: true,
            message: "Course Deleted",
        });
        
    } catch (error) {
        next(error);
    }
}

const getInstructorAllCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = (req as any).user;

        const courses = await courseService.getInstructorAllCourses(id);

        return res.status(200).json({
            success: true,
            message: "Courses Fetched",
            data: courses
        });
        
    } catch (error) {
        next(error)
    }
}

const getStudentCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = (req as any).user;

        const courses = await courseService.getStudentCourses(id);

        return res.status(200).json({
            success: true,
            message: "Courses Fetched",
            data: courses
        });
        
    } catch (error) {
        next(error)
    }
}

export {
    createCourse,
    updateCourse,
    deleteCourse,
    getInstructorAllCourses,
    getStudentCourses
}