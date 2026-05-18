"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function SetPasswordPage() {

  const { token } = useParams();

  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [showPassword,
    setShowPassword
  ] = useState(false);

  const [loading,
    setLoading
  ] = useState(false);

  // PASSWORD STRENGTH
  const getPasswordStrength = () => {

    let score = 0;

    if (password.length >= 8) score++;

    if (
      /[A-Z]/.test(password)
    ) score++;

    if (
      /[0-9]/.test(password)
    ) score++;

    if (
      /[^A-Za-z0-9]/.test(password)
    ) score++;

    if (score <= 1)
      return {
        text: "Weak",
        color: "bg-red-500",
      };

    if (score <= 3)
      return {
        text: "Medium",
        color: "bg-yellow-500",
      };

    return {
      text: "Strong",
      color: "bg-green-500",
    };
  };

  const strength =
    getPasswordStrength();

  const handleSetPassword =
    async () => {

    if (
      !password ||
      !confirmPassword
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    if (password.length < 8) {

      alert(
        "Password must be at least 8 characters"
      );

      return;
    }

    if (
      password !== confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    try {

      setLoading(true);

      await axios.post(
        "https://pos-backend-s380.onrender.com/api/auth/set-password",
        {
          token,
          password,
        }
      );

      alert(
        "Password set successfully.Please login to continue."
      );


    } catch (err: any) {

      alert(
        err?.response?.data?.message
        || "Invalid or expired link"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#f5efe6]
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          p-8
          rounded-3xl
          shadow-2xl
        "
      >

        {/* LOGO */}
        <div
          className="
            flex
            justify-center
            mb-4
          "
        >

          <div
            className="
              h-16
              w-16
              rounded-full
              bg-[#7B1F1F]
              flex
              items-center
              justify-center
              text-white
              text-2xl
              font-bold
              shadow-lg
            "
          >
            POS
          </div>

        </div>

        {/* HEADING */}

        <h1
          className="
            text-3xl
            font-bold
            text-center
            text-[#7B1F1F]
            mb-2
          "
        >
          Welcome to
          Restaurant POS
        </h1>

        <p
          className="
            text-center
            text-gray-500
            mb-8
          "
        >
          Set your password to
          activate your account
        </p>

        {/* PASSWORD */}

        <div className="mb-4">

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }

              placeholder="Create Password"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                pr-16
                text-gray-800
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-[#7B1F1F]
              "
            />

            <span
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }

              className="
                absolute
                right-4
                top-3.5
                cursor-pointer
                text-sm
                text-gray-500
              "
            >
              {
                showPassword
                  ? "Hide"
                  : "Show"
              }
            </span>

          </div>

          {/* STRENGTH BAR */}

          <div className="mt-3">

            <div
              className="
                h-2
                rounded-full
                bg-gray-200
                overflow-hidden
              "
            >

              <div
                className={`
                  h-full
                  ${strength.color}
                `}
                style={{
                  width:
                    strength.text ===
                    "Weak"
                      ? "33%"
                      : strength.text ===
                        "Medium"
                      ? "66%"
                      : "100%",
                }}
              />

            </div>

            <p
              className="
                text-sm
                mt-2
                text-gray-600
              "
            >
              Password Strength:
              <span
                className="
                  font-semibold
                  ml-1
                "
              >
                {strength.text}
              </span>
            </p>

          </div>

        </div>

        {/* CONFIRM PASSWORD */}

        <div className="mb-6">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }

            placeholder="Confirm Password"

            value={confirmPassword}

            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }

            className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              text-gray-800
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-[#7B1F1F]
            "
          />

        </div>

        {/* PASSWORD RULES */}

        <div
          className="
            bg-[#f8f4ef]
            p-4
            rounded-xl
            mb-6
          "
        >

          <p
            className="
              text-sm
              font-semibold
              text-[#7B1F1F]
              mb-2
            "
          >
            Strong password should contain:
          </p>

          <ul
            className="
              text-xs
              text-gray-600
              space-y-1
            "
          >
            <li>
              • Minimum 8 characters
            </li>

            <li>
              • One uppercase letter
            </li>

            <li>
              • One number
            </li>

            <li>
              • One special character
            </li>

          </ul>

        </div>

        {/* BUTTON */}

        <button
          onClick={handleSetPassword}

          disabled={loading}

          className={`
            w-full
            py-3
            rounded-xl
            text-white
            font-semibold
            transition-all
            duration-300

            ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:scale-[1.02]"
            }
          `}

          style={{
            backgroundColor:
              "#7B1F1F",

            boxShadow:
              "0 10px 25px rgba(123,31,31,0.35)",
          }}
        >

          {
            loading
              ? "Setting Password..."
              : "Set Password"
          }

        </button>

        {/* FOOTER */}

        <p
          className="
            text-xs
            text-center
            mt-6
            text-gray-500
          "
        >
          Secure onboarding powered by
          Restaurant POS
        </p>

      </div>

    </div>
  );
}