import { prisma } from "../lib/prisma.js";
import { calculateDistance } from "../utils/distance.js";
import { ListSchoolsInput, SchoolInput } from "../utils/validator.js";

export const addSchool = async (school: SchoolInput) => {
    return await prisma.school.create({
        data: school,
    });
}   

export const getSchoolsSortedByDistance = async (coordinates: ListSchoolsInput) => {
    const { latitude, longitude } = coordinates;
    const schools = await prisma.school.findMany();

    const schoolsWithDistance = schools.map((school: SchoolInput) => ({
        ...school,
        distance_km: calculateDistance(latitude, longitude, school.latitude, school.longitude),
    }));

    const sortedSchools = schoolsWithDistance.sort((a: any, b: any) => a.distance_km - b.distance_km);

    return sortedSchools;
    
}