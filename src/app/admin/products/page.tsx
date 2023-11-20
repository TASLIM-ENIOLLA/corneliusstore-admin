"use client";

import { concatURL } from "@/utils/functions"

import { Fragment } from "react";

import Link from "next/link";

import Title from "@/components/Admin/Template/Title";
import ProductCard from "@/components/Admin/Products/ProductCard";

import { useState, useMemo, useEffect } from "react";

export default function Page() {
	const [products, setProducts] = useState([]);

	useState(() => {
		const fetchOptions: any = { cache: "no-cache" };
		const fetchURL: string = concatURL("/api/admin/products");

		fetch(fetchURL, fetchOptions)
		.then((response) => response.json())
		.then(({ data }) => setProducts(data.rows))
		.catch((error) => alert("Failed to load products"));
	}, [])

	return (
		<Fragment>
			<Title
				title="products"
				subtitle="List of all products"
			/>
			<section className="py-10">
				<div className="container">
					<div className="space-y-5">
						<div className="space-y-2">
							<Link href="/admin/products/new" className="inline-block px-10 py-3 shadow-lg bg-gray-900 rounded">
								<span className="text-sm capitalize font-bold text-white">add new product</span>
							</Link>
						</div>
						<div className="space-y-3">
							<form className="grid md:grid-cols-4">
								<div className="col-span-2">
									<input
										placeholder="Type here to search products..."
										className="block w-full text-sm rounded-md border p-3"
									/>
								</div>
							</form>
						</div>
						{useMemo(() => {
							if(products.length) {
								return (
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-10">
										{products.map((props: any, index: number) => (
											<ProductCard key={index} {...props} />
										))}
									</div>
								);
							}

							return (
								<section className="py-5 border rounded-md">
									<div className="flex items-center gap-5 flex-col">
										<img src="/images/loader.gif" />
										<div className="text-slate-600 capitalize font-medium">loading...</div>
									</div>
								</section>
							);
						}, [products])}
					</div>
				</div>		
			</section>		
		</Fragment>		
	);
}