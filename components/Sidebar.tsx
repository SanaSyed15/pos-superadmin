"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
  className="fixed top-0 left-0 h-screen flex flex-col justify-between bg-white border-r z-50"
  style={{
    width: collapsed ? "80px" : "256px",
    borderColor: "#EADFD7",
  }}
>
      {/* BRAND */}
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && (
          <h1 className="text-lg font-semibold text-[#6A1B1B]">
            RestaurantOS
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#6A1B1B] px-2 py-1 rounded-md hover:bg-[#F3ECE6] transition"
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* STATUS */}
      {!collapsed && (
        <div className="px-4 mb-6">
          <span className="text-xs bg-[#F3ECE6] text-[#6A1B1B] px-3 py-1 rounded-full font-medium">
  ● SUPER ADMIN
</span>
        </div>
      )}

      {/* NAV */}
      <nav className="flex-1 px-2 space-y-2 text-sm">

        <SidebarItem
          label="Dashboard"
          href="/dashboard"
          active={pathname === "/dashboard"}
          collapsed={collapsed}
          icon={<HomeIcon />}
        />

        <SidebarItem
          label="Restaurants"
          href="/dashboard/restaurants"
          active={pathname.startsWith("/dashboard/restaurants")}
          collapsed={collapsed}
          icon={<StoreIcon />}
        />

        <SidebarItem
          label="Owners"
          href="/dashboard/owners"
          active={pathname.startsWith("/dashboard/owners")}
          collapsed={collapsed}
          icon={<UserIcon />}
        />

        <SidebarItem
          label="Analytics"
          href="/dashboard/analytics"
          active={pathname.startsWith("/dashboard/analytics")}
          collapsed={collapsed}
          icon={<ChartIcon />}
        />

        <SidebarItem
          label="Settings"
          href="/dashboard/settings"
          active={pathname.startsWith("/dashboard/settings")}
          collapsed={collapsed}
          icon={<SettingsIcon />}
        />

      </nav>

      {/* FOOTER */}
      <div className="px-4 py-4 mt-auto">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#6A1B1B] text-white flex items-center justify-center">
              S
            </div>
            <div>
              <p className="text-sm font-semibold text-[#3B0A0D]">
  Super Admin
</p>

<p className="text-xs text-green-600 flex items-center gap-1">
  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
  Online
</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

/* ================= ITEM ================= */

function SidebarItem({
  label,
  href,
  active,
  collapsed,
  icon,
}: {
  label: string;
  href: string;
  active: boolean;
  collapsed: boolean;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
        ${active ? "bg-[#6A1B1B] text-white" : "text-gray-600 hover:bg-[#F3ECE6]"}`}
      style={{
        justifyContent: collapsed ? "center" : "flex-start",
      }}
    >
      <span
  className={`flex items-center justify-center w-5 h-5 shrink-0
    ${active ? "text-white" : "text-gray-500 group-hover:text-[#6A1B1B]"}`}
>
  {icon}
</span>

      {!collapsed && (
        <span className="text-sm font-medium">{label}</span>
      )}
    </Link>
  );
}

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <path d="M3 10l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M3 9h18" />
      <path d="M5 9l2-5h10l2 5" />
      <path d="M5 9v10h14V9" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21c1.5-4 11.5-4 13 0" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-6" />
      <path d="M22 20v-10" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 .6 1.7 1.7 0 01-2 0 1.7 1.7 0 00-1-.6 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-.6-1 1.7 1.7 0 010-2 1.7 1.7 0 00.6-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3 1.7 1.7 0 001-.6 1.7 1.7 0 012 0 1.7 1.7 0 001 .6 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8c.1.4.3.7.6 1a1.7 1.7 0 010 2c-.3.3-.5.6-.6 1z" />
    </svg>
  );
}