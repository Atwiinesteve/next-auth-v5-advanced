"use client";

import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/messages/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

export default function AdminPage() {
	const onApiRouteClick = () => {
		fetch("/api/admin").then((response) => {
			if (response.ok) {
				toast.success("API route accessed successfully.");
			} else {
				toast.error("Failed to access API route.");
			}
		});
	};

	return (
		<Card className="w-[600px] shadow-md rounded-none">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">🔑 Admin</p>
			</CardHeader>
			<CardContent className="space-y-6">
				<RoleGate allowedRole={UserRole.ADMIN}>
					<FormSuccess message="You have access to the admin page." />
				</RoleGate>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only API route</p>
					<Button onClick={onApiRouteClick}>Click to test</Button>
				</div>
				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only Server Action</p>
					<Button>Click to test</Button>
				</div>
			</CardContent>
		</Card>
	);
}
