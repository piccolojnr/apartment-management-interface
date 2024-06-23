import { z } from "zod";

export const DeviceValidator = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" }),
    location: z
        .string()
        .min(3, { message: "Location must be at least 3 characters long" }),
    latitude: z
        .string()
        .regex(/^-?\d*(\.\d+)?$/, { message: "Latitude must be a valid number" })
        .refine(
            (val) => {
                const lat = parseFloat(val);
                return lat >= -90 && lat <= 90;
            },
            { message: "Latitude must be between -90 and 90" }
        ),
    longitude: z
        .string()
        .regex(/^-?\d*(\.\d+)?$/, { message: "Longitude must be a valid number" })
        .refine(
            (val) => {
                const lon = parseFloat(val);
                return lon >= -180 && lon <= 180;
            },
            { message: "Longitude must be between -180 and 180" }
        ),
    municipal_assembly: z.string().min(3, {
        message: "Municipal Assembly must be at least 3 characters long",
    }),
});
