import { z } from "zod"; 

export const addSchoolSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),

  address: z
    .string({ message: "Address is required" })
    .trim()
    .min(3, "Address must be at least 3 characters")
    .max(255, "Address must be at most 255 characters"),

  latitude: z
    .number({ message: "Latitude is required and must be a number" })
    .min(-90, "Latitude must be >= -90")
    .max(90,  "Latitude must be <= 90"),

  longitude: z
    .number({ message: "Longitude is required and must be a number" })
    .min(-180, "Longitude must be >= -180")
    .max(180,  "Longitude must be <= 180"),
});

export const listSchoolsSchema = z.object({
  latitude: z
    .string({ message: "Latitude is required" })
    .transform(val => parseFloat(val))  
    .pipe(z.number().min(-90).max(90)),

  longitude: z
    .string({ message: "Longitude is required" })
    .transform(val => parseFloat(val))
    .pipe(z.number().min(-180).max(180)),
});

export type SchoolInput = z.infer<typeof addSchoolSchema>;
export type ListSchoolsInput = z.infer<typeof listSchoolsSchema>;