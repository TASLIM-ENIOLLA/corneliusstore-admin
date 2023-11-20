import { cookies } from "next/headers";

import Validate from "@/utils/validate";
import FileUpload from "@/utils/file-upload";

import Database from "@/libs/mysql";
import Cryptr from "@/libs/cryptr";
import Jose from "@/libs/jose";

export async function POST(request: Request) {
	const body = await request.formData();

	const name = new Validate("name", body.get("name")).min(5).name;
	const type = new Validate("type", body.get("type")).integer().type;
	const price = new Validate("price", body.get("price")).currency().price;
	const category = new Validate("category", body.get("category")).integer().category;
	const paymentLink = new Validate("paymentLink", body.get("paymentLink")).integer().paymentLink;
	
	const images = body.getAll("images[]");
	//IMPLEMENT FILE UPLOADS

	try {
		const [ rows ] = await Database.query(
			"INSERT INTO `products` SET name=?, categoryID=?, typeID=?, price=?, paymentLink=?",
			[ name, category, type, price.replace(",", ""), paymentLink ]
		);

		if(rows) {
			return Response.json({
				data: {
					message: "New product added successfully"
				}
			});
		}
	}
	catch(error) {
		return new Response("Product could not be added to database", { status: 400 });
	}
}
