import Database from "@/libs/mysql";

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  const [ rows ]: any = await Database.query("SELECT * FROM `categories` WHERE `id` = ?", [id]);

  if(rows) {
    const [ row ]: any [] = rows;

    return Response.json({
      data: { row }
    });
  }

  return Response.json({
    error: {
      message: "An error occured, please retry."
    }
  });

}