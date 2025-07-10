import { z } from "zod";

export const createMediaSchema = z.object({
	mediaUrl: z.url("Invalid media URL"),
	blurredMediaUrl: z.url("Invalid blurred media URL"),
});

export type CreateMediaRequest = z.infer<typeof createMediaSchema>;
