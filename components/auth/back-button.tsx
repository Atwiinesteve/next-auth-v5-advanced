"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface IBackButtonProps {
	label: string;
	href: string;
}

export default function BackButton({ label, href }: IBackButtonProps) {
	return (
		<Button variant="link" className="w-full font-normal" size="sm" asChild>
			<Link href={href}>{label}</Link>
		</Button>
	);
}
