"use client";

import Link from "next/link";

import prettyBytes from 'pretty-bytes';

import { concatURL } from "@/utils/functions"

import Title from "@/components/Admin/Template/Title";

import { Fragment, useMemo, useState, useEffect } from "react";

export default function Page({ params }) {
	type ProductDataType = Record <string, string | File []>;

	const { productID }: { productID: string } = params;

	const [types, setTypes] = useState <any []> ([]);
	const [dnDStates, setDnDStates] = useState <number> (0);
	const [categories, setCategories] = useState <any []> ([]);
	const [productData, setProductData] = useState <undefned | ProductDataType> ();

	useEffect(() => {
		fetch(concatURL("/api/admin/categories"))
		.then((request) => request.json())
		.then(({ data: { rows } }: { data: { rows: any []} }) => setCategories(rows.sort((a, b) => {
			if(a.name > b.name) return 1;
			else if(a.name < b.name) return -1;
			else return 0;
		})));

		fetch(concatURL("/api/admin/types"))
		.then((request) => request.json())
		.then(({ data: { rows } }: { data: { rows: any []} }) => setTypes(rows.sort((a, b) => {
			if(a.name > b.name) return 1;
			else if(a.name < b.name) return -1;
			else return 0;
		})));

		fetch(concatURL(`/api/admin/products/${productID}`))
		.then((response) => response.json())
		.then(({ data }) => {
			const { name, id, categoryID, paymentLink, price, timestamp, typeID, images } = data.row;

			setProductData({
				id, name, price, images, category: categoryID, paymentLink, type: typeID, timestamp
			});
		})
		.catch((error) => alert(error.message));
	}, []);

	function updateProductData(property, value): void {
		setProductData((n) => ({
			...n,
			[property]: value
		}))
	}

	async function updateProduct(event: any): void {
		event.preventDefault();

		const formData = new FormData();

		for(const prop in productData) {
			if(prop === "images") {
				const imageFiles = productData[prop];

				for(let i = 0; i < imageFiles.length; i++) {
					formData.append("images[]", imageFiles[i])
				}
			}
			else {
				formData.append(prop, productData[prop])
			}
		}

		try {
			const fetchURL: string = concatURL("/api/admin/products/update");
			const fetchOptions: any = {
				method: "POST",
				cache: "no-cache",
		    body: formData
			}

			const request = await fetch(fetchURL, fetchOptions);
			const { data } = await request.json();

			if(data) {
				alert(data.message);
			}
		}
		catch(error) {
			alert("An error occured, please retry.");
		}
	}

	return (
		<Fragment>
			<Title
				title="view product"
				subtitle="view and modify a product"
			/>
			<section className="py-10">
				<div className="container">
					{useMemo(() => {
						if(productData) {
							return (
								<form onSubmit={updateProduct} className="max-w-[700px]">
									<div className="grid gap-7 grid-cols-1 md:grid-cols-2">
										<div className="col-span-2 space-y-1">
			      					<div className="text-sm md:text-base text-gray-600 font-medium sentence">product name *</div>
			      					<input
			      						type="text"
			      						name="name"
			      						value={productData.name}
			      						className="p-2 border rounded border-gray-300 block w-full"
			      						onChange={({target: {value}}) => updateProductData("name", value)}
			      					/>
			      				</div>
										<div className="col-span-1 space-y-1">
			      					<div className="text-sm md:text-base text-gray-600 font-medium sentence">product category *</div>
			      					<select
			      						name="category"
			      						value={productData.category}
			      						className="p-2 border rounded border-gray-300 block w-full"
			      						onChange={({target: {value}}) => updateProductData("category", value)}
			      					>
			      						<option>---</option>
			      						{categories.map(({ id, name }) => (
			      							<option key={id} value={id}>{name}</option>
			      						))}
			      					</select>
			      				</div>
										<div className="col-span-1 space-y-1">
			      					<div className="text-sm md:text-base text-gray-600 font-medium sentence">product type *</div>
			      					<select
			      						name="type"
			      						value={productData.type}
			      						className="p-2 border rounded border-gray-300 block w-full"
			      						onChange={({target: {value}}) => updateProductData("type", value)}
			      					>
			      						<option>---</option>
			      						{types.map(({ id, name }) => (
			      							<option key={id} value={id}>{name}</option>
			      						))}
			      					</select>
			      				</div>
										<div className="col-span-2 space-y-1">
			      					<div className="text-sm md:text-base text-gray-600 font-medium sentence">product price (NGN) *</div>
			      					<PriceInput value={productData.price} onChange={({value}) => updateProductData("price", value)} />
			      				</div>
										<div className="col-span-2 space-y-1">
			      					<div className="text-sm md:text-base text-gray-600 font-medium sentence">payment link *</div>
			      					<input
			      						type="paymentLink"
			      						value={productData.paymentLink}
			      						className="p-2 border rounded border-gray-300 block w-full"
			      						onChange={({target: {value}}) => updateProductData("paymentLink", value)}
			      					/>
			      				</div>
										<div className="col-span-2 space-y-1">
			      					<div className="text-sm md:text-base text-gray-600 font-medium sentence">product images *</div>
			      					<div className="border border-gray-300 rounded">
			      						{productData.images.length ? (
	      									<Fragment>
	      										<div className="p-3 space-y-3">
	      											<div>
		      											<div className="text-base text-gray-600 font-bold sentence">
		      												{productData.images.length} file{productData.images.length > 1 ? "s" : ""} selected
		      											</div>
			      									</div>
		      										{Array.from(productData.images).map((file: File, index: number) => {

		      											function removeFile(fileIndex: string) {
		      												updateProductData("images", productData.images.filter((_: any, index: number) => {
		      													return index !== fileIndex;
		      												}));
		      											}

		      											return (
			      											<div key={index} className="border border-gray-300 rounded p-2">
			      												<div className="flex items-center">
			      													<div className="flex-1">
			      														<div className="text-base font-medium sentence">{file.name}</div>
			      														<div className="text-sm capitalize">
			      															{prettyBytes(file.size)}
			      														</div>
			      													</div>
			      													<div>
			      														<button onClick = {() => removeFile(index)} className="text-red-600">
			      															<span className="bi-x text-3xl"></span>
			      														</button>
			      													</div>
			      												</div>
			      											</div>
			      										)
		      										})}
			      									<div>
			      										<button onClick={() => updateProductData("images", [])} className="underline">
			      											<div className="text-base text-medium sentence">clear all</div>
			      										</button>
			      									</div>
		      									</div>
	      									</Fragment>
			      						) : (
		      								<div className="py-10 px-5">
					      						<div className="sentence text-center">
					      							click &nbsp;
					      							<label className="cursor-pointer" htmlFor="file-picker">
					      								<span className="font-bold underline">here</span>
					      								<input
					      									hidden
					      									multiple
					      									type="file"
					      									name="files"
					      									id="file-picker"
					      									accept=".jpg, .png, .jpeg"
					      									onChange={({target: {files}}) => updateProductData("images", Array.from(files))}
					      								/>
					      							</label>
					      							&nbsp; to select product images.
					      						</div>
				      						</div>
			      						)}
			      					</div>
			      				</div>
										<div className="col-span-2 space-y-1">
			      					<input
			      						type="submit"
			      						defaultValue="update product"
			      						className="py-3 px-10 font-bold cursor-pointer bg-gray-800 capitalize rounded text-white"
			      					/>
			      				</div>
									</div>
								</form>
							);
						}
						else {
							return (
								<section className="max-w-[700px] py-5 border rounded-md">
									<div className="flex items-center gap-5 flex-col">
										<img src="/images/loader.gif" />
										<div className="text-slate-600 capitalize font-medium">loading...</div>
									</div>
								</section>
							);
						}
					}, [productData])}
				</div>
			</section>
		</Fragment>
	);
}

function PriceInput({ value, onChange }) {
	const [price, setPrice] = useState(value || "");

	useEffect(() => {
		if(typeof onChange === "function") {
			onChange({ value: price });
		}
	}, [price])

	useEffect(() => {
		if(value === "") {
			setPrice(value);
		}
	}, [value])

	return (
		<input
			type="text"
			className="p-2 border rounded border-gray-300 block w-full"
			onChange={({target: {value}}) => setPrice(value.replace(/\,/g, ""))}
			value={useMemo(() => {
				if(/\.\d+/.test(price)) {
					return new Intl.NumberFormat("en-US", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					}).format(price);
				}

				return new Intl.NumberFormat().format(price);
			}, [price])}
		/>
	);
}
/*

{
		name: "",
		type: "",
		price: "",
		images: [],
		category: "",
		paymentLink: "",
	}


					
*/