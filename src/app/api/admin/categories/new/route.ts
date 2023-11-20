import { cookies } from "next/headers";

import Database from "@/libs/mysql";
import Cryptr from "@/libs/cryptr";
import Jose from "@/libs/jose";

export async function POST(request: Request) {
  const { name, description }: { name: string, description: string } = await request.json();

  if(name === "") {
    return Response.json({
      error: {
        message: "Category name cannot be empty."
      }
    });
  }

  else if(description === "") {
    return Response.json({
      error: {
        message: "Category description cannot be empty."
      }
    });
  }

  else {
    const [ rows ] = await Database.query(
      "INSERT INTO `categories` SET `name` = ?, `description` = ?",
      [name, description].map((each: string) => each.toString().toLowerCase())
    );
  
    if(rows) {
      return Response.json({
        data: {
          message: "Category successfully added."
        }
      });
    }

    return Response.json({
      error: {
        message: "An error occured, please retry..."
      }
    });
  }

}