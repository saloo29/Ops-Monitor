import { z } from "zod";

export const signUpSchema = z.object({
  Email: z.string("Not a valid an email")
    .email()
    .lowercase()
    .trim(),
  Username: z.string()
    .min(5, "Username should be of 5 charaters long")
    .max(8, "Username cannot be longer that 8 charaters"),
  Password:  z.string()
    .min(8, "Password to weak! Use atleast 8 charaters"),
  role: z.enum(["USER", "ADMIN"])
})