"use client";

import React from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login.action";
import FormError from "../messages/form-error";
import FormSuccess from "../messages/form-success";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
	const searchParams = useSearchParams();
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email Already in use by another provider"
			: "";
	const [showTwoFactor, setShowToFactor] = React.useState(false);
	const [error, setError] = React.useState<string | undefined>("");
	const [success, setSuccess] = React.useState<string | undefined>("");
	const [isPending, startTransition] = React.useTransition();
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
			code: "",
		},
	});
	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");
		startTransition(() => {
			login(values)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}
					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}
					if (data?.twoFactor) {
						setShowToFactor(true);
					}
				})
				.catch(() => {
					setError("Something went wrong.");
				});
		});
	};
	return (
		<CardWrapper
			headerLabel="Welcome Back"
			backButtonLabel="Don't have an account"
			backButtonHref="/auth/register"
			showSocial>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{!showTwoFactor ? (
						<>
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													disabled={isPending}
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
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													disabled={isPending}
													{...field}
													type="password"
													placeholder="*******"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</>
					) : (
						<>
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Two Factor Code</FormLabel>
											<FormControl>
												<Input
													disabled={isPending}
													{...field}
													placeholder="123456789"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</>
					)}
					<Button variant="link" className="px-0 font-normal" size="sm" asChild>
						<Link href="/auth/reset">Forgot Password ?</Link>
					</Button>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type="submit" className="w-full">
						{isPending ? (
							<span className="loading loading-spinner loading-sm"></span>
						) : (
							<>{showTwoFactor ? "Confirm" : "Login"}</>
						)}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
}
