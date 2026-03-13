import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";

const createCourse = async (
    insructorId: number, 
    title: string, 
    description: string, 
    price: number
) => {
    if(!title || !description || !price) {
        throw new ApiError(400, "All fields are required");
    }
    
    if(!insructorId) {
        throw new ApiError(401, "Undefined userId");
    }

    const newCourse = await prisma.course.create({
        data: {
            title,
            description,
            price,
            insructorId: insructorId
        }
    });

    return newCourse;
}

const updateCourse = async (
    courseId: number, 
    instructorId: number, 
    data: {
        title?: string, 
        description?: string, 
        price?: number
    }
) => {

    const course = await prisma.course.findFirst({
        where: {
            id: courseId,
            insructorId: instructorId
        }
    });

    if(!course) throw new ApiError(403,"Not allowed");

    return prisma.course.update({
        where: { id: courseId },
        data
    });
}

const deleteCourse = async (
    courseId: number,
    userId: number,
    role: Role
) => {
    const course = await prisma.course.findFirst({
        where: {
            id: courseId,
        }
    });

    if(!course) throw new ApiError(404,"Course not found");

    if(role !== Role.ADMIN && course.insructorId !== userId) {
        throw new ApiError(403, "Not allowed to delete this course");
    }

    return prisma.course.delete({
        where: { id: courseId }
    });
} 

const getInstructorAllCourses = async (
    insructorId: number,
) => {
    if(!insructorId) {
        throw new ApiError(401, "Undefined userId");
    }

    const courses = await prisma.course.findMany({
        where: {
            insructorId: insructorId
        }
    });

    if(!courses) {
        throw new ApiError(404, "No courses found");
    }

    return courses;
}

const getStudentCourses = async (
    userId: number,
) => {
    if(!userId) {
        throw new ApiError(401, "Undefined userId");
    }

    // const enrolledCourses = await prisma.enrollement.findMany({
    //     where: {
    //         userId: userId
    //     },
    //     include: {
    //         course: true
    //     }
    // });

    const enrolledCourses = await prisma.course.findMany({
        where: {
            enrollments: {
                some: {
                    userId: userId
                },
            }
        },
    });

    if(!enrolledCourses) {
        throw new ApiError(404, "No courses found");
    }

    return enrolledCourses;
}
 
export {
    createCourse,
    updateCourse,
    deleteCourse,
    getInstructorAllCourses,
    getStudentCourses,
}