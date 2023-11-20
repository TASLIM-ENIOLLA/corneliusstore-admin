import { cookies } from "next/headers";

import Database from "@/libs/mysql";
import Cryptr from "@/libs/cryptr";
import Jose from "@/libs/jose";

export async function GET(request: Request, { params: { productID } }: any) {
	try {
		const [ rows ] = await Database.query("SELECT * FROM `products` WHERE `id` = ?", [productID]);

		if(rows) {
			const [ row ] = rows;

			return Response.json({
				data: {
					row: {
						...row,
						images: []
					}
				}
			})
		}
	}
	catch(error) {
		return new Response("Couldn't fetch product from database", {
			status: 400
		});
	}

	return new Response("An error occured, please retry.", {
		status: 400
	})
}