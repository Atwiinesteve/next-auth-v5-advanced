import React from "react";

interface IHeaderProps {
	label: string;
}

export default function Header({ label }: IHeaderProps) {
	return (
		<div className="w-full flex flex-col gap-y-4 items-center justify-center">
			<h1 className="text-3xl font-bold">Auth</h1>
			<p className="text-center font-bold">{label}</p>
		</div>
	);
}
