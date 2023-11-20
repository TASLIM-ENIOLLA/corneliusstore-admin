import { cookies } from "next/headers";

import Database from "@/libs/mysql";
import Cryptr from "@/libs/cryptr";
import Jose from "@/libs/jose";

export async function POST(request: Request) {
	type RequestBodyType = { username: string, password: string};

	const cookieStore = cookies();
	
	const { username, password }: RequestBodyType = await request.json();

	const [ rows ] = await Database.query("SELECT `username`, `password`, `roleID` FROM `admin` WHERE `username`=?", [ username ]);

	if(rows.length) {
		const [ row ] = rows;
		const { password: cipherPassword, ...otherData } = row;

		const decipherPassword = Cryptr.decrypt(cipherPassword);

		if(decipherPassword === password) {
			const jwt = await Jose.sign(JSON.stringify(otherData));

			cookieStore.set({
				name: "admin",
				value: jwt,
				path: "/"
			});

			return Response.json({
				data: {
					jwt,
					message: "Login successful. Redirecting to admin dashboard..."
				}
			});
		}

		return Response.json({
			error: {
				message: "Admin account does not exist.",
			}
		});
	}

	return Response.json({
		error: {
			message: "An error occured, please retry.",
		}
	});
}