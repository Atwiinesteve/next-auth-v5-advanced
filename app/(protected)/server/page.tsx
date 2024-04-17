import UserInfo from "@/components/user-info";
import userAuth from "@/lib/user-auth";
import React from "react";

export default async function ServerPage() {
	const user = await userAuth();
	return (
		<>
			<UserInfo user={user} label="🖥️ Server Component" />
		</>
	);
}
