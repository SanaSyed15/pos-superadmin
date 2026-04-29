"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { isAuthenticated } from "@/lib/auth"; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
  if (!isAuthenticated()) {
    router.replace("/login");
  }
}, [router]);

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "#FBF6EE" }}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        {/* MAIN CONTENT WRAPPER */}
        <main className="flex-1 overflow-y-auto p-8">
          <div
            className="min-h-full rounded-3xl p-8"
            style={{
              backgroundColor: "#FBF6EE",
              boxShadow: "0 0 32px rgba(200,169,81,0.15)",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
