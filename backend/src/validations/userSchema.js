import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string("Not a valid an email")
    .email()
    .lowercase()
    .trim(),
  username: z.string()
    .min(5, "Username should be of 5 charaters long")
    .max(8, "Username cannot be longer that 8 charaters"),
  password:  z.string()
    .min(8, "Password to weak! Use atleast 8 charaters"),
  role: z.enum(["USER", "ADMIN"])
})