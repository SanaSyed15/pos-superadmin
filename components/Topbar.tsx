"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const pathname = usePathname();

  const pageTitle = getPageTitle(pathname);

  const handleLogout = () => {
    localStorage.removeItem("superadmin_token");
    router.replace("/login");
  };

 return (
  <header
  className="relative flex items-center justify-between px-10 pt-6 pb-10 text-white"
  style={{
    background: "linear-gradient(135deg, #6A1B1B, #3B0A0D)",
  }}
>
  {/* LEFT */}
  <div>
    <span className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-white/10 backdrop-blur">
  
  {/* PING ANIMATION */}
  <span className="relative flex h-2.5 w-2.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
  </span>

  LIVE SYSTEM
</span>

    <h1 className="text-3xl font-semibold tracking-tight">
      {pageTitle}
    </h1>
  </div>

  {/* RIGHT */}
  <div className="flex items-center gap-4">

    {/* PROFILE */}
    <div className="w-11 h-11 rounded-full bg-[#C8A951] text-[#3B0A0D] flex items-center justify-center font-semibold shadow-md">
      S
    </div>

    {/* LOGOUT */}
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-full text-sm font-medium
                 bg-white/10 hover:bg-white/20 transition backdrop-blur"
    >
      Logout
    </button>

  </div>
</header>
);
}

/* ================= PAGE TITLE MAPPER ================= */

function getPageTitle(pathname: string) {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/dashboard/restaurants"))
    return "Restaurants";
  if (pathname.startsWith("/dashboard/owners")) return "Owners";
  if (pathname.startsWith("/dashboard/analytics"))
    return "Analytics";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";

  return "Dashboard";
}
