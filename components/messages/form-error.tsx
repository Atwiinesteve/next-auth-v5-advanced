import React from "react";
import { BsExclamationCircle } from "react-icons/bs";

interface IFormErrorProps {
	message?: string;
}

export default function FormError({ message }: IFormErrorProps) {
	if (!message) return null;
	return (
		<div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
			<BsExclamationCircle className="w-4 h-4" />
			<p>{message}</p>
		</div>
	);
}
