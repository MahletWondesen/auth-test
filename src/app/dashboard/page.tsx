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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        {/* Left Section */}
        <div className="w-full sm:w-1/2 bg-blue-900 text-white flex flex-col items-center justify-center p-6 sm:p-10 text-center">
          <h2 className="text-2xl font-bold">Welcome to</h2>
          <h1 className="text-3xl font-extrabold mt-2">
            Dashen Super App Dashboard
          </h1>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/2 p-6 sm:p-10 flex flex-col items-center">
          <Image
            src="/images/dashen-logo.png"
            alt="Dashen Bank Logo"
            width={80}
            height={50}
            priority
          />
          <h2 className="text-gray-700 text-2xl font-bold mt-4">Dashboard</h2>
          <p className="text-gray-500 text-sm text-center mt-1">
            Manage your Dashen bank services from here!
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-red-700 text-white py-3 rounded-md font-bold hover:bg-red-800 transition mt-6"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
