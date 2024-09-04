import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(/^[A-Za-z\s]+$/, "First name cannot contain numbers"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(/^[A-Za-z\s]+$/, "Last name cannot contain numbers"),
  email: z.string().email("Invalid email format"),
  position: z
    .string()
    .min(1, "Position is required")
    .regex(/^[A-Za-z\s]+$/, "Position cannot contain numbers"),
  phoneNumber: z.string().min(8, "min 8 digits"),
});

export const updateSchema = z.object({
  id: z.number(),
  firstName: z
    .string()
    .regex(/^[A-Za-z\s]+$/, "First name cannot contain numbers")
    .optional()
    .nullable(),
  lastName: z
    .string()
    .regex(/^[A-Za-z\s]+$/, "Last name cannot contain numbers")
    .optional()
    .nullable(),
  email: z.string().email("Invalid email format").nullable().optional(),
  position: z
    .string()
    .regex(/^[A-Za-z\s]+$/, "Position cannot contain numbers")
    .optional()
    .nullable(),
  phoneNumber: z.string().min(8, "min 8 digits").nullable().optional(),
});

export type UpdateSchema = z.infer<typeof updateSchema>;
export type FormSchema = z.infer<typeof formSchema>;
