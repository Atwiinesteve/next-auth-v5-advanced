import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react";
import FormError from "../messages/form-error";

interface IRoleGateProps {
	children: React.ReactNode;
	allowedRole: UserRole;
}

export default function RoleGate({ children, allowedRole }: IRoleGateProps) {
	const role = useCurrentRole();

	if (role !== allowedRole) {
		return (
			<FormError message="You do not have permission to view this page." />
		);
	}

	return <>{children}</>;
}
