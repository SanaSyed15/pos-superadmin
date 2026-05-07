"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

/* ================= TYPES ================= */

type Status = "ACTIVE" | "INACTIVE";

type Restaurant = {
  id: string;
  name: string;
  owner_name: string | null;
  city: string;
  status: Status;
};

type FormState = {
  restaurantName: string;
  restaurantType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
};

/* ================= PAGE ================= */

export default function RestaurantsPage() {
  const router = useRouter();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
  const t = localStorage.getItem("token"); // ✅ FIXED
  if (!t) {
    router.push("/login");
    return;
  }
  setToken(t);
}, [router]);

  const fetchRestaurants = async () => {
    if (!token) return;
    setLoading(true);
    const res = await fetch(
  "https://pos-backend-s380.onrender.com/api/super-admin/restaurants", 
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);

const data = await res.json();

setRestaurants(data.data || []); 
setLoading(false); // 

}; 
  useEffect(() => {
    fetchRestaurants();
  }, [token]);

  if (loading) {
  return (
    <div className="space-y-6 animate-pulse">

      {/* HEADER SKELETON */}
      <div className="h-8 w-48 bg-[#EADFD7] rounded-lg" />

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6">
        <div className="h-20 bg-[#EADFD7] rounded-xl" />
        <div className="h-20 bg-[#EADFD7] rounded-xl" />
        <div className="h-20 bg-[#EADFD7] rounded-xl" />
      </div>

      {/* SEARCH BAR */}
      <div className="h-12 bg-[#EADFD7] rounded-xl" />

      {/* TABLE ROWS */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-14 bg-[#EADFD7] rounded-xl"
          />
        ))}
      </div>

    </div>
  );
}

  const filteredRestaurants = restaurants.filter((r) => {
  const matchesSearch =
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.owner_name || "").toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "ALL" || r.status === statusFilter;

  return matchesSearch && matchesStatus;
});


  return (
    <>
  {/* HEADER */}
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="text-3xl font-semibold text-[#3B0A0D]">
        Restaurants
      </h1>
      <p className="text-sm text-[#7B1F1F]">
        Manage and onboard restaurants
      </p>
    </div>

    <button
      onClick={() => setShowAdd(true)}
      className="px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all duration-300"
style={{
  backgroundColor: "#D4AF37", // gold
  color: "#3B0A0D",
  boxShadow: "0 4px 14px rgba(212,175,55,0.4)",
}}
    >
      + Add Restaurant
    </button>
  </div>

  {/* STATS */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <StatCard title="Total Restaurants" value={restaurants.length} />

    <StatCard
      title="Active"
      value={restaurants.filter(r => r.status === "ACTIVE").length}
      color="green"
    />

    <StatCard
      title="Inactive"
      value={restaurants.filter(r => r.status === "INACTIVE").length}
      color="red"
    />
  </div>

  {/* SEARCH + FILTER */}

<div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#EADFD7] mb-6">

  {/* SEARCH INPUT */}
  <div className="relative flex-1">
    
    {/* ICON */}
    <Search
      size={16}
      className="absolute left-3 top-1/2 -translate-y-1/2"
      style={{ color: "#9B8A7A" }}
    />

    <input
      type="text"
      placeholder="Search by name or owner..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none
                 text-[#3B0A0D] placeholder:text-[#9B8A7A]"
      style={{
        borderColor: "#EADFD7",
        backgroundColor: "#FBF6EE",
      }}
    />
  </div>

  {/* FILTER */}
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="px-4 py-2 rounded-lg border text-[#3B0A0D] font-medium"
    style={{
      borderColor: "#EADFD7",
      backgroundColor: "#FBF6EE",
    }}
  >
    <option value="ALL">All Status</option>
    <option value="ACTIVE">Active</option>
    <option value="INACTIVE">Inactive</option>
  </select>

</div>

  {/* SUCCESS BANNER */}
  {successMessage && (
    <div className="mb-6 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
      {successMessage}
    </div>
  )}

  {/* TABLE */}
  <div className="bg-white rounded-2xl border border-[#EADFD7] overflow-hidden">
    <table className="w-full text-sm">

      <thead
  style={{
    background: "linear-gradient(180deg, #FFF8E7, #F3E6C9)",
    color: "#3B0A0D",
    borderBottom: "1px solid rgba(200,169,81,0.4)",
  }}
>
  <tr>
    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide uppercase">
      Restaurant
    </th>
    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide uppercase">
      Owner
    </th>
    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide uppercase">
      City
    </th>
    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wide uppercase">
      Status
    </th>
    <th className="px-6 py-4 text-right text-xs font-semibold tracking-wide uppercase">
      Action
    </th>
  </tr>
</thead>

      <tbody>
        {filteredRestaurants.map((r, i) => (
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
              {r.owner_name || "—"}
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
                style={{ backgroundColor: "#7B1F1F" }}
              >
                Manage
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>

  {/* MODAL */}
  {showAdd && (
    <AddRestaurantModal
      token={token!}
      onClose={() => setShowAdd(false)}
      onSuccess={() => {
        fetchRestaurants();
        setSuccessMessage("Restaurant added successfully");
        setTimeout(() => setSuccessMessage(null), 4000);
      }}
    />
  )}
</>
  );
}


/* ================= MODAL ================= */

function AddRestaurantModal({
  token,
  onClose,
  onSuccess,
}: {
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<FormState>({
    restaurantName: "",
    restaurantType: "Restaurant",
    address: "",
    city: "",
    state: "",
    pincode: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  });

  const update = (k: keyof FormState, v: string) =>
    setForm({ ...form, [k]: v });

  const submit = async () => {
    if (!form.restaurantName || !form.city || !form.ownerName) return;

    setSaving(true);
    const res = await fetch(
  "https://pos-backend-s380.onrender.com/api/super-admin/onboard-restaurant", // ✅ FIXED
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      restaurant: {
        name: form.restaurantName,
        restaurantType: form.restaurantType,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        status: "INACTIVE",
      },
      admin: {
        name: form.ownerName,
        email: form.ownerEmail,
        phone: form.ownerPhone,
        password: "Temp@123",
      },
    }),
  }
);

    const data = await res.json();

console.log("ONBOARD RESPONSE:", data);

if (res.ok) {
  onClose();
  onSuccess();
} else {
  alert(data.message || "Onboarding failed");
}

setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-2xl w-full max-w-3xl flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        <div className="px-6 py-5 border-b border-[#C8A951]">
          <h2 className="text-lg font-semibold text-[#3B0A0D]">
            Restaurant Onboarding
          </h2>
        </div>

        <div className="px-6 py-6 overflow-y-auto flex-1">
          <Section title="Restaurant Information" icon={
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C8A951"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
    </svg>
  }>
            <Input label="Restaurant Name *" value={form.restaurantName} onChange={(v) => update("restaurantName", v)} />
            <Input label="Restaurant Type" value={form.restaurantType} onChange={(v) => update("restaurantType", v)} />
            <Input label="Address" value={form.address} onChange={(v) => update("address", v)} />
            <Input label="City *" value={form.city} onChange={(v) => update("city", v)} />
          </Section>

          <Section title="Owner Information" icon={
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C8A951"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </svg>
  }>
            <Input label="Owner Name *" value={form.ownerName} onChange={(v) => update("ownerName", v)} />
            <Input label="Owner Email" value={form.ownerEmail} onChange={(v) => update("ownerEmail", v)} />
            <Input label="Owner Phone" value={form.ownerPhone} onChange={(v) => update("ownerPhone", v)} />
          </Section>
        </div>

        <div className="px-6 py-4 border-t border-[#C8A951] flex justify-end gap-4">
          <button onClick={onClose} className="text-[#7B1F1F]">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="px-6 py-2 rounded-lg text-white"
            style={{ backgroundColor: "#7B1F1F" }}
          >
            {saving ? "Saving…" : "Complete Onboarding"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="border rounded-xl p-4 mb-6"
      style={{ borderColor: "#C8A951" }}
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-sm font-semibold text-[#3B0A0D]">
          {title}
        </h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-[#3B0A0D]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2"
        style={{
          borderColor: "#C8A951",
          color: "#3B0A0D",
        }}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  color = "default",
}: {
  title: string;
  value: number;
  color?: "default" | "green" | "red";
}) {
  const colorStyle =
    color === "green"
      ? "text-green-600"
      : color === "red"
      ? "text-red-500"
      : "text-[#3B0A0D]";

  return (
    <div className="bg-white rounded-xl p-5 border border-[#EADFD7]">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className={`text-2xl font-semibold ${colorStyle}`}>
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
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
