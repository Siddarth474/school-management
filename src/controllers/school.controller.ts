import { Request, Response, NextFunction } from "express";
import * as SchoolService from "../services/school.service.js";
import { ApiResponse } from "../utils/ApiResponse";
import { ListSchoolsInput, SchoolInput } from "../utils/validator.js";

export const addSchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto = req.body as SchoolInput;
        const school = await SchoolService.addSchool(dto);
        return res.status(201).json(
            new ApiResponse(201, "School added successfully", school)
        );
    } catch (error) {
        next(error);
    }
}

export const getSchoolsSortedByDistance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schools = await SchoolService.getSchoolsSortedByDistance(req.query as unknown as ListSchoolsInput);
        return res.status(200).json(
            new ApiResponse(200, "Schools fetched successfully", schools)
        );
    } catch (error) {
        next(error);
    }
}