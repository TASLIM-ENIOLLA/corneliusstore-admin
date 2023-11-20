import { cookies } from "next/headers";

import Database from "@/libs/mysql";
import Cryptr from "@/libs/cryptr";
import Jose from "@/libs/jose";

export async function POST(request: Request) {
  const { id }: { id: string } = await request.json();

  if(id === "") {
    return Response.json({
      error: {
        message: "An error occured, please retry...1"
      }
    });
  }

  else {
    const [ rows ] = await Database.query("DELETE FROM `categories` WHERE `id` = ?", [id]);
  
    if(rows) {
      return Response.json({
        data: {
          message: "Category successfully deleted."
        }
      });
    }

    return Response.json({
      error: {
        message: "An error occured, please retry...2"
      }
    });
  }
}