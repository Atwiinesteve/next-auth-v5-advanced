import React from "react";
import Navbar from "./_components/Navbar";

interface IProtectedRoutes {
	children: React.ReactNode;
}

export default function ProtectedLayout({ children }: IProtectedRoutes) {
	return (
		<div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-sky-500">
			<Navbar />
            {children}
		</div>
	);
}
