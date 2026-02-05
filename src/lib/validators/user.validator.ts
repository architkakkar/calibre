import { z } from "zod";

export const userResponseSchema = z.object({
  firstName: z.string(),
  lastName: z.string().nullable(),
  email: z.string().email(),
  imageUrl: z.string().nullable(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
