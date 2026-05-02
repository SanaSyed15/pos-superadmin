"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

/* ================= TYPES ================= */

type OwnerStatus = "Active" | "Suspended";

type Owner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  restaurantsCount: number;
  status: OwnerStatus;
};

/* ================= PAGE ================= */

export default function OwnersPage() {
  const router = useRouter();

  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("ALL");
const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
  const fetchOwners = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ FIXED

      if (!token) {
        router.push("/login"); // ✅ FIXED
        return;
      }

      const res = await fetch(
        "https://pos-backend-s380.onrender.com/api/super-admin/owners", // ✅ FIXED
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setOwners(data.data || []); // ✅ FIXED

    } catch (err) {
      console.error("Failed to fetch owners", err);
      setOwners([]);
    } finally {
      setLoading(false);
    }
  };

  fetchOwners();
}, [router]);


const filteredOwners = owners.filter((o) => {
  const name = (o.name || "").toLowerCase();
  const email = (o.email || "").toLowerCase();
  const status = (o.status || "Active").toUpperCase();

  const matchSearch =
    name.includes(search.toLowerCase()) ||
    email.includes(search.toLowerCase());

  const matchStatus =
    statusFilter === "ALL"
      ? true
      : status === statusFilter;

  return matchSearch && matchStatus;
});
 if (loading) {
  return <OwnersSkeleton />;
}

  return (
    <div className="px-12 py-10">
     

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-3xl font-semibold text-[#3B0A0D]">
      Owners
    </h1>
    <p className="text-sm text-[#7B1F1F]">
      Manage and monitor restaurant owners
    </p>
  </div>

</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  <StatCard title="Total Owners" value={owners.length} />
  <StatCard
    title="Active"
    value={owners.filter(o => o.status === "Active").length}
    color="#16A34A"
  />
  <StatCard
    title="Suspended"
    value={owners.filter(o => o.status !== "Active").length}
    color="#DC2626"
  />
</div>

{/* ================= SEARCH + FILTER ================= */}

<div
  className="flex items-center gap-4 p-4 rounded-xl mb-6"
  style={{
    background: "#FBF6EE",
    border: "1px solid #EADFD7",
    boxShadow: "0 6px 18px rgba(200,169,81,0.15)",
  }}
>

  {/* SEARCH */}
  <div
    className="relative flex-1 flex items-center rounded-lg px-4 py-2 transition"
    style={{
      background: "#FFFFFF",
      border: "1px solid #EADFD7",
    }}
  >
    {/* ICON */}
    <Search size={16} style={{ color: "#9B8A7A" }} />

    <input
      type="text"
      placeholder="Search owners..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="ml-2 flex-1 outline-none text-sm"
      style={{
        color: "#3B0A0D",
        background: "transparent",
      }}
    />
  </div>

  {/* FILTER */}
  <div className="relative">
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="px-4 py-2 pr-8 rounded-lg text-sm font-medium appearance-none outline-none"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EADFD7",
        color: "#3B0A0D",
      }}
    >
      <option value="ALL">All Status</option>
      <option value="ACTIVE">Active</option>
      <option value="SUSPENDED">Suspended</option>
    </select>

    {/* CUSTOM DROPDOWN ICON */}
    <span
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
      style={{ color: "#7B1F1F", fontSize: "12px" }}
    >
      ▼
    </span>
  </div>

</div>

 {/* ================= TABLE (NO SCROLL) ================= */}
<div
  className="rounded-2xl border overflow-hidden"
  style={{
    borderColor: "#EADFD7",
    background: "#FFFFFF",
  }}
>
  <table className="w-full text-sm table-fixed">

    {/* ===== HEAD ===== */}
    <thead
      style={{
        background: "linear-gradient(180deg, #FFF8E7, #F3E6C9)",
        color: "#3B0A0D",
      }}
    >
      <tr className="border-b border-[#EADFD7]">
        <th className="px-4 py-3 text-left text-xs font-semibold uppercase w-[18%]">
          Owner
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold uppercase w-[28%]">
          Email
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold uppercase w-[16%]">
          Phone
        </th>
        <th className="px-4 py-3 text-center text-xs font-semibold uppercase w-[10%]">
          Rest.
        </th>
        <th className="px-4 py-3 text-left text-xs font-semibold uppercase w-[14%]">
          Status
        </th>
        <th className="px-4 py-3 text-right text-xs font-semibold uppercase w-[14%]">
          Action
        </th>
      </tr>
    </thead>

    {/* ===== BODY ===== */}
    <tbody>
      {filteredOwners.map((o, i) => (
        <tr
          key={o.id}
          className={`transition ${
            i % 2 === 0 ? "bg-white" : "bg-[#FBF6EE]"
          } hover:bg-[#F3ECE6]`}
        >
          {/* OWNER */}
          <td className="px-4 py-4 font-medium text-[#3B0A0D] truncate">
            {o.name}
          </td>

          {/* EMAIL (truncate 👇) */}
          <td className="px-4 py-4 text-[#7B1F1F] truncate">
            {o.email}
          </td>

          {/* PHONE */}
          <td className="px-4 py-4 text-[#7B1F1F] truncate">
            {o.phone || "—"}
          </td>

          {/* RESTAURANTS */}
          <td className="px-4 py-4 text-center text-[#7B1F1F]">
            {o.restaurantsCount}
          </td>

          {/* STATUS */}
          <td className="px-4 py-4">
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
              style={{
                background:
                  o.status === "Active"
                    ? "linear-gradient(135deg,#C8A951,#E8D9A5)"
                    : "rgba(155,43,43,0.15)",
                color:
                  o.status === "Active"
                    ? "#3B0A0D"
                    : "#7B1F1F",
              }}
            >
              {(o.status || "Active").toUpperCase()}
            </span>
          </td>

          {/* ACTION (smaller 👇) */}
          <td className="px-4 py-4 text-right">
            <button
              onClick={() =>
                router.push(`/dashboard/owners/${o.id}`)
              }
              className="px-3 py-1.5 rounded-md text-[11px] font-semibold text-white"
              style={{
                background: "#7B1F1F",
              }}
            >
              Manage
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#EADFD7] shadow-sm">
      <p className="text-sm text-[#7B1F1F]">{title}</p>
      <h2
        className="text-2xl font-semibold mt-1"
        style={{ color: color || "#3B0A0D" }}
      >
        {value}
      </h2>
    </div>
  );
}

function OwnersSkeleton() {
  return (
    <div className="px-12 py-10 animate-pulse">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-8 w-40 bg-[#EADFD7] rounded mb-2" />
          <div className="h-4 w-64 bg-[#F3ECE6] rounded" />
        </div>

        <div className="h-10 w-36 bg-[#EADFD7] rounded-xl" />
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-[#F3ECE6] border border-[#EADFD7]"
          />
        ))}
      </div>

      {/* ===== SEARCH BAR ===== */}
      <div className="flex gap-4 mb-6">
        <div className="h-12 flex-1 bg-[#F3ECE6] rounded-xl border border-[#EADFD7]" />
        <div className="h-12 w-40 bg-[#F3ECE6] rounded-xl border border-[#EADFD7]" />
      </div>

      {/* ===== TABLE ===== */}
      <div className="rounded-2xl border border-[#EADFD7] overflow-hidden">

        {/* HEADER */}
        <div className="h-12 bg-[#F3ECE6]" />

        {/* ROWS */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="grid grid-cols-6 gap-4 px-6 py-4 border-t border-[#F3ECE6]"
          >
            <div className="h-4 bg-[#EADFD7] rounded w-20" />
            <div className="h-4 bg-[#EADFD7] rounded w-32" />
            <div className="h-4 bg-[#EADFD7] rounded w-24" />
            <div className="h-4 bg-[#EADFD7] rounded w-10" />
            <div className="h-6 bg-[#EADFD7] rounded-full w-20" />
            <div className="h-6 bg-[#EADFD7] rounded w-16 ml-auto" />
          </div>
        ))}
      </div>

    </div>
  );
}
