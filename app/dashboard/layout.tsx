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
  <div className="bg-[#F3ECE6]">

    {/* SIDEBAR */}
    <Sidebar />

    {/* MAIN CONTENT */}
    <div
      className="flex flex-col min-h-screen"
      style={{ marginLeft: "256px" }} 
    >

      {/* TOPBAR (keep as is) */}
      <Topbar />

      {/* MAIN SCROLL AREA */}
      <main className="flex-1 overflow-y-auto px-8 py-6">

        {/* CONTENT WRAPPER */}
        <div className="min-h-full rounded-3xl bg-[#F9F5EF] p-8 shadow-sm transition-all duration-300">

          {children}

        </div>

      </main>
    </div>
  </div>
);
}
