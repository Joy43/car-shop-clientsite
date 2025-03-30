import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

// Type definition for the form
export type RegisterFormValues = z.infer<typeof registerSchema>;
