"use client";

import { Fragment, useState, useMemo, useEffect } from "react";

import Title from "@/components/Admin/Template/Title";

import Image from "next/image";

import { redirect } from "next/navigation";

export default function Page({ params: { id } }: PagePropsType) {
  const [categoryData, setCategoryData] = useState <any> ();

  function updateCategory(event: any) {
    event.preventDefault();

    const fetchOptions: any = {
      method: "PATCH",
      body: JSON.stringify({ id, ...categoryData }),
      headers: { "Content-Type": "application/json" }
    }

    fetch("/api/admin/categories/update", fetchOptions)
    .then((response) => response.json())
    .then(({data, error}) => {
      if(data) {
        alert(data.message);
        window.location.href = "../";
      }
      else {
        alert(error.message);
      }
    })
  }

  useEffect(() => {
    fetch(`/api/admin/categories/${id}`)
    .then((response) => response.json())
    .then(({ data, error }) => {
      if(data) {
        setCategoryData(data.row);
      }
      else {
        alert(error.message);
      }
    })
  }, [])

  return (
    <Fragment>
      <Title
        title="edit category"
        subtitle="Modify and save category"
      />
      {useMemo(() => {
        if(categoryData) {
          return (
            <section className="py-10">
              <div className="container">
                <div className="max-w-[500px]">
                  <form onSubmit={updateCategory} className="space-y-7">
                    <div className="space-y-1">
                      <div className="text-sm md:text-base text-gray-600 font-semibold sentence">category name</div>
                      <input
                        value={categoryData?.name}
                        disabled={!categoryData}
                        onChange={({ target: { value } }) => setCategoryData((n: any) => ({ ...n, name: value }))}
                        className="p-2 sentence inline-block w-full rounded border bg-transparent"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm md:text-base text-gray-600 font-semibold sentence">description</div>
                      <textarea
                        rows={5}
                        value={categoryData?.description}
                        disabled={!categoryData}
                        onChange={({ target: { value } }) => setCategoryData((n: any) => ({ ...n, description: value }))}
                        className="p-2 sentence inline-block w-full rounded border bg-transparent resize-none"
                      ></textarea>
                    </div>
                    <div className="space-y-1">
                      <input type="submit" defaultValue="update category" className="cursor-pointer capitalize text-center py-3 px-7 bg-gray-800 rounded shadow text-white font-semibold" />
                    </div>
                  </form>
                </div>
              </div>
            </section>
          );
        }


        return (
          <section className="py-10">
            <div className="container">
              <div className="text-center">
                <Image
                  src="/images/loader.gif"
                  width="80"
                  height="80"
                  alt="Loader animation"
                  className="inline-block"
                />
                <div className="text-sm md:text-base text-gray-600 font-semibold sentence">loading...</div>
              </div>
            </div>
          </section>
        )
      }, [categoryData])}
    </Fragment>
  );
}

type PagePropsType = {
  params: {
    id: string,
    option: string
  }
}