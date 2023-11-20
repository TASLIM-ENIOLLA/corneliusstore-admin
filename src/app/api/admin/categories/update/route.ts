import Database from "@/libs/mysql";

export async function PATCH(request: Request) {
  const { id, name, description }: Record <string, string> = await request.json();

  const [ rows ]: any = await Database.query(
    "UPDATE `categories` SET `name` = ?, `description` = ? WHERE `id` = ?",
    [name, description, id].map((each: string) => each.toString().toLowerCase())
  );

  if(rows) {
    return Response.json({
      data: {
        message: "Category updated successfully."
      }
    });
  }

  return Response.json({
    error: {
      message: "An error occured, please retry."
    }
  });

}