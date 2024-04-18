"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import db from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import userAuth from "@/lib/user-auth";
import { SettingsSchema } from "@/schemas";
import { z } from "zod";
import bcrpyt from "bcryptjs";

export async function settings(values: z.infer<typeof SettingsSchema>) {
	const user = await userAuth();

	if (!user) {
		return { error: "Unauthorized.." };
	}

	const dbUser = await getUserById(user.id);

	if (!dbUser) {
		return { error: "Unauthorized.." };
	}

	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}

	if (values.email && values.email !== user.email) {
		const exisitingUser = await getUserByEmail(values.email);

		if (exisitingUser && exisitingUser.id !== user.id) {
			return { error: "Email already in use!" };
		}

		const verificationToken = await generateVerificationToken(values.email);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token,
		);

		return { success: "Verification email sent!" };
	}

	if (values.newPassword && values.password && dbUser.password) {
		const passwordMatch = await bcrpyt.compare(values.password, dbUser.password);
		if(!passwordMatch) {
			return { error: "Password is incorrect!" };
		}
		const hashedPassword = await bcrpyt.hash(values.newPassword, 13);
		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	await db.user.update({
		where: { id: dbUser.id },
		data: { ...values },
	});

	return { success: "Settings updated!" };
}
