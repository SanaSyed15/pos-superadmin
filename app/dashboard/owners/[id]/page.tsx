"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Mail, Phone, Calendar, Shield } from "lucide-react";
/* ---------------- TYPES ---------------- */

type Status = "Active" | "Suspended" | "Inactive";
type RestaurantStatus = "Active" | "Inactive";

type Restaurant = {
  id: number;
  name: string;
  city: string;
  status: RestaurantStatus;
};

type Owner = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: Status;
  joinedOn: string;
  restaurants: Restaurant[];
};

const API_BASE = "https://pos-backend-s380.onrender.com/api";

/* ---------------- PAGE ---------------- */

export default function OwnerDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH OWNER ---------------- */

  useEffect(() => {
  const fetchOwner = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(
        `${API_BASE}/super-admin/owners/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setOwner(data.data); // ✅ FIXED
    } catch (err: any) {
      console.error("Owner fetch failed:", err.message);
      setOwner(null);
    } finally {
      setLoading(false);
    }
  };

  fetchOwner();
}, [id, router]);

  /* ---------------- TOGGLE STATUS ---------------- */

  const toggleOwnerStatus = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const res = await fetch(
      `${API_BASE}/super-admin/owners/${id}/toggle`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    setOwner((prev) =>
      prev ? { ...prev, status: data.data?.status || prev.status } : prev
    );

  } catch (err: any) {
    console.error("Toggle status failed:", err.message);
  }
};

function OwnerDetailSkeleton() {
  return (
    <div className="px-12 py-10 animate-pulse">

      {/* HEADER */}
      <div className="mb-6">
        <div className="h-8 w-48 bg-[#EADFD7] rounded mb-2"></div>
        <div className="h-4 w-32 bg-[#F3ECE6] rounded"></div>
      </div>

      {/* CARD */}
      <div className="rounded-2xl p-6 bg-white border border-[#EADFD7]">
        
        <div className="h-5 w-40 bg-[#EADFD7] rounded mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#FBF6EE]"
            >
              <div className="w-10 h-10 bg-[#EADFD7] rounded-lg"></div>
              <div className="flex-1">
                <div className="h-3 w-24 bg-[#EADFD7] rounded mb-2"></div>
                <div className="h-4 w-32 bg-[#F3ECE6] rounded"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

  /* ---------------- STATES ---------------- */

  if (loading) {
  return <OwnerDetailSkeleton />;
}

 if (!owner) {
  return (
    <div className="px-12 py-10 flex flex-col items-center justify-center text-center">

      <div className="text-4xl mb-3">😕</div>

      <h2 className="text-lg font-semibold text-[#3B0A0D]">
        Owner not found
      </h2>

      <p className="text-sm text-[#7B1F1F] mt-1">
        The owner you're looking for doesn’t exist or was removed.
      </p>

      <button
        onClick={() => router.push("/dashboard/owners")}
        className="mt-5 px-5 py-2 rounded-lg text-sm font-medium text-white"
        style={{
          background: "linear-gradient(135deg,#7B1F1F,#3B0A0D)",
        }}
      >
        Back to Owners
      </button>
    </div>
  );
}

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-[#3B0A0D]">
            {owner.name}
          </h1>
          <p className="text-sm mt-0.5 text-[#7B1F1F]">
            Owner management
          </p>
        </div>

        <button
  onClick={() => router.push("/dashboard/owners")}
  className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all"
  style={{
    background: "linear-gradient(135deg, #7B1F1F, #3B0A0D)", // 🔥 maroon gradient
    color: "#F3DFA2", // gold text
    border: "1px solid rgba(200,169,81,0.5)",
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.boxShadow =
      "0 6px 18px rgba(0,0,0,0.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 4px 14px rgba(0,0,0,0.25)";
  }}
>
  <span style={{ fontSize: "16px" }}>←</span>
  Back 
</button>
      </div>

      {/* DIVIDER */}
      <div
        className="h-px"
        style={{
          background: "linear-gradient(to right, #C8A951, transparent)",
        }}
      />

      {/* OWNER INFO */}
      <Section title="Owner Information">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <Field
      icon={<User size={18} />}
      label="Owner Name"
      value={owner.name}
    />

    <Field
      icon={<Mail size={18} />}
      label="Email"
      value={owner.email}
    />

    <Field
      icon={<Phone size={18} />}
      label="Phone"
      value={owner.phone}
    />

    <Field
      icon={<Calendar size={18} />}
      label="Joined On"
      value={new Date(owner.joinedOn).toLocaleDateString()}
    />

    {/* STATUS */}
    <div className="flex items-center gap-4 p-4 rounded-xl border border-[#EADFD7] bg-[#FBF6EE] relative">
      <div className="absolute left-0 top-3 bottom-3 w-[4px] rounded-full bg-[#C8A951]" />

      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#E8D9A5] text-[#3B0A0D]">
        <Shield size={18} />
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-[#7B1F1F]">
          Status
        </p>

        <span
          className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background:
              owner.status === "Active"
                ? "linear-gradient(135deg,#C8A951,#E8D9A5)"
                : "linear-gradient(135deg,#F3D6D6,#E8B4B4)",
            color: "#3B0A0D",
          }}
        >
          {owner.status}
        </span>
      </div>
    </div>

  </div>
</Section>

      {/* RESTAURANTS */}
      <Section title="Linked Restaurants">
        <div className="overflow-hidden rounded-2xl border border-[#EADFD7]">
  <table className="w-full text-sm">

    <thead
      style={{
        background: "linear-gradient(180deg, #FFF8E7, #F3E6C9)",
        color: "#3B0A0D",
      }}
    >
      <tr className="text-xs uppercase tracking-wide">
        <th className="px-6 py-4 text-left">Restaurant</th>
        <th className="px-6 py-4 text-left">City</th>
        <th className="px-6 py-4 text-left">Status</th>
        <th className="px-6 py-4 text-right">Action</th>
      </tr>
    </thead>

    <tbody>
      {owner.restaurants.map((r, i) => (
        <tr
          key={r.id}
          className={`transition ${
            i % 2 === 0 ? "bg-white" : "bg-[#FBF6EE]"
          } hover:bg-[#F3ECE6]`}
        >
          <td className="px-6 py-4 font-medium text-[#3B0A0D]">
            {r.name}
          </td>

          <td className="px-6 py-4 text-[#7B1F1F]">
            {r.city}
          </td>

          <td className="px-6 py-4">
            <StatusBadge status={r.status} />
          </td>

          <td className="px-6 py-4 text-right">
            <button
              onClick={() =>
                router.push(`/dashboard/restaurants/${r.id}`)
              }
              className="px-4 py-1.5 rounded-md text-white text-xs"
              style={{
                background: "linear-gradient(135deg,#7B1F1F,#3B0A0D)",
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
      </Section>

      {/* PLATFORM ACTION */}
      <Section title="Platform Action">
        <button
          onClick={toggleOwnerStatus}
          className="px-5 py-2 rounded-md text-sm font-semibold text-white"
          style={{
            backgroundColor: owner.status === "Active" ? "#9B2B2B" : "#3B0A0D",
            border: "1px solid #C8A951",
            boxShadow: "0 0 14px rgba(155,43,43,0.45)",
          }}
        >
          {owner.status === "Active"
            ? "Suspend Owner"
            : "Activate Owner"}
        </button>
      </Section>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl px-6 py-5 border bg-white"
      style={{
        borderColor: "#C8A951",
        boxShadow: "0 0 14px rgba(200,169,81,0.35)",
      }}
    >
      <h2 className="text-sm font-semibold text-[#3B0A0D] mb-4">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}


function Field({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-[#EADFD7] bg-[#FBF6EE] relative">

      {/* GOLD LEFT BAR */}
      <div className="absolute left-0 top-3 bottom-3 w-[4px] rounded-full bg-[#C8A951]" />

      {/* ICON */}
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#E8D9A5] text-[#3B0A0D]">
        {icon}
      </div>

      {/* TEXT */}
      <div>
        <p className="text-xs uppercase tracking-wide text-[#7B1F1F]">
          {label}
        </p>
        <p className="text-sm font-semibold text-[#3B0A0D]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const isActive = status === "Active";

  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        background:
          isActive
            ? "linear-gradient(135deg,#C8A951,#E8D9A5)"
            : "linear-gradient(135deg,#F3D6D6,#E8B4B4)",
        color: "#3B0A0D",
      }}
    >
      {status.toUpperCase()}
    </span>
  );
}