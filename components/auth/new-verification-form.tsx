"use client";

import { BeatLoader } from "react-spinners";
import React from "react";
import { toast } from "sonner";

import CardWrapper from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";

export default function NewVerificationForm() {
	const [success, setSuccess] = React.useState<string | undefined>("");
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const onSubmit = React.useCallback(() => {
		if (!token) {
			toast.info("Missing token!");
			return;
		}
		newVerification(token)
			.then(() => {
				toast.success("Email verified successfully!");
				setSuccess("Email verified successfully!");
			})
			.catch((error) => {
				toast.error(error.message);
			});
	}, [token]);
	React.useEffect(() => {
		onSubmit();
	}, [onSubmit]);
	return (
		<CardWrapper
			headerLabel="Comnfirming your email verification"
			backButtonLabel="Back to login page"
			backButtonHref="/auth/login">
			<div className="flex items-center w-full justify-center">
				{!success && <BeatLoader />}
				<p className="text-green-500">{success}</p>
			</div>
		</CardWrapper>
	);
}
