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
    <div
      className="rounded-3xl p-8 space-y-12"
      style={{ backgroundColor: "#FBF6EE" }}
    >
      {/* ================= HEADER ================= */}
      <div>
        <h1
          className="text-3xl font-semibold"
          style={{ color: "#3B0A0D" }}
        >
          Welcome, Super Admin
        </h1>
        <p
          className="text-sm mt-1 max-w-2xl"
          style={{ color: "#7B1F1F" }}
        >
          You’re overseeing all restaurants on the platform. Track activity,
          manage access, and ensure smooth operations from one place.
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatTile title="Total Restaurants" value={stats?.totalRestaurants} />
        <StatTile title="Active Restaurants" value={stats?.activeRestaurants} />
        <StatTile
          title="Inactive Restaurants"
          value={stats?.inactiveRestaurants}
        />
        <StatTile title="Orders Today" value={stats?.ordersToday} />
      </div>

      {/* ================= RECENT RESTAURANTS ================= */}
      <div>
        <h3
          className="text-sm font-semibold mb-4 tracking-wide"
          style={{ color: "#3B0A0D" }}
        >
          Recent Restaurants
        </h3>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #C8A951",
            boxShadow: "0 0 30px rgba(200,169,81,0.35)",
          }}
        >
          <table className="w-full text-sm">
            <thead
              style={{
                backgroundColor: "#FBF6EE",
                color: "#3B0A0D",
              }}
            >
              <tr>
                <th className="px-6 py-4 text-left font-semibold">
                  Restaurant
                </th>
                <th className="px-6 py-4 text-left font-medium">
                  Owner
                </th>
                <th className="px-6 py-4 text-left font-medium">
                  City
                </th>
                <th className="px-6 py-4 text-left font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {restaurants.map((r) => (
                <tr
                  key={r.id}
                  onClick={() =>
                    router.push(`/dashboard/restaurants/${r.id}`)
                  }
                  className="cursor-pointer transition"
                  style={{
                    borderTop: "1px solid rgba(200,169,81,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(251,246,238,0.9)";
                    e.currentTarget.style.boxShadow =
                      "inset 4px 0 0 #C8A951";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <td
                    className="px-6 py-4 font-medium"
                    style={{ color: "#3B0A0D" }}
                  >
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
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center"
                    style={{ color: "#7B1F1F" }}
                  >
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
      className="rounded-2xl px-6 py-6"
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "4px solid #C8A951",
        boxShadow: "0 0 24px rgba(200,169,81,0.45)",
      }}
    >
      <p
        className="text-xs uppercase tracking-wide mb-2"
        style={{ color: "#7B1F1F" }}
      >
        {title}
      </p>
      <p
        className="text-4xl font-semibold"
        style={{ color: "#3B0A0D" }}
      >
        {value ?? "—"}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: "ACTIVE" | "INACTIVE" }) {
  return (
    <span
      className="px-4 py-1.5 rounded-full text-xs font-semibold"
      style={{
        backgroundColor:
          status === "ACTIVE"
            ? "rgba(200,169,81,0.3)"
            : "rgba(155,43,43,0.2)",
        color: status === "ACTIVE" ? "#3B0A0D" : "#7B1F1F",
      }}
    >
      {status}
    </span>
  );
}
