"use server";

import { DEFUALT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.password || !existingUser.email) {
		return { error: "Email does not exist." };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email,
		);
		return { success: "Confirmation with verification token sent." };
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
