"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

type DashboardStats = {
  totalRestaurants: number;
  activeRestaurants: number;
  inactiveRestaurants: number;
  ordersToday: number;
};

type Restaurant = {
  id: string;
  name: string;
  owner_name: string;
  city: string;
  status: "ACTIVE" | "INACTIVE";
};

/* ================= PAGE ================= */

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  // ✅ FIX: stop if no token
  if (!token) {
    router.replace("/login");
    return;
  }

  Promise.all([
    fetch("https://pos-backend-s380.onrender.com/api/super-admin/dashboard-stats", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

    fetch("https://pos-backend-s380.onrender.com/api/super-admin/restaurants", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),
  ]).then(([statsData, restData]) => {
    setStats(statsData?.data || null);

    setRestaurants(
      restData?.data ? restData.data.slice(0, 6) : []
    );
  });

}, [router]);

  return (
  <div className="w-full space-y-10">

    {/* HEADER */}
    <div>
      <h1 className="text-4xl font-semibold text-[#3B0A0D] mb-2">
        Welcome, Super Admin
      </h1>
      <p className="text-sm text-[#7B1F1F] max-w-2xl">
        You’re overseeing all restaurants on the platform. Track activity,
        manage access, and ensure smooth operations from one place.
      </p>
    </div>

    {/* STATS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      <StatTile title="Total Restaurants" value={stats?.totalRestaurants} />
      <StatTile title="Active Restaurants" value={stats?.activeRestaurants} />
      <StatTile title="Inactive Restaurants" value={stats?.inactiveRestaurants} />
      <StatTile title="Orders Today" value={stats?.ordersToday} />

    </div>

    {/* RECENT RESTAURANTS */}
    <div>
      <h3 className="text-base font-semibold text-[#3B0A0D] mb-4">
        Recent Restaurants
      </h3>

      <div className="bg-white rounded-2xl border border-[#EADFD7] p-4">

  <table className="w-full text-sm">

    {/* HEADER */}
    <thead
  style={{
    background: "linear-gradient(180deg, #FFF8E7, #F9F5EF)",
  }}
>
  <tr
    className="text-xs uppercase tracking-wider"
    style={{
      color: "#7B1F1F",
      borderBottom: "1px solid #EADFD7",
    }}
  >
    <th className="px-6 py-3 text-left font-semibold">
      Restaurant
    </th>
    <th className="px-6 py-3 text-left font-semibold">
      Owner
    </th>
    <th className="px-6 py-3 text-left font-semibold">
      City
    </th>
    <th className="px-6 py-3 text-left font-semibold">
      Status
    </th>
  </tr>
</thead>

    {/* BODY */}
    <tbody>
      {restaurants.map((r, index) => (
        <tr
          key={r.id}
          onClick={() => router.push(`/dashboard/restaurants/${r.id}`)}
          className={`cursor-pointer transition-all duration-200
            ${index % 2 === 0 ? "bg-[#FBF6EE]" : "bg-white"}
            hover:bg-[#F3ECE6]`}
        >
          <td className="px-6 py-4 font-medium text-[#3B0A0D]">
            {r.name}
          </td>

          <td className="px-6 py-4 text-[#7B1F1F]">
            {r.owner_name}
          </td>

          <td className="px-6 py-4 text-[#7B1F1F]">
            {r.city}
          </td>

          <td className="px-6 py-4">
            <StatusBadge status={r.status} />
          </td>
        </tr>
      ))}

      {restaurants.length === 0 && (
        <tr>
          <td colSpan={4} className="px-6 py-8 text-center text-[#7B1F1F]">
            No restaurants onboarded yet
          </td>
        </tr>
      )}
    </tbody>

  </table>
</div>
    </div>
  </div>
);
}

/* ================= COMPONENTS ================= */

function StatTile({
  title,
  value,
}: {
  title: string;
  value?: number;
}) {
  return (
    <div
      className="rounded-2xl p-6 bg-white transition-all duration-300
                 hover:shadow-lg hover:-translate-y-1"
      style={{
        borderTop: "4px solid #C8A951",
      }}
    >
      <p className="text-xs uppercase tracking-wide text-[#7B1F1F] mb-2">
        {title}
      </p>

      <p className="text-4xl font-semibold text-[#3B0A0D]">
        {value ?? "—"}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: "ACTIVE" | "INACTIVE" }) {
  const isActive = status === "ACTIVE";

  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit"
      style={{
        backgroundColor: isActive ? "#EADFD7" : "#FBE4E4",
        color: isActive ? "#3B0A0D" : "#7B1F1F",
      }}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isActive ? "bg-green-500" : "bg-red-400"
        }`}
      />
      {status}
    </span>
  );
}
