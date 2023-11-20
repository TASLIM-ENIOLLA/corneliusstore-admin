import { cookies } from "next/headers";

import Database from "@/libs/mysql";
import Cryptr from "@/libs/cryptr";
import Jose from "@/libs/jose";

export async function GET(request: Request) {
	const [ rows ] = await Database.query(
		"SELECT `products`.*, `categories`.`name` AS 'categoryName', `types`.`name` AS 'typeName' FROM `products` LEFT JOIN `types` ON `products`.`typeID` = `types`.`id` LEFT JOIN `categories` ON `categories`.`id` = `products`.`categoryID` ORDER BY `timestamp` DESC"
	);

	return Response.json({
		data: { rows }
	});
}