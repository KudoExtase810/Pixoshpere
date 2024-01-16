import { z } from "zod";

export const validators = {
    firstName: z.string(),
    lastName: z.string(),
    phone: z
        .string()
        .regex(/^[0-9]*$/, "Only nums plz")
        .length(10),
    password: z.string(),
};
