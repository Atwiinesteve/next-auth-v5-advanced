"use server";

import { DEFUALT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import {
	generateTwoFactorToken,
	generateVerificationToken,
} from "@/lib/tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import db from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.password || !existingUser.email) {
		return { error: "Email does not exist." };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email,
		);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token,
		);
		return { success: "Confirmation with verification token sent." };
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
			if (!twoFactorToken) {
				return { error: "Invalid two factor token!" };
			}
			if (twoFactorToken.token !== code) {
				return { error: "Invalid two factor token!" };
			}
			const hasExpired = new Date(twoFactorToken.expiresAt) < new Date();
			if (hasExpired) {
				return { error: "Two factor token has expired!" };
			}

			await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

			const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id },
				});
			}

			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			});
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);
			await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
			return { twoFactor: true };
		}
	}

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFUALT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials!" };
				default:
					return { error: "Something went wrong!" };
			}
		}

		throw error;
	}
};
