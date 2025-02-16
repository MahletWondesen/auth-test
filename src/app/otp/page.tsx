"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import { verifyOTP } from "@/lib/auth";

export default function OTPVerification() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [resetFormFunc, setResetFormFunc] = useState<(() => void) | null>(null);

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
    mutationFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is missing. Please log in again.");
      }
      return verifyOTP(otp.join(""), accessToken);
    },
    onSuccess: () => {
      router.push("/pin");
    },
    onError: (error: any) => {
      setError(error.message);
      if (resetFormFunc) resetFormFunc();
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
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Enter OTP
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Please enter the 6-digit OTP sent to your phone.
          </p>

          <Formik
            initialValues={{ otp: Array(6).fill("") }}
            onSubmit={(_, { resetForm }) => {
              if (otp.some((digit) => digit === "")) {
                setError("OTP must be 6 digits.");
                resetForm();
                return;
              }
              setError("");
              setResetFormFunc(() => resetForm);
              mutation.mutate();
            }}
          >
            {({ setFieldValue }) => (
              <Form className="mt-6 w-full">
                <div className="mb-4">
                  <label className="block text-gray-700 text-center">OTP</label>
                  <div className="flex justify-center gap-2">
                    {[...Array(6)].map((_, i) => (
                      <Field
                        key={i}
                        innerRef={(el: any) => (inputRefs.current[i] = el)}
                        name={`otp[${i}]`}
                        type="text"
                        maxLength={1}
                        className="w-10 sm:w-12 h-10 sm:h-12 border text-gray-700 rounded-md text-center text-lg"
                        onChange={(e: any) => {
                          const { value } = e.target;
                          if (/^\d?$/.test(value)) {
                            setOtp((prev) => {
                              const newOtp = [...prev];
                              newOtp[i] = value;
                              return newOtp;
                            });
                            setFieldValue(`otp[${i}]`, value);
                            if (value && i < 5) {
                              inputRefs.current[i + 1]?.focus();
                            }
                          }
                        }}
                        onKeyDown={(e: any) => {
                          if (e.key === "Backspace" && !otp[i] && i > 0) {
                            inputRefs.current[i - 1]?.focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white px-4 py-3 rounded-md font-bold hover:bg-blue-800 transition mt-4"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Verifying..." : "Verify OTP"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
