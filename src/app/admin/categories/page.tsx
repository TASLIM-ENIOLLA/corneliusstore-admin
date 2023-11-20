"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { concatURL } from "@/utils/functions"

import Title from "@/components/Admin/Template/Title";

import DataTable from "@/components/Admin/DataTable";

export default function Page() {
	const categoriesStore = useRef <undefined | Record <string, any> []> ();
	
	const [ categories, setCategories ] = useState <undefined | Record <string, any> []> ();
	const [ searchParams, setSearchParams ] = useState <{ query: string }> ({
		query: ""
	});

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		fetch(concatURL("/api/admin/categories"), { signal })
		.then((response) => response.json())
		.then(({ data }) => {
			categoriesStore.current = data.rows.map((oldData: Record <string, any>) => ({
				...oldData,
				timestamp: new Date(oldData.timestamp).toDateString()
			}));

			setCategories(categoriesStore.current);
		})

		return () => {
			controller.abort();
		};
	}, []);

	useEffect(() => {
		if(searchParams.query.length) {
			onSearch();
		}
		else {
			setCategories(categoriesStore.current);
		}
	}, [searchParams.query]);

	function onSearch(event?: any): void {
		if(typeof event !== "undefined") {
			event.preventDefault();
		}

		const { query }: { query: string } = searchParams;

		setCategories(undefined);

		if(categoriesStore.current && Array.isArray(categoriesStore.current)) {
			setCategories(categoriesStore.current.filter(({ name }: { name: string }) => {
				return new RegExp(query, "i").test(name);
			}));
		}
	}

	return (
		<Fragment>
			<Title
				title="categories"
				subtitle="lorem ipsum dolor sit amet consectuer adipising ipsum dolor sit amet consectuer adipising"
			/>
			<section className="py-10">
				<div className="container">
					<div className="space-y-5">
						<div className="space-y-2">
							<Link href="/admin/categories/new" className="inline-block p-3 shadow-lg bg-gray-900 rounded">
								<span className="text-sm capitalize font-bold text-white">create new category</span>
							</Link>
						</div>
						<div className="space-y-3">
							<form onSubmit={(event: any) => onSearch(event)} className="grid md:grid-cols-4">
								<div className="col-span-2">
									<input
										value={searchParams.query}
										placeholder="Type here to search..."
										className="block w-full text-sm rounded-md border p-3"
										onChange={({ target: { value } }) => setSearchParams((n) => ({
											...n,
											query: value
										}))}
									/>
								</div>
							</form>
							<div>
								<DataTable
									serialize={true}
									data={categories}
									actions={{
										edit: "/admin/categories/edit/:id",
										delete: "/admin/categories/delete/:id",
									}}
									cols={[
										{ key: "name", name: "category name"},
										{ key: "description", name: "description"},
										{ key: "timestamp", name: "created on"},
									]}
								/>
							</div>
						</div>
					</div>
				</div>		
			</section>
		</Fragment>		
	);
}