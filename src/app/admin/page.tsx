"use client";

import { Fragment } from "react";

import { routes, RouteType } from "@/components/Admin/Template/Header/__props/routes";

import Title from "@/components/Admin/Template/Title";

import DashboardCard from "@/components/Admin/DashboardCard";

export default function Page() {
	return (
		<Fragment>
			<Title
				title="Home"
				subtitle="lorem ipsum dolor sit amet consectuer adipising ipsum dolor sit amet consectuer adipising"
			/>
			<section className="py-10">
				<div className="container">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
						{routes.filter(({ href }: { href: string }) => href !== "/admin").map((props: RouteType, index: number) => (
							<DashboardCard key={index} {...props} />
						))}
					</div>
				</div>
			</section>
		</Fragment>
	);
}