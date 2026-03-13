import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
import { ApiError } from "../../utils/ApiError.js";
import { Role, Status } from "../../../generated/prisma/enums.js";


const registerAccount = async (
    username: string, 
    email: string,
    password: string
) => {
    if(!username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(user) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        }
    })

    return newUser;
}

const loginAccount = async (email: string, password: string) => {
    if(!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    return user;
}

const deleteAccount = async (
    userId: number,
    accountId: number,
    role: Role
) => {
    if(!userId) {
        throw new ApiError(401, "Undefined User Id");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: accountId
        }
    });

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    if(role !== Role.ADMIN && user.id !== userId) {
        throw new ApiError(403, "Not allowed to delete");
    }

    return prisma.user.delete({
        where: {id: accountId}
    });
}

const applyForInstructor = async (userId: number) => {

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    if(user.role === Role.INSTRUCTOR) {
        throw new ApiError(400, "User already Instructor");
    }

    const existingRequest = await prisma.instructorRequest.findFirst({
        where: {
            userId,
            status: Status.PENDING
        }
    });
    
    if (existingRequest) {
        throw new ApiError(400, "Request already pending");
    }

    return prisma.instructorRequest.create({
        data: {
            userId
        }
    });
};

export {
    registerAccount,
    loginAccount,
    deleteAccount,
    applyForInstructor
}