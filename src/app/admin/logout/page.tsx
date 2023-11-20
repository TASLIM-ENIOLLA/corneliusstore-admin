import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'

import { Fragment } from "react";

import Link from "next/link";

import Logout from "@/components/Admin/Logout";

import Title from "@/components/Admin/Template/Title";

export default async function Page() {
  async function logout(formData: FormData) {
    "use server";

    console.log("Logging out...");
    
    cookies().delete('admin');
    redirect("/admin/login");
  }

  return (
    <Fragment>
      <Title
				title="logout"
				subtitle="all user data will be removed"
			/>
      <div className="py-10">
        <div className="container">
          <div className="rounded-md py-10 px-5 bg-gray-50 border">
            <form action={logout} className="text-center space-y-3">
              <div className="sentence">You&apos;ll have to login when next you come back!</div>
              <div className="relative">
                <button name="submit" type="submit">
                  <span className="inline-block rounded-md text-white py-3 px-10 bg-red-600 font-bold sentence">
                    logout
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}