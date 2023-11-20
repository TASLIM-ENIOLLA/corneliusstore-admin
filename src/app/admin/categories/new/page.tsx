"use client"

import { Fragment, useState } from "react";

import { concatURL } from "@/utils/functions";

import Title from "@/components/Admin/Template/Title";

export default function Page() {
	type FormDataType = {
		name: string,
		description: string
	}

	const [formData, setFormData] = useState <FormDataType> ({
		name: "",
		description: ""
	});

	async function onSubmit(event: any): Promise<void> {
		event.preventDefault();

		const fetchURL: string = concatURL("/api/admin/categories/new");
		const fetchOptions: any = {
			method: "POST",
	    cache: "no-cache",
	    body: JSON.stringify(formData),
	    header: {
	      "Content-Type": "application/json"
	    }
		}

		const request: any = await fetch(fetchURL, fetchOptions);
	  const { data, error }: any = await request.json();

	  if(data) {
	  	alert("New category successfully added.");
	  	
	  	setFormData({
	  		name: "",
				description: ""
	  	});
	  }
	  else {
	  	alert(error.message);
	  }
	}

	return (
		<Fragment>
			<Title
        title="New category"
        subtitle="add new product category"
      />
      <section className="py-10">
      	<div className="container">
      		<div className="max-w-[500px]">
      			<form onSubmit={onSubmit} className="space-y-7">
      				<div className="space-y-1">
      					<div className="text-sm md:text-base text-gray-600 font-semibold sentence">category name</div>
      					<input
      						type="text"
      						value={formData.name}
      						className="p-2 border rounded border-gray-300 block w-full"
      						onChange={({target: {value}}) => setFormData((n) => ({...n, name: value}))}
      					/>
      				</div>
      				<div className="space-y-1">
      					<div className="text-sm md:text-base text-gray-600 font-semibold sentence">description</div>
      					<textarea
      						rows={5}
      						value={formData.description}
      						className="p-2 border rounded border-gray-300 block w-full resize-none"
      						onChange={({target: {value}}) => setFormData((n) => ({...n, description: value}))}
      					></textarea>
      				</div>
      				<div className="">
      					<input
      						type="submit"
      						defaultValue="add category"
      						className="py-3 px-10 cursor-pointer border capitalize rounded text-white font-bold bg-gray-800"
      					/>
      				</div>
      			</form>
      		</div>
      	</div>
      </section>
		</Fragment>
	);
}