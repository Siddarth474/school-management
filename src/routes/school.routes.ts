import { Router } from "express";
import { Validate } from "../middlewares/validate.middleware.js";
import { addSchoolSchema, listSchoolsSchema } from "../utils/validator.js";
import { addSchool, getSchoolsSortedByDistance } from "../controllers/school.controller.js";

const router = Router();

router
    .post("/addSchool", Validate(addSchoolSchema, "body"), addSchool)
    .get("/listSchools", Validate(listSchoolsSchema, "query"), getSchoolsSortedByDistance);

export default router;
