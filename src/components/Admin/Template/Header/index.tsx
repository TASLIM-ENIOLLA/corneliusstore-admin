import Link from "next/link";
import Image from "next/image";

import { routes, RouteType } from "./__props/routes";

export default function Component() {
	return (
		<section className="sticky top-0 left-0 shadow-xl bg-gray-800">
			<header className="py-3">
				<div className="container">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-10">
							<div className="p-1 bg-white rounded-full">
								<Image
									width="35"
									height="35"
									src="/favicon.ico"
									alt="Cornelius Store Logo"
								/>
							</div>
							<div className="hidden md:flex gap-10 items-center">
								{routes.map(({ name, title, icon, href }: RouteType) => (
									<Link href={href} key={href}>
										<span title={title} className="text-white font-bold capitalize">{name}</span>
									</Link>
								))}
							</div>
						</div>
						<div className="hidden md:block">
							<div className="rounded-full border-4 border-gray-300 bg-white">
								<div className="flex w-[35px] h-[35px] items-center justify-center">
									<span className="text-gray-600 text-lg font-bold uppercase">te</span>
								</div>
							</div>
						</div>
						<details className="md:hidden relative">
	          	<summary style={{ listStyleType: "none"}}>
	              <button style={{ pointerEvents: "none" }} className="border-2 space-x-3 font-medium border-white rounded-lg py-1 px-3 capitalize text-white">
	                <span className="bi-border-width"></span>
	              </button>
	            </summary>
	            <div className="absolute top-full right-0 py-5">
	              <div style={{ backdropFilter: "blur(10px)" }} className="w-[80vw] max-w-[300px] rounded-lg border-2 border-gray-600 shadow-xl bg-gray-800">
                  <div className="block md:hidden divide-y divide-dotted divide-gray-700">
                    {routes.map(({ name, href }: RouteType, index: number) => (
                      <Link key={index} href={href} className="block p-3 text-sm text-white font-medium capitalize">
                        {name}
                      </Link>
                    ))}
	                </div>
	              </div>
	            </div>
	          </details>
					</div>
				</div>
			</header>
		</section>
	);
}