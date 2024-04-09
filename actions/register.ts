"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}

	const { email, name, password } = validatedFields.data;
	const hashedPassword = await bcryptjs.hash(password, 14);

	const userEmailExists = await getUserByEmail(email);

	if (userEmailExists) {
		return { error: "Email already exists" };
	}

	await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});

	// TODO: Send verification token email

	return { success: "User created.." };
};
