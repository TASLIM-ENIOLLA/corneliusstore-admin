"use client";

import { Fragment } from "react";

import { usePathname } from 'next/navigation';

import Template from "@/components/Admin/Template";

export default function Layout({ children }: LayoutPropsType) {
	const pathname = usePathname();

	if(pathname === "/admin/login") {
		return (
			<Fragment>
				{children}
			</Fragment>
		);
	}

	return (
		<Template>
			{children}
		</Template>
	);
}

type LayoutPropsType = {
	children: React.ReactNode
}