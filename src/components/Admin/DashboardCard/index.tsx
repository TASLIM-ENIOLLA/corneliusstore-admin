import Link from "next/link";

import { RouteType } from "@/components/Admin/Template/Header/__props/routes";

export default function Component(props: RouteType) {
	const { name, icon, title, href, color } = props;

	return (
		<article className="cursor-pointer shadow bg-gray-300 bg-opacity-25 rounded-lg p-5">
			<div className="space-y-3">
				<div className={`flex items-center justify-center ${color} bg-opacity-50 w-[50px] h-[50px] rounded-full`}>
					<span className={`text-xl text-white ${icon}`}></span>
				</div>
				<div className="">
					<Link href={href} className="capitalize font-bold md:text-xl text-gray-800">{name}</Link>
					<div className="text-sm md:text-base text-gray-600 font-medium sentence">{title}</div>
				</div>
			</div>			
		</article>
	);
}