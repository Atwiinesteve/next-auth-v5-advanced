"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import React from "react";

export default function Settings() {
	const user = useCurrentUser();
	return (
		<div className="bg-white p-10 rounded-xl">
			<Button
				onClick={() => {
					signOut();
				}}
				type="submit">
				Logout
			</Button>
		</div>
	);
}
