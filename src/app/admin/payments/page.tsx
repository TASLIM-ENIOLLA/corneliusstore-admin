import { Fragment } from "react";

import Link from "next/link";

import Title from "@/components/Admin/Template/Title";

export default function Page() {
	return (
		<Fragment>
			<Title
				title="Payments"
				subtitle="you can only view payment via our payment partner's dashboard"
			/>
			<section className="py-10">
				<div className="container">
					<div className="rounded-md py-10 px-5 bg-gray-50 border">
						<div className="text-center space-y-3">
							<div className="sentence">View all payment on our payment partner&apos;s platform</div>
							<div className="relative">
								<Link href="https://dashboard.paystack.com/#/login">
									<span className="inline-block rounded-md text-white p-3 bg-gray-800 font-bold sentence">go to dashboard</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}