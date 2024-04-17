"use client";

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { FaUser } from 'react-icons/fa';
import { MdOutlineLogout } from "react-icons/md";
import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from './logout-button';

type Props = {}

export default function UserButton({}: Props) {
    const user = useCurrentUser();
  return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user?.image || ""} />
					<AvatarFallback className="bg-sky-500">
						<FaUser className="text-white w-6 h-6" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="rounded-none">
				<LogoutButton>
					<DropdownMenuItem>
						<MdOutlineLogout className='h-4 w-4 mr-2' />
						Logout
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}