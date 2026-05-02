"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Pencil } from "lucide-react";

import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});


/* ================= ROYAL THEME ================= */

const theme = {
  /* Backgrounds */
  pageBg: "#FBF6EE",          // Ivory / Light Cream
  surface: "#FFFFFF",        // Pure White
  overlay: "rgba(251,246,238,0.9)",

  /* Maroon / Royal Red */
  maroon: "#7B1F1F",
  maroonDark: "#3B0A0D",
  maroonDeep: "#9B2B2B",

  /* Gold */
  gold: "#C8A951",
  goldSoft: "rgba(200,169,81,0.35)",
  goldGlow: "rgba(200,169,81,0.6)",

  /* Text */
  textPrimary: "#3B0A0D",
  textMuted: "#5A3E3E",

  divider: "rgba(200,169,81,0.4)",
  danger: "#9B2B2B",
};

/* ================= CONFIG ================= */

const API_BASE = "https://pos-backend-s380.onrender.com/api"; 
type Tab = "Details" | "Owner" | "Tax" | "Operations" | "Danger";

/* ================= PAGE ================= */

export default function ManageRestaurantPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [tab, setTab] = useState<Tab>("Details");
  const [data, setData] = useState<any>(null);
  const [draft, setDraft] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const token = typeof window !== "undefined"
  ? localStorage.getItem("token")
  : null;

  

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSaved, setShowSaved] = useState(false);;
  const [actionType, setActionType] = useState<"status" | "delete" | null>(null);
  const [confirmText, setConfirmText] = useState("");
  

  /* ================= FETCH ================= */
  
  useEffect(() => {
  if (!token) return;

  fetch(`${API_BASE}/super-admin/restaurants/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ FIXED
    },
  })
    .then(res => res.json())
    .then(res => {
      setData(res.data); // ✅ FIXED
      setDraft(res.data);
    });
}, [id, token]);

  if (!data) return <div className="p-10">Loading…</div>;

  /* ================= SAVE ================= */

  const save = async (endpoint: string, payload: any) => {
    await fetch(`${API_BASE}/super-admin/restaurants/${id}/${endpoint}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // ✅ FIXED
  },
  body: JSON.stringify(payload),
});

    setData(draft);
    setEditing(false);

    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2200);
  };

  const toggleStatus = async () => {
    await save("status", {
      status: data.restaurant.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
    });
    setShowConfirm(false);
  };


  const handleConfirm = async () => {
  try {
    if (actionType === "status") {
      await axios.put(
        `${API_BASE}/super-admin/restaurants/${id}/status`,
        {
          status:
            data.restaurant.status === "ACTIVE"
              ? "INACTIVE"
              : "ACTIVE",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Status updated");
    }

    if (actionType === "delete") {
      await axios.delete(
        `${API_BASE}/super-admin/restaurants/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Restaurant deleted");
      router.push("/dashboard/restaurants");
    }

  } catch (err: any) {
    alert(err.response?.data?.message || "Action failed");
  } finally {
    setShowConfirm(false);
    setConfirmText("");
    setActionType(null);
  }
};
  /* ================= UI ================= */

  return (
    <div
      className="min-h-screen px-12 py-8 text-sm"
      style={{ background: theme.pageBg, color: theme.textPrimary }}
    >
      {/* SAVED TOAST */}
      {showSaved && (
  <div
    className="fixed top-6 right-6 px-5 py-3 rounded-xl flex items-center gap-3 z-50 transition-all"
    style={{
      background: "linear-gradient(135deg, #FFF8E7, #F3E6C9)",
      border: "1px solid rgba(200,169,81,0.5)",
      boxShadow: "0 8px 24px rgba(200,169,81,0.35)",
      backdropFilter: "blur(6px)",
    }}
  >
    {/* ICON */}
    <div
      className="w-6 h-6 flex items-center justify-center rounded-full"
      style={{
        background: "linear-gradient(135deg,#C8A951,#E8D9A5)",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3B0A0D"
        strokeWidth="3"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>

    {/* TEXT */}
    <span
      className="text-sm font-semibold"
      style={{ color: theme.maroonDark }}
    >
      Changes saved successfully
    </span>
  </div>
)}

      {/* ================= HEADER ================= */}
      <div className="mb-10 flex justify-between items-center">

  <div className="relative">

  {/* GOLD ACCENT BAR */}
  <span
    className="absolute -left-5 top-2 h-10 w-1 rounded-full"
    style={{ background: theme.gold }}
  />

  <h1
  className={`${playfair.className} text-5xl font-semibold tracking-wide`}
  style={{
    color: theme.maroonDark,
    letterSpacing: "1px",
  }}
>
  {data.restaurant.name}
</h1>

  <p
    className="mt-2 flex items-center gap-2 text-sm"
    style={{ color: theme.textMuted }}
  >
    <LocationIcon />
    {data.restaurant.city}, {data.restaurant.state}
  </p>

</div>

  <div className="flex items-center gap-4">
    <StatusPill status={data.restaurant.status} />

   <button
  onClick={() => router.push("/dashboard/restaurants")}
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

</div>
      {/* ================= CONTENT SURFACE ================= */}
      <div
  className="rounded-2xl px-12 py-10"
  style={{
    background: theme.surface,
  }}
>
        {/* TABS */}
       <div className="flex gap-6 mb-8">
  {(["Details", "Owner", "Tax", "Operations", "Danger"] as Tab[]).map((t) => {
    const active = tab === t;

    return (
      <button
        key={t}
        onClick={() => {
          setTab(t);
          setEditing(false);
          setDraft(data);
        }}
        className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
        style={{
          background: active
            ? "linear-gradient(135deg, #C8A951, #E8D9A5)" // gold gradient
            : "transparent",
          color: active ? "#3B0A0D" : theme.textMuted,
          boxShadow: active
            ? "0 4px 14px rgba(200,169,81,0.35)"
            : "none",
          border: active
            ? "1px solid rgba(200,169,81,0.5)"
            : "1px solid transparent",
        }}
        onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.05)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
}}
        
      >
        {t}
      </button>
    );
  })}
</div>

        {/* SECTION HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2
            className="text-lg font-semibold"
            style={{ color: theme.maroonDark }}
          >
            {tab}
          </h2>

          {tab !== "Danger" && !editing && (
            

<button
  onClick={() => setEditing(true)}
  className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all"
  style={{
    background: "linear-gradient(135deg, #D4AF37, #C8A951)",
    color: "#3B0A0D",
    boxShadow: "0 6px 16px rgba(200,169,81,0.35)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow =
      "0 10px 22px rgba(200,169,81,0.45)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 6px 16px rgba(200,169,81,0.35)";
  }}
>
  <Pencil size={16} />
  Edit
</button>
          )}
        </div>

        {/* ================= DETAILS ================= */}
        {tab === "Details" && (
          <div className="grid grid-cols-2 gap-x-14 gap-y-10">
            <Field label="Restaurant Type"
              value={draft.restaurant.restaurant_type}
              edit={editing}
              onChange={(v:string)=>setDraft({...draft,restaurant:{...draft.restaurant,restaurant_type:v}})} />

            <Field label="Phone"
              value={draft.restaurant.phone}
              edit={editing}
              onChange={(v:string)=>setDraft({...draft,restaurant:{...draft.restaurant,phone:v}})} />

            <Field label="Email"
              value={draft.restaurant.email}
              edit={editing}
              onChange={(v:string)=>setDraft({...draft,restaurant:{...draft.restaurant,email:v}})} />

            <Field label="Pincode"
              value={draft.restaurant.pincode}
              edit={editing}
              onChange={(v:string)=>setDraft({...draft,restaurant:{...draft.restaurant,pincode:v}})} />

            <Field label="Address" full
              value={draft.restaurant.address}
              edit={editing}
              onChange={(v:string)=>setDraft({...draft,restaurant:{...draft.restaurant,address:v}})} />
          </div>
        )}

        {/* ================= OWNER ================= */}
        {tab === "Owner" && (
          <div className="grid grid-cols-2 gap-x-14 gap-y-10">
            <Field label="Owner Name"
              value={draft.owner?.name}
              edit={editing}
              onChange={(v:string)=>setDraft({...draft,owner:{...draft.owner,name:v}})} />

            <ReadOnly label="Owner Email" value={draft.owner?.email} />

            <Field label="Phone"
              value={draft.owner?.phone}
              edit={editing}
              onChange={(v:string)=>setDraft({...draft,owner:{...draft.owner,phone:v}})} />
          </div>
        )}

        {/* ================= TAX ================= */}
        {tab === "Tax" && (
          <div className="grid grid-cols-2 gap-x-14 gap-y-10">
            <Toggle label="GST Registered"
              value={draft.tax.gst_registered}
              edit={editing}
              onChange={(v:boolean)=>setDraft({...draft,tax:{...draft.tax,gst_registered:v}})} />

            {draft.tax.gst_registered && (
              <>
                <Field label="GST Number"
                  value={draft.tax.gst_number}
                  edit={editing}
                  onChange={(v:string)=>setDraft({...draft,tax:{...draft.tax,gst_number:v}})} />

                <Field label="GST Percentage"
                  value={draft.tax.gst_percentage}
                  edit={editing}
                  onChange={(v:string)=>setDraft({...draft,tax:{...draft.tax,gst_percentage:v}})} />
              </>
            )}
          </div>
        )}

        {/* ================= OPERATIONS ================= */}
        {tab === "Operations" && (
          <div className="grid grid-cols-2 gap-x-14 gap-y-10">
            <Select label="Billing Mode"
              value={draft.settings.billing_mode}
              edit={editing}
              options={["COUNTER","TABLE","BOTH"]}
              onChange={(v:string)=>setDraft({...draft,settings:{...draft.settings,billing_mode:v}})} />

            <Toggle label="QR Ordering Enabled"
              value={draft.settings.qr_enabled}
              edit={editing}
              onChange={(v:boolean)=>setDraft({...draft,settings:{...draft.settings,qr_enabled:v}})} />
          </div>
        )}

        {/* ================= DANGER ================= */}
        {tab === "Danger" && (
          <div className="flex gap-4 mt-4">

  {/* ACTIVATE / DEACTIVATE */}
  <button
    onClick={() => {
      setActionType("status");
      setShowConfirm(true);
    }}
    className="px-6 py-2 rounded-lg text-white"
style={{
  background: "linear-gradient(135deg, #9B2B2B, #7B1F1F)",
  boxShadow: "0 4px 16px rgba(155,43,43,0.4)",
}}
  >
    {data.restaurant.status === "ACTIVE"
      ? "Deactivate Restaurant"
      : "Activate Restaurant"}
  </button>

  {/* DELETE */}
  <button
    onClick={() => {
      setActionType("delete");
      setShowConfirm(true);
    }}
    className="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition"
  >
    Delete Restaurant
  </button>

</div>
          
        )}
      </div>

      {/* SAVE BAR */}
      {editing && tab !== "Danger" && (
        <SaveBar
          onCancel={() => {
            setDraft(data);
            setEditing(false);
          }}
          onSave={() => {
            if (tab === "Details") save("details", draft.restaurant);
            if (tab === "Owner") save("owner", draft.owner);
            if (tab === "Tax") save("tax", draft.tax);
            if (tab === "Operations") save("settings", draft.settings);
          }}
        />
      )}
 {showConfirm && (
      <ConfirmModal
        onCancel={() => {
          setShowConfirm(false);
          setConfirmText("");
        }}
        onConfirm={handleConfirm}
        actionType={actionType}
        confirmText={confirmText}
        setConfirmText={setConfirmText}
      />
    )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

import {
Phone,
Mail,
MapPin,
Package,
Utensils,
FileText
} from "lucide-react";

function Field({ label, value, edit, onChange, full }: any) {

/* ICON MAPPING */
const getIcon = (label: string) => {
switch (label) {
case "Phone": return <Phone size={16} />;
case "Email": return <Mail size={16} />;
case "Address": return <MapPin size={16} />;
case "Pincode": return <Package size={16} />;
case "Restaurant Type": return <Utensils size={16} />;
default: return <FileText size={16} />;
}
};

return (
<div
className={`relative flex items-start gap-4 rounded-xl p-5 transition-all duration-200 ${
        full ? "col-span-2" : ""
      }`}
style={{
background: "linear-gradient(180deg, #FFFFFF, #FBF6EE)",
border: `1px solid ${theme.divider}`,
boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
}}
onMouseEnter={(e) => {
e.currentTarget.style.transform = "translateY(-2px)";
e.currentTarget.style.boxShadow =
"0 8px 22px rgba(0,0,0,0.08)";
e.currentTarget.style.border = `1px solid ${theme.gold}`;
}}
onMouseLeave={(e) => {
e.currentTarget.style.transform = "translateY(0)";
e.currentTarget.style.boxShadow =
"0 4px 12px rgba(0,0,0,0.05)";
e.currentTarget.style.border = `1px solid ${theme.divider}`;
}}
>
{/* GOLD ACCENT BAR */}
<div
style={{
position: "absolute",
left: 0,
top: 12,
bottom: 12,
width: "4px",
borderRadius: "10px",
background: theme.gold,
}}
/>

  {/* ICON BOX */}
  <div
    className="flex items-center justify-center rounded-lg"
    style={{
      width: "40px",
      height: "40px",
      background: theme.goldSoft,
      color: theme.maroonDark,
      flexShrink: 0,
    }}
  >
    {getIcon(label)}
  </div>

  {/* CONTENT */}
  <div className="flex-1">
    {/* LABEL */}
    <p
      className="text-[11px] uppercase tracking-wider"
      style={{ color: theme.textMuted }}
    >
      {label}
    </p>

    {/* VALUE / INPUT */}
    {edit ? (
      <input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent outline-none mt-1 text-sm font-semibold"
        style={{
          color: theme.maroonDark,
          borderBottom: `1px solid ${theme.gold}`,
          paddingBottom: "2px",
        }}
      />
    ) : (
      <p
        className="text-sm font-semibold mt-1"
        style={{ color: theme.maroonDark }}
      >
        {value || "—"}
      </p>
    )}
  </div>
</div>

);
}


function ReadOnly({ label, value, full }: any) {
const getIcon = (label: string) => {
switch (label) {
case "Owner Email": return <Mail size={16} />;
default: return <FileText size={16} />;
}
};

return (
<div
className={`relative flex items-start gap-4 rounded-xl p-5 ${
        full ? "col-span-2" : ""
      }`}
style={{
background: "linear-gradient(180deg, #FFFFFF, #FBF6EE)",
border: `1px solid ${theme.divider}`,
boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
}}
>
{/* LEFT GOLD STRIP */}
<div
style={{
position: "absolute",
left: 0,
top: 12,
bottom: 12,
width: "4px",
borderRadius: "10px",
background: theme.gold,
}}
/>

  {/* ICON */}
  <div
    className="flex items-center justify-center rounded-lg"
    style={{
      width: "40px",
      height: "40px",
      background: theme.goldSoft,
      color: theme.maroonDark,
    }}
  >
    {getIcon(label)}
  </div>

  {/* TEXT */}
  <div>
    <p
      className="text-[11px] uppercase tracking-wider"
      style={{ color: theme.textMuted }}
    >
      {label}
    </p>

    <p
      className="text-sm font-semibold mt-1"
      style={{ color: theme.maroonDark }}
    >
      {value || "—"}
    </p>
  </div>
</div>

);
}


import { Power } from "lucide-react";

function Toggle({ label, value, edit, onChange, full }: any) {
return (
<div
className={`relative flex items-center justify-between gap-4 rounded-xl p-5 transition ${
        full ? "col-span-2" : ""
      }`}
style={{
background: "linear-gradient(180deg, #FFFFFF, #FBF6EE)",
border: `1px solid ${theme.divider}`,
boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
}}
onMouseEnter={(e) => {
e.currentTarget.style.transform = "translateY(-2px)";
e.currentTarget.style.boxShadow =
"0 8px 22px rgba(0,0,0,0.08)";
e.currentTarget.style.border = `1px solid ${theme.gold}`;
}}
onMouseLeave={(e) => {
e.currentTarget.style.transform = "translateY(0)";
e.currentTarget.style.boxShadow =
"0 4px 12px rgba(0,0,0,0.05)";
e.currentTarget.style.border = `1px solid ${theme.divider}`;
}}
>
{/* LEFT SIDE (ICON + TEXT) */} <div className="flex items-center gap-4">
{/* ICON */}
<div
className="flex items-center justify-center rounded-lg"
style={{
width: "40px",
height: "40px",
background: theme.goldSoft,
color: theme.maroonDark,
}}
> <Power size={16} /> </div>

    {/* LABEL */}
    <div>
      <p
        className="text-[11px] uppercase tracking-wider"
        style={{ color: theme.textMuted }}
      >
        {label}
      </p>

      {!edit && (
        <p
          className="text-sm font-semibold mt-1"
          style={{ color: theme.maroonDark }}
        >
          {value ? "Enabled" : "Disabled"}
        </p>
      )}
    </div>
  </div>

  {/* RIGHT SIDE (SWITCH) */}
  {edit && (
    <div
      onClick={() => onChange(!value)}
      className="w-12 h-6 flex items-center rounded-full cursor-pointer transition"
      style={{
        background: value ? theme.gold : "#E5E5E5",
        padding: "3px",
      }}
    >
      <div
        className="w-4 h-4 bg-white rounded-full transition"
        style={{
          transform: value
            ? "translateX(20px)"
            : "translateX(0px)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  )}
</div>
);
}


import { Settings } from "lucide-react";

function Select({ label, value, edit, options, onChange, full }: any) {
return (
<div
className={`relative flex items-center justify-between gap-4 rounded-xl p-5 transition ${
        full ? "col-span-2" : ""
      }`}
style={{
background: "linear-gradient(180deg, #FFFFFF, #FBF6EE)",
border: `1px solid ${theme.divider}`,
boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
}}
onMouseEnter={(e) => {
e.currentTarget.style.transform = "translateY(-2px)";
e.currentTarget.style.boxShadow =
"0 8px 22px rgba(0,0,0,0.08)";
e.currentTarget.style.border = `1px solid ${theme.gold}`;
}}
onMouseLeave={(e) => {
e.currentTarget.style.transform = "translateY(0)";
e.currentTarget.style.boxShadow =
"0 4px 12px rgba(0,0,0,0.05)";
e.currentTarget.style.border = `1px solid ${theme.divider}`;
}}
>
{/* LEFT SIDE */} <div className="flex items-center gap-4">
{/* ICON */}
<div
className="flex items-center justify-center rounded-lg"
style={{
width: "40px",
height: "40px",
background: theme.goldSoft,
color: theme.maroonDark,
}}
> <Settings size={16} /> </div>

    {/* LABEL + VALUE */}
    <div>
      <p
        className="text-[11px] uppercase tracking-wider"
        style={{ color: theme.textMuted }}
      >
        {label}
      </p>

      {!edit && (
        <p
          className="text-sm font-semibold mt-1"
          style={{ color: theme.maroonDark }}
        >
          {value}
        </p>
      )}
    </div>
  </div>

  {/* RIGHT SIDE (SELECT) */}
  {edit && (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent outline-none text-sm font-medium px-2 py-1 rounded-md"
      style={{
        border: `1px solid ${theme.gold}`,
        color: theme.maroonDark,
      }}
    >
      {options.map((o: string) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  )}
</div>
);
}


import { CheckCircle, XCircle } from "lucide-react";

function StatusPill({ status }: any) {
const isActive = status === "ACTIVE";

return (
<span
className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition"
style={{
background: isActive
? "linear-gradient(135deg, #C8A951, #E8D9A5)"
: "linear-gradient(135deg, #F3D6D6, #E8B4B4)",
color: "#3B0A0D",
boxShadow: isActive
? "0 4px 14px rgba(200,169,81,0.4)"
: "0 4px 14px rgba(155,43,43,0.3)",
}}
>
{/* ICON */}
{isActive ? ( <CheckCircle size={14} />
) : ( <XCircle size={14} />
)}


  {/* TEXT */}
  {status}
</span>

);
}

import { Save, X } from "lucide-react";

function SaveBar({ onSave, onCancel }: any) {
return (
<div
className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-between gap-6 px-6 py-4 rounded-2xl backdrop-blur-md transition"
style={{
width: "min(600px, 90%)",
background: "rgba(255,255,255,0.9)",
border: `1px solid ${theme.divider}`,
boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
}}
>
{/* LEFT TEXT */}
<p
className="text-sm font-medium"
style={{ color: theme.textMuted }}
>
You have unsaved changes </p>

  {/* ACTIONS */}
  <div className="flex items-center gap-3">
    {/* CANCEL */}
    <button
      onClick={onCancel}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition"
      style={{
        color: theme.maroonDark,
        background: "#F5EFE6",
      }}
    >
      <X size={14} />
      Cancel
    </button>

    {/* SAVE */}
    <button
      onClick={onSave}
      className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition"
      style={{
        background:
          "linear-gradient(135deg, #7B1F1F, #3B0A0D)",
        boxShadow: "0 6px 18px rgba(123,31,31,0.4)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow =
          "0 10px 24px rgba(123,31,31,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 6px 18px rgba(123,31,31,0.4)";
      }}
    >
      <Save size={14} />
      Save Changes
    </button>
  </div>
</div>

);
}


function ConfirmModal({
  onCancel,
  onConfirm,
  actionType,
  confirmText,
  setConfirmText,
}: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="rounded-xl p-6 w-[360px] bg-white">

        {/* TITLE */}
        <h3 className="font-semibold mb-2">
          {actionType === "delete" ? "⚠️ Delete Restaurant" : "Confirm action"}
        </h3>

        {/* MESSAGE */}
        <p className="text-sm mb-4">
          {actionType === "delete"
            ? "This will permanently delete the restaurant. This cannot be undone."
            : "This will immediately affect restaurant access."}
        </p>

        {/* INPUT ONLY FOR DELETE */}
        {actionType === "delete" && (
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE"
            className="w-full border px-3 py-2 rounded-lg mb-4"
          />
        )}

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <button onClick={onCancel}>Cancel</button>

          <button
            onClick={onConfirm}
            disabled={actionType === "delete" && confirmText !== "DELETE"}
            className={`px-4 py-2 rounded text-white ${
              actionType === "delete"
                ? confirmText === "DELETE"
                  ? "bg-red-600"
                  : "bg-gray-400 cursor-not-allowed"
                : "bg-red-600"
            }`}
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}
/* ================= ICONS ================= */

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
