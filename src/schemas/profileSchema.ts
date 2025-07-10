import { z } from "zod";

export const editProfileSchema = z.object({
	username: z.string().optional(),
	monthlyPrice: z.number().optional(),
});

export type EditProfileRequest = z.infer<typeof editProfileSchema>;
