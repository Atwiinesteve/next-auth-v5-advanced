"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { ResetPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import db from "@/lib/db";

export const resetPassword = async (
	values: z.infer<typeof ResetPasswordSchema>,
	token: string | null,
) => {
	if (!token) {
		return { error: "Missing token !" };
	}

	const validatedFields = ResetPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) {
		return { error: "Invalid token !" };
	}

	const hasExpired = new Date() > new Date(existingToken.expiresAt);

	if (hasExpired) {
		return { error: "Token has expired !" };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingToken) {
		return { error: "Email does not exist." };
	}

	const hashedPassword = await bcryptjs.hash(password, 13);

	await db.user.update({
		where: {
			id: existingUser?.id,
		},
		data: {
			password: hashedPassword,
		},
	});

	await db.passwordResetToken.delete({
		where: { id: existingToken.id },
	});

	return { success: "Password has been reset successfully !" };
};
