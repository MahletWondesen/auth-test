"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgetPin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!phoneNumber) {
      setError("Please enter your phone number.");
      return;
    }

    console.log("Sending OTP to", phoneNumber);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        {/* Left Section */}
        <div className="w-full sm:w-1/2 bg-blue-900 text-white flex flex-col items-center justify-center p-6 sm:p-10 text-center">
          <h2 className="text-2xl font-bold">Forgot Your PIN?</h2>
          <p className="mt-2">
            Enter your registered phone number to receive an OTP for resetting
            your PIN.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/2 p-6 sm:p-10 flex flex-col items-center">
          <h2 className="text-gray-700 text-2xl font-bold">Reset PIN</h2>
          <p className="text-gray-500 text-sm text-center mt-1">
            Enter your phone number to reset your PIN.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm text-center">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-md font-bold hover:bg-blue-800 transition mt-4"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
