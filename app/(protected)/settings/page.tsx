import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

export default async function Settings() {
	const session = await auth();
	return (
		<div>
			{JSON.stringify(session)}
			<form
				action={async () => {
					"use server";
					await signOut();
				}}>
				<Button type="submit">Logout</Button>
			</form>
		</div>
	);
}