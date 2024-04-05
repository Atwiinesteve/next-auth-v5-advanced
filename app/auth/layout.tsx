import React from "react";

interface IAuthLayoutProps {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
	return (
		<div className="h-full flex items-center justify-center bg-blue-500">
			{children}
		</div>
	);
}
