"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { requestOTP } from "@/lib/auth";

export default function Login() {
  const [error, setError] = useState<string>("");
  const [resetFormFunc, setResetFormFunc] = useState<(() => void) | null>(null);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (username: string) => {
      const data = await requestOTP(username);
      localStorage.setItem("accesstoken", data.accesstoken);
      return data;
    },
    onSuccess: () => {
      router.push("/otp");
    },
    onError: (error: any) => {
      setError(error.message);
      if (resetFormFunc) resetFormFunc(); // Reset form on error
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col sm:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full sm:w-1/2 bg-blue-900 text-white flex flex-col items-center justify-center p-6 sm:p-10 text-center">
          <h2 className="text-2xl font-bold">Welcome to</h2>
          <h1 className="text-3xl font-extrabold">
            Dashen Super App Dashboard
          </h1>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/2 p-6 sm:p-10 flex flex-col items-center">
          <Image
            src="/images/dashen-logo.png"
            alt="Dashen Bank Logo"
            width={80}
            height={40}
            className="mb-4"
            priority
          />
          <h2 className="text-gray-700 text-2xl font-bold text-center">
            Login
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Welcome to Dashen bank dashboard!
          </p>

          <Formik
            initialValues={{ username: "" }}
            onSubmit={(values, { resetForm }) => {
              if (values.username.trim().length < 3) {
                setError("Username must be at least 3 characters long.");
                resetForm();
                return;
              }
              setError("");
              setResetFormFunc(() => resetForm);
              mutation.mutate(values.username);
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form className="mt-6 w-full">
                <div className="mb-4">
                  <label className="block text-gray-700">Username</label>
                  <div className="flex border rounded-md overflow-hidden">
                    <Field
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      className="w-full px-3 py-2 text-gray-600 outline-none"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white px-4 py-3 rounded-md font-bold hover:bg-blue-800 transition"
                  disabled={!values.username || mutation.isPending}
                >
                  {mutation.isPending ? "Requesting OTP..." : "Get OTP"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
