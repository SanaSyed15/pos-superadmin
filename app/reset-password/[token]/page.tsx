"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password) {
      alert("Enter new password");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://pos-backend-s380.onrender.com/api/auth/reset-password",
        {
          token,
          password,
        }
      );

      alert("Password reset successful");
    } catch {
      alert("Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5efe6]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        {/* HEADING */}
        <h2 className="text-2xl font-semibold text-[#7B1F1F] mb-2 text-center">
          Reset Password
        </h2>

        <p className="text-sm text-gray-500 mb-6 text-center">
          Enter your new password
        </p>

        {/* PASSWORD INPUT */}
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#7B1F1F]"
        />

        {/* BUTTON */}
        <button
          onClick={handleReset}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-medium transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          style={{
            backgroundColor: "#7B1F1F",
            boxShadow: "0 8px 18px rgba(176,48,48,0.9)",
          }}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {/* FOOTER */}
        <p className="text-xs text-center mt-6 text-[#7B1F1F]">
          Authorized access only
        </p>
      </div>
    </div>
  );
}