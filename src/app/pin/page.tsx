"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { verifyPIN } from "@/lib/auth";
import Image from "next/image";

export default function PinLogin() {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

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

  const mutation = useMutation({
    mutationFn: () => {
      if (!accessToken) {
        throw new Error("Access token is missing. Please log in again.");
      }
      return verifyPIN(pin, accessToken);
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-3/4 max-w-4xl">
        <div className="w-1/2 bg-blue-900 p-10 flex flex-col justify-center text-white">
          <h2 className="text-2xl font-bold">Welcome to</h2>
          <h1 className="text-3xl font-bold mt-2">
            Dashen Super App Dashboard
          </h1>
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div className="text-center mb-6">
            <Image
              src="/images/dashen-logo.png"
              alt="Dashen Bank"
              width={80}
              height={90}
              priority
            />
            <h2 className="text-xl text-gray-700 font-bold mt-2">Login</h2>
            <p className="text-gray-500">Enter your PIN to continue.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                minLength={6}
                placeholder="Enter PIN"
                className="w-full px-4 py-3 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-4 top-3"
              >
                {showPin ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-md font-bold hover:bg-blue-800 transition"
              disabled={mutation.isPending || pin.length < 6}
            >
              {mutation.isPending ? "Verifying..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-4">
            <a href="/forgetPin" className="text-blue-700 font-semibold">
              Forgot PIN?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
