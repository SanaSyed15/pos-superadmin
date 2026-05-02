"use client";

import { useEffect, useState } from "react";
import { Store, Users, CheckCircle, XCircle } from "lucide-react";
import { PieChart,Trophy } from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

/* ---------------- TYPES ---------------- */

type Stats = {
  totalRestaurants: number;
  activeRestaurants: number;
  inactiveRestaurants: number;
  totalOwners: number;
};

type TopRestaurant = {
  id: string;
  name: string;
  city: string;
  orders: number;
};

const API_BASE = "https://pos-backend-s380.onrender.com/api";

/* ---------------- PAGE ---------------- */

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [topRestaurants, setTopRestaurants] = useState<TopRestaurant[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ANALYTICS ---------------- */

 useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch(
        `${API_BASE}/super-admin/analytics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setStats(data?.data?.stats || null);
      setTopRestaurants(data?.data?.topRestaurants || []);

    } catch (err: any) {
      console.error("Analytics fetch failed:", err.message);
      setStats(null);
      setTopRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  fetchAnalytics();
}, []);

  /* ---------------- STATES ---------------- */

 if (loading) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <div className="animate-pulse text-lg font-semibold text-[#3B0A0D]">
          Loading analytics…
        </div>
        <div className="mt-2 w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-[#C8A951] to-[#E8D9A5]" />
      </div>
    </div>
  );
}

if (!stats) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">

      <div className="text-4xl mb-3">📉</div>

      <h2 className="text-lg font-semibold text-[#3B0A0D]">
        Failed to load analytics
      </h2>

      <p className="text-sm text-[#7B1F1F] mt-1">
        Something went wrong while fetching data.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-5 px-5 py-2 rounded-lg text-sm font-medium text-white"
        style={{
          background: "linear-gradient(135deg,#7B1F1F,#3B0A0D)",
        }}
      >
        Retry
      </button>
    </div>
  );
}
  /* ---------------- CHART DATA ---------------- */

  const chartData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [
          stats.activeRestaurants,
          stats.inactiveRestaurants,
        ],
        backgroundColor: ["#7B1F1F", "rgba(200,169,81,0.35)"],
        borderWidth: 0,
      },
    ],
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-8">

      {/* HEADER */}
      {/* HEADER */}
<div className="relative mb-6">

  {/* GOLD ACCENT LINE */}
  <div
    className="absolute left-0 top-1 h-10 w-[4px] rounded-full"
    style={{ background: "#C8A951" }}
  />

  <div className="pl-4">

    <h1
      className="text-3xl font-semibold tracking-tight"
      style={{
        color: "#3B0A0D",
        fontFamily: "var(--font-heading)",
      }}
    >
      Analytics Dashboard
    </h1>

    <p className="text-sm mt-1 text-[#7B1F1F]">
      Platform-wide insights and performance overview
    </p>

  </div>

</div>
{/* STATS CARDS */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

  <StatCard
    title="Total Restaurants"
    value={stats.totalRestaurants}
    icon={<Store size={18} />}
    color="#C8A951"
  />

  <StatCard
    title="Active Restaurants"
    value={stats.activeRestaurants}
    icon={<CheckCircle size={18} />}
    color="#16A34A"
  />

  <StatCard
    title="Inactive Restaurants"
    value={stats.inactiveRestaurants}
    icon={<XCircle size={18} />}
    color="#DC2626"
  />

  <StatCard
    title="Total Owners"
    value={stats.totalOwners}
    icon={<Users size={18} />}
    color="#7B1F1F"
  />

</div>

      {/* CHART + TOP RESTAURANTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* STATUS CHART */}
        <div
  className="relative bg-white rounded-2xl p-6 transition-all duration-300"
  style={{
    border: "1px solid rgba(200,169,81,0.35)",
    boxShadow: "0 10px 30px rgba(200,169,81,0.2)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow =
      "0 16px 40px rgba(200,169,81,0.3)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 10px 30px rgba(200,169,81,0.2)";
  }}
>

  {/* TOP ACCENT */}
  <div
    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
    style={{ background: "linear-gradient(to right,#C8A951,#E8D9A5)" }}
  />

  {/* HEADER */}
  <div className="flex items-center justify-between mb-4">
  
  <h2 className="text-sm font-semibold text-[#3B0A0D] flex items-center gap-2">
    
    {/* ICON */}
    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#E8D9A5] text-[#3B0A0D]">
      <PieChart size={16} />
    </span>

    Restaurant Status
  </h2>

  <span className="text-xs px-2 py-1 rounded-full bg-[#F3ECE6] text-[#7B1F1F]">
    Overview
  </span>

</div>

  {/* CHART */}
  <div className="h-64 flex items-center justify-center">
     <div className="w-64 h-64">
      <Doughnut data={chartData} />
    </div>
  </div>

  {/* LEGEND */}
  <div className="flex justify-center gap-6 mt-5 text-xs font-medium">

    <div className="flex items-center gap-2 text-[#3B0A0D]">
      <span className="w-3 h-3 rounded-full bg-[#C8A951]" />
      Active
    </div>

    <div className="flex items-center gap-2 text-[#7B1F1F]">
      <span className="w-3 h-3 rounded-full bg-[#E8B4B4]" />
      Inactive
    </div>

  </div>

</div>

        {/* TOP RESTAURANTS */}
        <div
  className="relative bg-white rounded-2xl p-6 transition-all duration-300"
  style={{
    border: "1px solid rgba(200,169,81,0.35)",
    boxShadow: "0 10px 30px rgba(200,169,81,0.2)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow =
      "0 14px 36px rgba(200,169,81,0.25)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 10px 30px rgba(200,169,81,0.2)";
  }}
>

  {/* TOP ACCENT */}
  <div
    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
    style={{ background: "linear-gradient(to right,#C8A951,#E8D9A5)" }}
  />

  {/* HEADER */}
  <div className="mb-5">
    <h2 className="text-sm font-semibold text-[#3B0A0D]">
      Top Restaurants
    </h2>
    <p className="text-xs text-[#7B1F1F] mt-0.5">
      Based on highest order volume
    </p>
  </div>

  {/* TABLE */}
  <div className="overflow-hidden rounded-xl border border-[#EADFD7]">
    <table className="w-full text-sm">

      {/* HEAD */}
      <thead
        style={{
          background: "linear-gradient(180deg,#FFF8E7,#F3E6C9)",
        }}
      >
        <tr className="text-xs uppercase tracking-wide text-[#7B1F1F]">
          <th className="px-5 py-3 text-left">#</th>
          <th className="px-5 py-3 text-left">Restaurant</th>
          <th className="px-5 py-3 text-left">City</th>
          <th className="px-5 py-3 text-right">Orders</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {topRestaurants.map((r, i) => (
          <tr
            key={r.id}
            className={`transition ${
              i % 2 === 0 ? "bg-white" : "bg-[#FBF6EE]"
            } hover:bg-[#F3ECE6]`}
          >

            {/* RANK */}
            <td className="px-5 py-3 font-semibold text-[#7B1F1F]">
              {i + 1}
            </td>

            {/* NAME */}
            <td className="px-5 py-3 font-medium text-[#3B0A0D]">
              {r.name}
            </td>

            {/* CITY */}
            <td className="px-5 py-3 text-[#7B1F1F]">
              {r.city}
            </td>

            {/* ORDERS */}
            <td className="px-5 py-3 text-right">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(200,169,81,0.25)",
                  color: "#3B0A0D",
                }}
              >
                {r.orders}
              </span>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  </div>

  {/* EMPTY STATE */}
  {topRestaurants.length === 0 && (
    <div className="text-center py-10 text-[#7B1F1F] text-sm">
      No restaurant data available yet.
    </div>
  )}

</div>

      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, icon, color }: any) {
  return (
    <div
      className="rounded-2xl p-5 bg-white transition-all duration-300 cursor-pointer"
      style={{
        border: "1px solid rgba(200,169,81,0.25)",
        boxShadow: "0 10px 30px rgba(200,169,81,0.15)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 16px 40px rgba(200,169,81,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 10px 30px rgba(200,169,81,0.15)";
      }}
    >
      <div className="flex items-center justify-between">

        {/* TEXT */}
        <div>
          <p className="text-sm text-[#7B1F1F]">{title}</p>

          <h2
            className="text-2xl font-semibold mt-1"
            style={{ color: color || "#3B0A0D" }}
          >
            {value}
          </h2>
        </div>

        {/* ICON */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            background: `${color}20`,
            color: color,
          }}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}