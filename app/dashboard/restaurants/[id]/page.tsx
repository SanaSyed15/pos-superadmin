"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";


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
        `${process.env.NEXT_PUBLIC_API_URL}/superadmin/restaurant/${id}/status`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/superadmin/restaurant/${id}`,
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
          className="fixed top-6 right-6 px-4 py-2 rounded-lg shadow-lg z-50"
          style={{
            background: theme.surface,
            boxShadow: `0 0 18px ${theme.goldSoft}`,
            fontWeight: 500,
          }}
        >
          ✓ Changes saved
        </div>
      )}

      {/* ================= HEADER ================= */}
      <div className="mb-12">
        <div className="flex justify-between items-start">
          <div className="relative">
            <span
              className="absolute -left-4 top-2 h-10 w-1 rounded-full"
              style={{ background: theme.gold }}
            />
            <h1
              className="text-4xl font-semibold tracking-tight"
              style={{ color: theme.maroonDark }}
            >
              {data.restaurant.name}
            </h1>

            <p
              className="mt-2 text-sm flex items-center gap-2"
              style={{ color: theme.textMuted }}
            >
              <LocationIcon />
              {data.restaurant.city}, {data.restaurant.state}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <StatusPill status={data.restaurant.status} />
            <button
              onClick={() => router.push("/dashboard/restaurants")}
              className="font-medium hover:underline"
              style={{ color: theme.maroon }}
            >
              ← Back
            </button>
          </div>
        </div>

        <div
          className="mt-6 h-px"
          style={{
            background: `linear-gradient(to right, ${theme.gold}, transparent)`,
          }}
        />
      </div>

      {/* ================= CONTENT SURFACE ================= */}
      <div
        className="rounded-2xl px-12 py-10"
        style={{
          background: theme.surface,
          boxShadow: `0 0 0 1px ${theme.divider}`,
        }}
      >
        {/* TABS */}
        <div className="flex gap-10 mb-8 border-b" style={{ borderColor: theme.divider }}>
          {(["Details", "Owner", "Tax", "Operations", "Danger"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setEditing(false);
                setDraft(data);
              }}
              className="pb-4 font-medium relative"
              style={{ color: tab === t ? theme.maroon : theme.textMuted }}
            >
              {t}
              {tab === t && (
                <span
                  className="absolute bottom-0 left-0 w-full h-[2px]"
                  style={{ background: theme.gold }}
                />
              )}
            </button>
          ))}
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
              className="flex items-center gap-2 font-medium"
              style={{ color: theme.gold }}
            >
              <EditIcon /> Edit
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
          <div>
  {/* ACTIVATE / DEACTIVATE */}
  <button
    onClick={() => {
      setActionType("status");
      setShowConfirm(true);
    }}
  >
    {data.restaurant.status === "ACTIVE"
      ? "Deactivate Restaurant"
      : "Activate Restaurant"}
  </button>

  {/* DELETE BUTTON (PUT HERE 👇) */}
  <button
    onClick={() => {
      setActionType("delete");
      setShowConfirm(true);
    }}
    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg mt-4"
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

function Field({ label, value, edit, onChange, full }: any) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <label className="block text-xs mb-2" style={{ color: theme.textMuted }}>
        {label}
      </label>
      {edit ? (
        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b outline-none py-1 text-sm"
          style={{
            borderColor: theme.gold,
            color: theme.maroonDark,
          }}
        />
      ) : (
        <div style={{ color: theme.maroonDark, fontWeight: 500 }}>
          {value || "—"}
        </div>
      )}
    </div>
  );
}

function ReadOnly({ label, value }: any) {
  return (
    <div>
      <label className="block text-xs mb-2" style={{ color: theme.textMuted }}>
        {label}
      </label>
      <div style={{ color: theme.maroonDark, fontWeight: 500 }}>
        {value}
      </div>
    </div>
  );
}

function Toggle({ label, value, edit, onChange }: any) {
  return (
    <div>
      <label className="block text-xs mb-3" style={{ color: theme.textMuted }}>
        {label}
      </label>
      {edit ? (
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
      ) : (
        <div style={{ color: theme.maroonDark, fontWeight: 500 }}>
          {value ? "Enabled" : "Disabled"}
        </div>
      )}
    </div>
  );
}

function Select({ label, value, edit, options, onChange }: any) {
  return (
    <div>
      <label className="block text-xs mb-2" style={{ color: theme.textMuted }}>
        {label}
      </label>
      {edit ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b outline-none py-1 text-sm"
          style={{ borderColor: theme.gold, color: theme.maroonDark }}
        >
          {options.map((o: string) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <div style={{ color: theme.maroonDark, fontWeight: 500 }}>
          {value}
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: any) {
  return (
    <span
      className="px-4 py-1 rounded-full text-xs font-semibold"
      style={{
        background: theme.goldSoft,
        color: theme.maroonDark,
        boxShadow: `0 0 10px ${theme.goldSoft}`,
      }}
    >
      {status}
    </span>
  );
}

function SaveBar({ onSave, onCancel }: any) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl flex gap-6 shadow-lg"
      style={{
        background: theme.surface,
        boxShadow: `0 0 30px ${theme.goldSoft}`,
      }}
    >
      <button onClick={onCancel} style={{ color: theme.textMuted }}>
        Cancel
      </button>
      <button
        onClick={onSave}
        className="px-5 py-2 rounded-md text-white text-sm"
        style={{ background: theme.maroon }}
      >
        Save changes
      </button>
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
