import React from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import CardWrapper from "./card-wrapper";

export default function ErrorCard() {
	return (
		<CardWrapper
			headerLabel="An error occurred while processing your request."
			backButtonLabel="Back to Login"
			backButtonHref="/auth/login">
			<div className="w-full flex justify-center items-center">
				<BsFillExclamationTriangleFill className="text-destructive" />
			</div>
		</CardWrapper>
	);
}
