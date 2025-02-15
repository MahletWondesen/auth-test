"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accesstoken");
      if (!token) {
        router.push("/login");
      } else {
        setAccessToken(token);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accesstoken");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-blue-900 text-white flex flex-col items-center justify-center p-10">
          <h2 className="text-2xl font-bold">Welcome to</h2>
          <h1 className="text-3xl font-extrabold text-center">
            Dashen Super App Dashboard
          </h1>
        </div>

        <div className="w-1/2 p-10 flex flex-col items-center">
          <Image
            src="/images/dashen-logo.png"
            alt="Dashen Bank Logo"
            width={100}
            height={50}
            style={{ width: "auto", height: "auto" }}
            priority
          />
          <h2 className="text-gray-500 text-2xl font-bold mt-4">Dashboard</h2>
          <p className="text-gray-500 text-sm text-center">
            Manage your Dashen bank services from here!
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-red-700 text-white px-4 py-2 rounded-md mt-6"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
