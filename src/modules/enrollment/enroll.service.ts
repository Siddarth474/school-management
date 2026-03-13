import { Status } from "../../../generated/prisma/enums.js";
import { prisma } from "../../lib/prisma.js";
import { ApiError } from "../../utils/ApiError.js"

const enrollInCourse = async (
    userId: number, 
    courseId: number
) => {
    if(!userId || !courseId) {
        throw new ApiError(401, "Undefined userId or courseId");
    }

    const course = await prisma.course.findUnique({
        where: { id: courseId}
    });

    if(!course) {
        throw new ApiError(404, "Course not found");  
    }

    if(course.status === Status.PENDING || course.status === Status.REJECTED) {
        throw new ApiError(403, "Cannot be enrolled in this course");
    }

    const alreadyEnrolled = await prisma.enrollement.findFirst({
        where: {
            userId: userId,
            courseId: courseId
        }
    });

    if(alreadyEnrolled) {
        throw new ApiError(409, "Already enrolled in this course");
    }

    const enrolled = await prisma.enrollement.create({
        data: {
            userId: userId,
            courseId: courseId
        }
    });

    return enrolled;
    
}

export {
    enrollInCourse,
}