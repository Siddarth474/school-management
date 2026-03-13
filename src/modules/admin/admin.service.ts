import { Role, Status } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { ApiError } from "../../utils/ApiError";

const getAllPendingCourses = async () => {
    const pendingCourses = await prisma.course.findMany({
        where: {
            status: Status.PENDING
        }
    });

    return pendingCourses;
}

const approveCourse = async (courseId: number) => {
    const course = await prisma.course.findUnique({
        where: {
            id: courseId
        }
    });

    if(!course) {
        throw new ApiError(404, "Course not found");
    }

    if(course.status === Status.APPROVED) {
        throw new ApiError(400, "Course already approved");
    }

    return prisma.course.update({
        where: {
            id: courseId
        },
        data: {
            status: Status.APPROVED
        }
    });

}

const rejectCourse = async (courseId: number) => {
    const course = await prisma.course.findUnique({
        where: {
            id: courseId
        }
    });

    if(!course) {
        throw new ApiError(404, "Course not found");
    }

    if(course.status === Status.REJECTED) {
        throw new ApiError(400, "Course already rejected");
    }

    return prisma.course.update({
        where: {
            id: courseId
        },
        data: {
            status: Status.REJECTED
        }
    });

}

const getAllRequests = async () => {
    return prisma.instructorRequest.findMany({
        where: {
            status: Status.PENDING,
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true
                }
            }
        }
    });
}

const approveInstructorRequest = async (requestId: string) => {

  const request = await prisma.instructorRequest.findUnique({
    where: { id: requestId }
  });

  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  if (request.status === Status.APPROVED) {
    throw new ApiError(400, "Request already approved");
  }

  const result = await prisma.$transaction(async (tx) => {

    const updatedRequest = await tx.instructorRequest.update({
      where: { id: requestId },
      data: { status: Status.APPROVED }
    });

    await tx.user.update({
      where: { id: request.userId },
      data: { role: Role.INSTRUCTOR }
    });

    return updatedRequest;
  });

  return result;
};

const rejectInstructorRequest = async (requestId: string) => {
    const request = await prisma.instructorRequest.findUnique({
        where: { id: requestId }
    });

    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    if (request.status === Status.REJECTED) {
        throw new ApiError(400, "Request already rejected");
    }

    const result = await prisma.$transaction(async (tx) => {

        const updatedRequest = await tx.instructorRequest.update({
            where: { id: requestId },
            data: { status: Status.REJECTED }
        });

        await tx.user.update({
            where: { id: request.userId },
            data: { role: Role.STUDENT }
        });

        return updatedRequest;
    });

    return result;

}

export {
    getAllPendingCourses,
    approveCourse,
    rejectCourse,
    approveInstructorRequest,
    rejectInstructorRequest,
    getAllRequests
}