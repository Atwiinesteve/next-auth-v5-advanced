import { auth } from "@/auth";

export default auth((req) => {
    console.log("Middleware");
})

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
