"use client";

import { useState } from "react";

/* ================= TYPES ================= */

type Settings = {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  commissionPercent: string;
  defaultGST: string;
  maintenanceMode: boolean;
  allowOnboarding: boolean;
};

/* ================= PAGE ================= */

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    platformName: "All-in-One Restaurant POS",
    supportEmail: "support@restaurantpos.com",
    supportPhone: "+91 98765 43210",
    commissionPercent: "5",
    defaultGST: "5",
    maintenanceMode: false,
    allowOnboarding: true,
  });

  /* ---------------- UPDATE HANDLER ---------------- */

  const update = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="px-12 py-10 space-y-10 bg-[#FBF6EE] min-h-screen">

      {/* HEADER */}
      <div className="relative">
        <div className="absolute left-0 top-1 h-10 w-[4px] bg-[#C8A951] rounded-full" />
        <div className="pl-4">
          <h1 className="text-3xl font-semibold text-[#3B0A0D]">
            Platform Settings
          </h1>
          <p className="text-sm text-[#7B1F1F] mt-1">
            Configure platform-wide controls and defaults
          </p>
        </div>
      </div>

      {/* PLATFORM */}
      <Section title="Platform Settings">
        <Input
          label="Platform Name"
          value={settings.platformName}
          onChange={(v) => update("platformName", v)}
        />
        <Input
          label="Support Email"
          value={settings.supportEmail}
          onChange={(v) => update("supportEmail", v)}
        />
        <Input
          label="Support Phone"
          value={settings.supportPhone}
          onChange={(v) => update("supportPhone", v)}
        />
      </Section>

      {/* FINANCIAL */}
      <Section title="Financial Settings">
        <Input
          label="Platform Commission (%)"
          value={settings.commissionPercent}
          onChange={(v) => update("commissionPercent", v)}
        />
        <Input
          label="Default GST (%)"
          value={settings.defaultGST}
          onChange={(v) => update("defaultGST", v)}
        />
      </Section>

      {/* SYSTEM */}
      <Section title="System Controls">
        <Toggle
          label="Maintenance Mode"
          description="Disable all restaurant and billing access temporarily"
          value={settings.maintenanceMode}
          onChange={(v) => update("maintenanceMode", v)}
        />

        <Toggle
          label="Allow Restaurant Onboarding"
          description="Enable or disable new restaurant registrations"
          value={settings.allowOnboarding}
          onChange={(v) => update("allowOnboarding", v)}
        />
      </Section>

      {/* SAVE SECTION */}
<div className="flex justify-end pt-4 border-t border-[#EADFD7]">

  <div className="flex gap-3">

    <button
      className="px-5 py-2 rounded-md text-sm font-medium border"
      style={{
        borderColor: "#C8A951",
        color: "#7B1F1F",
        background: "#FBF6EE",
      }}
    >
      Cancel
    </button>

    <button
      onClick={() => alert("Settings saved")}
      className="px-6 py-2 rounded-md text-sm font-semibold text-white transition"
      style={{
        background: "linear-gradient(135deg,#7B1F1F,#3B0A0D)",
        boxShadow: "0 4px 14px rgba(123,31,31,0.4)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      Save Settings
    </button>

  </div>
</div>
    </div>
  );
}


/* ================= SECTION ================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative bg-white rounded-2xl p-6 transition-all duration-300"
      style={{
        border: "1px solid rgba(200,169,81,0.35)",
        boxShadow: "0 10px 30px rgba(200,169,81,0.2)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C8A951] to-[#E8D9A5]" />

      <h2 className="text-sm font-semibold text-[#3B0A0D] mb-5">
        {title}
      </h2>

      <div className="space-y-5">{children}</div>
    </div>
  );
}

/* ================= INPUT ================= */

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
      <label className="block text-xs text-[#7B1F1F] mb-2 uppercase tracking-wide">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition"
        style={{
          border: "1px solid #EADFD7",
          background: "#FBF6EE",
          color: "#3B0A0D",
        }}
      />
    </div>
  );
}

/* ================= TOGGLE ================= */

function Toggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex justify-between items-center">

      <div>
        <p className="text-sm font-medium text-[#3B0A0D]">
          {label}
        </p>
        <p className="text-xs text-[#7B1F1F]">
          {description}
        </p>
      </div>

      {/* SWITCH */}
      <div
        onClick={() => onChange(!value)}
        className="w-12 h-6 flex items-center rounded-full cursor-pointer transition"
        style={{
          background: value ? "#C8A951" : "#EADFD7",
          padding: "3px",
        }}
      >
        <div
          className="w-4 h-4 bg-white rounded-full transition"
          style={{
            transform: value
              ? "translateX(20px)"
              : "translateX(0px)",
          }}
        />
      </div>
    </div>
  );
}