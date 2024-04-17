import { auth } from "@/auth";

export default async function userAuth() {
	const session = await auth();
	return session?.user;
}
