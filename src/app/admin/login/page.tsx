"use client";

import { useRouter } from 'next/navigation';

import { Fragment, useMemo, useState } from "react";

import Image from "next/image";

export default function Page() {
  type FormDataType = {
    username: string,
    password: string,
  }

  const router = useRouter();

  const [formData, setFormData] = useState <FormDataType> ({
    username: "",
    password: "",
  });

  function submitForm(event: any) {
    event.preventDefault();

    fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((res) => res.json())
    .then(({ data, error }: { data: any, error: any }) => {
      if(error) {
        return alert(error.message);
      }
      else {
        router.push('/admin');
      }
    })
    .catch((error) => console.warn(error.message));
  }

  return (
    <div className="py-10 md:py-20">
      <div className="container">
        <div className="max-w-[400px] mx-auto">
          <div className="py-10 px-5 border_ border-gray-300">
            <div className="space-y-10">
              <div className="text-center">
                <Image
                  width="70"
                  height="70"
                  src="/favicon.ico"
                  className="inline-block"
                  alt="Cornelius Store Logo"
                />
              </div>
              <form onSubmit={submitForm} className="space-y-5">
                <div className="space-y-1">
                  <span className="sentence inline-block text-gray-600 font-semibold text-sm">username</span>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={({ target: { value } }) => setFormData((n) => ({...n, username: value}))}
                    className="block w-full p-2 border border-gray-300 bg-transparent rounded font-bold font-medium" />
                </div>
                <div className="space-y-1">
                  <span className="sentence inline-block text-gray-600 font-semibold text-sm">password</span>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={({ target: { value } }) => setFormData((n) => ({...n, password: value}))}
                    className="block w-full p-2 border border-gray-300 bg-transparent rounded font-bold font-medium" />
                </div>
                <div className="pt-5">
                  <input
                    type="submit"
                    defaultValue="login"
                    className="block capitalize cursor-pointer w-full p-3 border bg-gray-600 rounded text-white font-bold shadow-lg"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}