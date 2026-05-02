"use client";
import axios from "axios";
import { BASE_URL, API_ENDPOINTS } from "@/lib/config";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SuperAdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  
  const handleForgotPassword = async () => {
  try {
    await axios.post(
      "https://pos-backend-s380.onrender.com/api/auth/superadmin/forgot-password",
      { email } // already in your input
    );

    alert("Reset link sent to your email");
  } catch {
    alert("Error sending email");
  }
};

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}${API_ENDPOINTS.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ FIX: correct token key
      localStorage.setItem("token", data.token);

      // ✅ keep role (optional but fine)
      localStorage.setItem("role", data.role);

      // ✅ FIX: safe redirect (prevents loop)
      setTimeout(() => {
        router.replace("/dashboard");
      }, 100);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-[#F3ECE6] px-4">
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden animate-fadeIn">

      {/* LEFT PANEL */}
      <div
        className="hidden md:flex flex-col justify-center px-12 py-10 text-white"
        style={{
          background: "linear-gradient(135deg, #6A1B1B, #3B0A0D)",
        }}
      >
        <h1 className="text-3xl font-semibold mb-3 tracking-tight">
          All-in-One Restaurant POS
        </h1>

        <div className="w-10 h-[2px] bg-[#E5D3C5] my-5 rounded" />

        <p className="text-sm text-white/90 leading-relaxed max-w-sm">
          Centralized control over billing, inventory, analytics, and
          multi-restaurant operations.
        </p>

        <p className="text-xs uppercase tracking-widest text-white/70 mt-8">
          Super Admin Access
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md animate-slideUp">

          {/* TITLE */}
          <h2
            className="text-3xl font-semibold mb-2"
            style={{ color: "#6A1B1B", fontFamily: "serif" }}
          >
            Super Admin Login
          </h2>

          <p className="text-sm text-gray-500 mb-8">
            Sign in to access the control dashboard
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2 animate-shake">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div className="mb-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-full text-sm outline-none border
                         bg-[#F8F8F8] text-[#3B0A0D]
                         transition-all duration-300
                         focus:ring-2 focus:ring-[#6A1B1B]/40 focus:border-[#6A1B1B]"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-5 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 pr-10 rounded-full text-sm outline-none border
                         bg-[#F8F8F8] text-[#3B0A0D]
                         transition-all duration-300
                         focus:ring-2 focus:ring-[#6A1B1B]/40 focus:border-[#6A1B1B]"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-[#6A1B1B] hover:scale-110 transition"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M3 3l18 18" />
                  <path d="M10.58 10.58a2 2 0 002.83 2.83" />
                  <path d="M16.24 16.24A9.77 9.77 0 0012 18c-5 0-9-6-9-6a18.4 18.4 0 014.25-4.75" />
                  <path d="M9.88 5.1A9.77 9.77 0 0112 6c5 0 9 6 9 6a18.4 18.4 0 01-3.14 4.06" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M1 12s4-6 11-6 11 6 11 6-4 6-11 6-11-6-11-6z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right mb-6">
            <span
              onClick={handleForgotPassword}
              className="text-sm text-[#6A1B1B] cursor-pointer hover:underline transition"
            >
              Forgot Password?
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 rounded-full text-white font-medium transition-all duration-300
              hover:scale-[1.02] active:scale-[0.97]
              ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-lg"
              }`}
            style={{
              backgroundColor: "#6A1B1B",
            }}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="text-xs text-center text-gray-500 mt-8">
            Authorized access only
          </p>
        </div>
      </div>
    </div>
  </div>
);
}