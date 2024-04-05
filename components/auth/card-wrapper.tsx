"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "./header";
import { Social } from "./social";
import BackButton from "./back-button";

interface ICardWrapperProps {
	children: React.ReactNode;
	headerLabel: string;
	backButtonLabel: string;
	backButtonHref: string;
	showSocial?: boolean;
}

export default function CardWrapper({
	children, 
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
}: ICardWrapperProps) {
	return (
		<Card className="w-[400px] shadow-md bg-white">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	);
}
