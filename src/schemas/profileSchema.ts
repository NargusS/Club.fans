import { z } from "zod";

export const editProfileSchema = z.object({
	name: z.email().optional(),
	monthlyPrice: z.number().optional(),
});

export type EditProfileRequest = z.infer<typeof editProfileSchema>;
