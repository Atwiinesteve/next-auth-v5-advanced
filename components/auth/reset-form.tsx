"use client";

import React from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../messages/form-error";
import FormSuccess from "../messages/form-success";
import { reset } from "@/actions/reset";

export function ResetForm() {
	const [error, setError] = React.useState<string | undefined>("");
	const [success, setSuccess] = React.useState<string | undefined>("");
	const [isPending, startTransition] = React.useTransition();
	const form = useForm<z.infer<typeof ResetSchema>>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: "",
		},
	});
	const onSubmit = (values: z.infer<typeof ResetSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			reset(values).then((data) => {
				setError(data?.error);
				// TODO: To add email verification for success to exist later.
				setSuccess(data?.success);
			});
		});
	};
	return (
		<CardWrapper
			headerLabel="Forgot your password?"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
				 						<Input
											{...field}
											placeholder="johndoe@gmail.com"
											type="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit" className="w-full">
						Send Reset Link
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
}
