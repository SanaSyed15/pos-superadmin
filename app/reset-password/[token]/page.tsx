"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    // ✅ VALIDATION
    if (!password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
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

      alert("Password reset successful.Please login to continue.");

      

    } catch (err: any) {
      alert(err?.response?.data?.message || "Invalid or expired token");
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

        {/* PASSWORD */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7B1F1F]"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7B1F1F]"
          />
        </div>

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