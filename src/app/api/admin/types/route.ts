import { cookies } from "next/headers";

import Database from "@/libs/mysql";
import Cryptr from "@/libs/cryptr";
import Jose from "@/libs/jose";

export async function GET(request: Request) {
	const [ rows ] = await Database.query("SELECT * FROM `types` ORDER BY `timestamp` DESC");

	return Response.json({
		data: { rows }
	});
}