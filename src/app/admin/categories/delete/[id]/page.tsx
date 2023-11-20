"use server";

import { redirect } from "next/navigation";

import { concatURL } from "@/utils/functions";

import Title from "@/components/Admin/Template/Title";

async function deleteCategory(id: string): Promise <Record <string, any>> {
  const fetchURL: string = concatURL("/api/admin/categories/delete");
  const fetchOptions: any = {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({ id }),
    header: {
      "Content-Type": "application/json"
    }
  }

  const request = await fetch(fetchURL, fetchOptions);
  const response = await request.json();

  return response;
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const res = await deleteCategory(id);

  redirect("../");

  return (
    <>
      <Title
        title="Delete"
        subtitle="removing product category..."
      />
    </>
  );
}