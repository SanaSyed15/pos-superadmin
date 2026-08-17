"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  BarChart3,
  UserCog,
  SlidersHorizontal,
  ShieldCheck,
  Globe2,
  Monitor,
  Smartphone,
  QrCode,
  ArrowUpRight,
} from "lucide-react";

/* ============================================================
   PUREDINE — Super Admin Landing
   Palette: burgundy #7a1f1f, gold #c9a45c, warm cream
   Display: Fraunces, Body: Inter, Data/mono: JetBrains Mono
   Signature element: the "ticket" panel, a POS receipt shaped
   card (perforated edges) used for the hero stat readout.
   ============================================================ */

type CoreModule = {
  title: string;
  desc: string;
  img: string;
  points: string[];
};

const CORE_MODULES: CoreModule[] = [
  {
    title: "Restaurant Configuration",
    desc: "Set up restaurant details, GST, and table layouts in minutes.",
    img: "https://images.unsplash.com/photo-1753727471014-efe38840c7c7?q=80&w=1200&auto=format&fit=crop",
    points: ["GST and tax settings", "Table layout management", "Restaurant profile setup"],
  },
  {
    title: "Menu Management",
    desc: "Build categories and manage menu items dynamically, in real time.",
    img: "https://images.unsplash.com/photo-1750943082452-c714763f73b2?q=80&w=1200&auto=format&fit=crop",
    points: ["Add or edit menu items", "Veg / non veg classification", "Real time QR sync"],
  },
  {
    title: "Order Management",
    desc: "Handle dine in, takeaway, and online orders from one queue.",
    img: "https://images.unsplash.com/photo-1753351057596-505f35c31012?q=80&w=1200&auto=format&fit=crop",
    points: ["Order lifecycle tracking", "Live order updates", "Full order history"],
  },
  {
    title: "Billing & Payments",
    desc: "Generate compliant invoices and reconcile payments automatically.",
    img: "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=1200&auto=format&fit=crop",
    points: ["GST compliant billing", "Digital invoices", "Multiple payment modes"],
  },
];

const MARQUEE = [
  "Super Admin Panel",
  "Platform Control",
  "Multi Restaurant",
  "Global Dashboard",
  "Admin Management",
  "System Analytics",
  "Security Logs",
  "Platform Settings",
];

const FEATURES = [
  { Icon: Building2, num: "01", title: "Multi Restaurant Control", body: "Manage every branch on the platform from one centralized system." },
  { Icon: BarChart3, num: "02", title: "Global Analytics", body: "Track performance and revenue across all outlets, side by side." },
  { Icon: UserCog, num: "03", title: "Admin Management", body: "Manage every admin account with granular, role based permissions." },
  { Icon: SlidersHorizontal, num: "04", title: "Platform Settings", body: "Control system wide configuration from a single source of truth." },
  { Icon: ShieldCheck, num: "05", title: "Security Logs", body: "Monitor activity and audit every action across the platform." },
  { Icon: Globe2, num: "06", title: "System Monitoring", body: "Track uptime and performance globally, around the clock." },
];

const STATS = [
  { n: "15+", l: "Restaurants" },
  { n: "8K+", l: "Orders daily" },
  { n: "200+", l: "Admins" },
  { n: "99.9%", l: "Uptime" },
];

const ECOSYSTEM = [
  {
    Icon: Monitor,
    title: "Web Dashboard",
    user: "Admins & staff",
    desc: "Control operations, analytics, staff, and reports.",
    link: "https://pojectfinalrepo.vercel.app/",
    cta: "Enter dashboard",
    live: true,
  },
  {
    Icon: QrCode,
    title: "QR Ordering",
    user: "Customers",
    desc: "Scan, browse the menu, and place an order in seconds.",
    link: "https://customerfinal1.vercel.app/",
    cta: "See it live",
    live: true,
  },
  {
    Icon: Smartphone,
    title: "Mobile App",
    user: "Staff",
    desc: "Fast billing and order handling, built for the floor.",
    live: false,
  },
];

const ROLES = [
  { role: "Super Admin", desc: "Controls the platform, manages restaurants, and monitors global analytics and system health." },
  { role: "Restaurant Owner", desc: "Manages menu, orders, staff, reports, and overall business performance." },
  { role: "Staff", desc: "Handles billing, order processing, and real time service operations." },
  { role: "Customer", desc: "Scans a QR code, browses the menu, and places an order effortlessly." },
];

const STEPS = ["Scan QR", "View Menu", "Place Order", "Kitchen", "Payment"];

const DESCRIPTIONS = [
  "The customer scans the QR code placed on their table.",
  "The menu loads instantly with real time items and pricing.",
  "The customer selects items and places their order.",
  "The kitchen receives the ticket and starts preparing it.",
  "The bill is generated and payment is completed on the spot.",
];

const STEP_IMAGES = [
  "https://images.unsplash.com/photo-1706759755964-b0aa57a58c5a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1750943082452-c714763f73b2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1726064855881-3bbb7000b29f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1745236549199-542fe7a368f4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1726137570707-528402375b7b?q=80&w=800&auto=format&fit=crop",
];

/* ---------- lightweight scroll reveal (no external component needed) --- */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function PureDineLanding() {
  const coRef = useRef<HTMLDivElement>(null);
  const ciRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const outer = useRef({ x: -200, y: -200 });
  const tgt = useRef({ x: -200, y: -200 });

  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveStep((p) => (p + 1) % STEPS.length), 2600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      tgt.current = { x: e.clientX, y: e.clientY };
      if (ciRef.current) {
        ciRef.current.style.left = `${e.clientX}px`;
        ciRef.current.style.top = `${e.clientY}px`;
      }
    };
    const tick = () => {
      outer.current.x += (tgt.current.x - outer.current.x) * 0.1;
      outer.current.y += (tgt.current.y - outer.current.y) * 0.1;
      if (coRef.current) {
        coRef.current.style.left = `${outer.current.x}px`;
        coRef.current.style.top = `${outer.current.y}px`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const mq3 = [...MARQUEE, ...MARQUEE];

  return (
    <div className="pd-root">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap");

        .pd-root {
          --ink: #2b1a10;
          --burgundy: #7a1f1f;
          --burgundy-dark: #5a1616;
          --gold: #c9a45c;
          --gold-soft: #e0c48a;
          --cream-0: #faf6ef;
          --cream-1: #f3eadf;
          --cream-2: #efe6d8;
          --muted: #6b6154;
          --line: rgba(122, 31, 31, 0.14);
          background: var(--cream-0);
          color: var(--ink);
          font-family: "Inter", sans-serif;
          position: relative;
          overflow-x: hidden;
          cursor: default;
        }
        .pd-root * { box-sizing: border-box; }
        .pd-disp { font-family: "Fraunces", serif; }
        .pd-mono { font-family: "JetBrains Mono", monospace; }

        #pd-co, #pd-ci {
          position: fixed;
          top: -200px; left: -200px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 60;
          transform: translate(-50%, -50%);
        }
        #pd-co { width: 34px; height: 34px; border: 1px solid rgba(122,31,31,0.35); }
        #pd-ci { width: 5px; height: 5px; background: var(--burgundy); }
        @media (max-width: 900px) { #pd-co, #pd-ci { display: none; } }

        /* ---------- nav ---------- */
        .pd-nav {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 48px;
          background: rgba(250, 246, 239, 0.82);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }
        .pd-word { display: flex; flex-direction: column; line-height: 1.05; }
        .pd-word-main { font-family: "Fraunces", serif; font-weight: 600; font-size: 22px; letter-spacing: 0.5px; color: var(--burgundy); }
        .pd-word-sub { font-size: 10.5px; letter-spacing: 3px; color: var(--muted); text-transform: uppercase; margin-top: 2px; }
        .pd-nav-cta {
          padding: 11px 22px; border-radius: 4px; background: var(--burgundy); color: #fff;
          font-size: 12.5px; letter-spacing: 1.2px; text-decoration: none; text-transform: uppercase;
          transition: background 0.25s ease;
        }
        .pd-nav-cta:hover { background: var(--burgundy-dark); }

        /* ---------- hero ---------- */
        .pd-hero {
          max-width: 1320px; margin: 0 auto;
          padding: 96px 48px 60px;
          display: grid; grid-template-columns: 1fr 0.92fr; gap: 70px; align-items: center;
        }
        .pd-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 22px; }
        .pd-eyebrow span { font-size: 11.5px; letter-spacing: 3px; color: var(--burgundy); text-transform: uppercase; }
        .pd-eyebrow i { width: 34px; height: 1px; background: var(--burgundy); display: block; }
        .pd-h1 {
          font-family: "Fraunces", serif; font-weight: 500; font-size: clamp(40px, 4.6vw, 64px);
          line-height: 1.06; letter-spacing: -0.5px; margin: 0 0 22px;
        }
        .pd-h1 em { font-style: italic; color: var(--burgundy); }
        .pd-hero-desc { font-size: 16.5px; line-height: 1.75; color: var(--muted); max-width: 460px; margin-bottom: 34px; }
        .pd-hero-cta-row { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; }
        .pd-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 26px; background: var(--burgundy); color: #fff; border-radius: 4px;
          font-size: 13px; letter-spacing: 1.4px; text-transform: uppercase; text-decoration: none;
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .pd-btn-primary:hover { background: var(--burgundy-dark); transform: translateY(-2px); }
        .pd-btn-primary svg { width: 15px; height: 15px; }
        .pd-hero-note { font-size: 12.5px; color: var(--muted); letter-spacing: 0.3px; }

        /* signature: stacked photo composition with a floating status chip */
        .pd-hero-visual { position: relative; padding-bottom: 40px; padding-left: 40px; }
        .pd-hero-img-main { border-radius: 10px; overflow: hidden; box-shadow: 0 30px 70px rgba(43,26,16,0.16); }
        .pd-hero-img-main img { width: 100%; height: 420px; object-fit: cover; display: block; }
        .pd-hero-img-accent { position: absolute; bottom: 0; left: 0; width: 54%; border-radius: 10px; overflow: hidden; border: 8px solid var(--cream-0); box-shadow: 0 24px 50px rgba(43,26,16,0.2); }
        .pd-hero-img-accent img { width: 100%; height: 190px; object-fit: cover; display: block; }
        .pd-hero-chip {
          position: absolute; top: 22px; right: 22px; z-index: 2;
          display: flex; align-items: center; gap: 9px;
          background: rgba(250,246,239,0.94); backdrop-filter: blur(6px);
          padding: 10px 16px; border-radius: 30px; box-shadow: 0 10px 26px rgba(43,26,16,0.15);
        }
        .pd-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #3f9142; box-shadow: 0 0 0 3px rgba(63,145,66,0.18); animation: pd-pulse 1.8s infinite; flex-shrink: 0; }
        @keyframes pd-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
        .pd-hero-chip span { font-family: "JetBrains Mono", monospace; font-size: 12px; color: var(--ink); }
        @media (max-width: 900px) { .pd-hero-visual { padding-left: 0; } .pd-hero-img-accent { width: 60%; } }

        /* ---------- marquee ---------- */
        .pd-mq { background: var(--burgundy); overflow: hidden; padding: 15px 0; }
        .pd-mq-track { display: flex; width: max-content; animation: pd-scroll 32s linear infinite; }
        @keyframes pd-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .pd-mq-item { display: flex; align-items: center; gap: 18px; padding: 0 24px; color: var(--gold-soft); font-size: 13px; letter-spacing: 2px; text-transform: uppercase; white-space: nowrap; }
        .pd-mq-item i { color: var(--gold); font-style: normal; }

        /* ---------- section shell ---------- */
        .pd-section { max-width: 1320px; margin: 0 auto; padding: 130px 48px; position: relative; }
        .pd-head { margin-bottom: 56px; max-width: 640px; }
        .pd-head-line { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .pd-head-line i { width: 60px; height: 1px; background: var(--gold); display: block; }
        .pd-head-line b { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); display: block; }
        .pd-head-eyebrow { font-size: 11.5px; letter-spacing: 3px; color: var(--burgundy); text-transform: uppercase; margin-bottom: 14px; display: block; }
        .pd-head h2 { font-family: "Fraunces", serif; font-weight: 500; font-size: clamp(32px, 3.2vw, 48px); line-height: 1.15; margin: 0 0 14px; }
        .pd-head h2 em { font-style: italic; color: var(--burgundy); }
        .pd-head p { color: var(--muted); line-height: 1.75; font-size: 15.5px; }

        /* ---------- features ---------- */
        .pd-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        .pd-feat-card { background: var(--cream-0); padding: 38px 32px; transition: background 0.25s ease; }
        .pd-feat-card:hover { background: #fff; }
        .pd-feat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 26px; }
        .pd-feat-num { font-family: "JetBrains Mono", monospace; font-size: 12px; color: var(--gold); letter-spacing: 1px; }
        .pd-feat-card svg { width: 22px; height: 22px; color: var(--burgundy); }
        .pd-feat-title { font-family: "Fraunces", serif; font-size: 19px; font-weight: 600; margin-bottom: 10px; }
        .pd-feat-body { font-size: 14px; color: var(--muted); line-height: 1.65; }
        @media (max-width: 900px) { .pd-feat-grid { grid-template-columns: 1fr; } }

        /* ---------- ecosystem ---------- */
        .pd-eco { background: linear-gradient(to bottom, var(--cream-1), var(--cream-2)); border-radius: 8px; padding: 100px 48px; }
        .pd-eco-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 46px; }
        .pd-eco-card { background: #fff; border: 1px solid var(--line); border-radius: 6px; padding: 30px 26px; position: relative; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .pd-eco-card:hover { transform: translateY(-6px); box-shadow: 0 20px 46px rgba(43,26,16,0.1); }
        .pd-eco-icon { width: 42px; height: 42px; border-radius: 6px; background: var(--cream-1); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .pd-eco-icon svg { width: 20px; height: 20px; color: var(--burgundy); }
        .pd-eco-title { font-family: "Fraunces", serif; font-size: 19px; font-weight: 600; margin-bottom: 4px; }
        .pd-eco-user { font-size: 12px; color: var(--gold); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px; }
        .pd-eco-desc { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 20px; min-height: 44px; }
        .pd-eco-link { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; letter-spacing: 1px; text-transform: uppercase; color: var(--burgundy); text-decoration: none; font-weight: 600; }
        .pd-eco-link svg { width: 14px; height: 14px; }
        .pd-eco-soon { font-size: 13px; color: #a08f7a; }
        @media (max-width: 900px) { .pd-eco-grid { grid-template-columns: 1fr; } }

        /* ---------- roles ---------- */
        .pd-role-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
        .pd-role-card { padding: 30px 26px; border-radius: 8px; background: linear-gradient(to bottom, var(--cream-1), var(--cream-2)); border: 1px solid var(--line); position: relative; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .pd-role-card:hover { transform: translateY(-6px); box-shadow: 0 20px 46px rgba(43,26,16,0.08); }
        .pd-role-mark { width: 36px; height: 2px; background: var(--gold); margin-bottom: 18px; }
        .pd-role-name { font-family: "Fraunces", serif; font-size: 19px; font-weight: 600; margin-bottom: 10px; color: var(--burgundy); }
        .pd-role-desc { font-size: 13.5px; color: var(--muted); line-height: 1.6; }
        @media (max-width: 900px) { .pd-role-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .pd-role-grid { grid-template-columns: 1fr; } }

        /* ---------- modules ---------- */
        .pd-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px; }
        .pd-tab { padding: 11px 20px; border-radius: 30px; font-size: 13px; letter-spacing: 0.6px; cursor: pointer; transition: all 0.25s ease; border: 1px solid var(--line); background: transparent; color: var(--burgundy); font-family: "Inter", sans-serif; }
        .pd-tab.active { background: var(--burgundy); color: #fff; border-color: var(--burgundy); box-shadow: 0 8px 20px rgba(122,31,31,0.25); }
        .pd-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; padding: 46px; border-radius: 12px; background: linear-gradient(to bottom, var(--cream-1), var(--cream-2)); border: 1px solid var(--line); }
        .pd-panel-title { font-family: "Fraunces", serif; font-size: 27px; font-weight: 600; color: var(--burgundy); margin-bottom: 12px; }
        .pd-panel-desc { color: var(--muted); line-height: 1.75; margin-bottom: 24px; font-size: 15px; }
        .pd-panel-label { font-size: 11.5px; letter-spacing: 2px; color: #8b6f3d; text-transform: uppercase; margin-bottom: 14px; }
        .pd-point { display: flex; gap: 14px; align-items: center; margin-bottom: 12px; }
        .pd-point-n { width: 26px; height: 26px; border-radius: 50%; background: var(--burgundy); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-family: "JetBrains Mono", monospace; flex-shrink: 0; }
        .pd-point-t { background: #fff; padding: 10px 14px; border-radius: 6px; flex: 1; font-size: 13.5px; border: 1px solid var(--line); }
        .pd-panel-img { position: relative; border-radius: 10px; overflow: hidden; box-shadow: 0 20px 50px rgba(43,26,16,0.15); }
        .pd-panel-img img { width: 100%; height: 320px; object-fit: cover; display: block; }
        .pd-panel-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(20,10,5,0.72), transparent 55%); }
        .pd-panel-tag { position: absolute; top: 16px; right: 16px; background: rgba(201,164,92,0.95); color: #2b1a10; font-size: 10.5px; letter-spacing: 2px; font-weight: 600; padding: 6px 14px; border-radius: 20px; }
        .pd-panel-name { position: absolute; bottom: 62px; left: 20px; color: #fff; font-family: "Fraunces", serif; font-size: 20px; }
        .pd-panel-cta { position: absolute; bottom: 18px; left: 20px; display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; background: linear-gradient(135deg, var(--gold), var(--gold-soft)); color: #2b1a10; border-radius: 5px; font-size: 12px; letter-spacing: 1px; font-weight: 600; text-decoration: none; }
        @media (max-width: 900px) { .pd-panel { grid-template-columns: 1fr; } }

        /* ---------- flow ---------- */
        .pd-flow-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 60px; align-items: center; }
        .pd-flow-track { position: relative; margin-bottom: 46px; }
        .pd-flow-base { position: absolute; top: 32px; left: 0; right: 0; height: 2px; background: var(--cream-2); }
        .pd-flow-active { position: absolute; top: 32px; left: 0; height: 2px; background: linear-gradient(90deg, var(--gold), var(--gold-soft)); transition: width 0.6s ease; }
        .pd-flow-steps { display: flex; justify-content: space-between; position: relative; }
        .pd-flow-step { width: 18%; text-align: center; }
        .pd-flow-circle { width: 64px; height: 64px; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-family: "JetBrains Mono", monospace; font-size: 14px; font-weight: 600; transition: all 0.4s ease; }
        .pd-flow-circle.active { background: linear-gradient(135deg, var(--gold), #b8934f); color: #2b1a10; box-shadow: 0 15px 34px rgba(201,164,92,0.42); transform: scale(1.08); }
        .pd-flow-circle.idle { background: var(--cream-2); color: #a89c8b; }
        .pd-flow-label { margin-top: 12px; font-size: 12.5px; letter-spacing: 0.6px; }
        .pd-flow-desc { padding: 26px; border-radius: 12px; background: linear-gradient(to bottom, var(--cream-1), var(--cream-2)); }
        .pd-flow-desc h4 { font-family: "Fraunces", serif; color: var(--burgundy); margin: 0 0 8px; font-size: 16px; }
        .pd-flow-desc p { color: var(--muted); line-height: 1.7; font-size: 14px; margin: 0; }
        .pd-phone { width: 250px; height: 500px; margin: auto; border-radius: 36px; background: #171310; padding: 9px; position: relative; box-shadow: 0 40px 90px rgba(43,26,16,0.28); }
        .pd-phone-screen { width: 100%; height: 100%; border-radius: 27px; overflow: hidden; position: relative; }
        .pd-phone-screen img { width: 100%; height: 100%; object-fit: cover; }
        .pd-phone-tag { position: absolute; top: -44px; left: 50%; transform: translateX(-50%); background: var(--burgundy); color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 11.5px; letter-spacing: 0.6px; white-space: nowrap; }
        @media (max-width: 900px) { .pd-flow-grid { grid-template-columns: 1fr; } }

        /* ---------- final cta ---------- */
        .pd-final { text-align: center; padding: 130px 48px; background: linear-gradient(to bottom, var(--cream-1), var(--cream-2)); }
        .pd-final h2 { font-family: "Fraunces", serif; font-weight: 500; font-size: clamp(34px, 4vw, 54px); margin: 18px 0 16px; }
        .pd-final p { max-width: 560px; margin: 0 auto 28px; color: var(--muted); line-height: 1.75; }
        .pd-final-secondary { margin-top: 16px; }
        .pd-final-secondary a { font-size: 13px; color: var(--burgundy); text-decoration: none; letter-spacing: 0.6px; font-weight: 600; }
        .pd-contact { margin: 60px auto 0; padding: 32px; border-radius: 14px; max-width: 620px; background: rgba(255,255,255,0.65); backdrop-filter: blur(10px); border: 1px solid var(--line); }
        .pd-contact h4 { font-family: "Fraunces", serif; color: var(--burgundy); margin: 0 0 10px; font-size: 19px; }
        .pd-contact p { font-size: 14px; color: var(--muted); line-height: 1.65; margin: 0 0 20px; }
        .pd-contact-row { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .pd-contact-btn { padding: 11px 20px; border-radius: 6px; font-size: 12.5px; letter-spacing: 1px; text-decoration: none; font-weight: 600; }

        /* ---------- stats + footer ---------- */
        .pd-stats { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 1320px; margin: 0 auto; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .pd-stat { text-align: center; padding: 44px 20px; border-right: 1px solid var(--line); }
        .pd-stat:last-child { border-right: none; }
        .pd-stat-n { font-family: "Fraunces", serif; font-size: 38px; color: var(--burgundy); }
        .pd-stat-l { font-size: 12.5px; letter-spacing: 1.4px; text-transform: uppercase; color: var(--muted); margin-top: 6px; }
        @media (max-width: 700px) { .pd-stats { grid-template-columns: repeat(2, 1fr); } .pd-stat:nth-child(2) { border-right: none; } }

        .pd-footer { display: flex; justify-content: space-between; align-items: center; padding: 30px 48px; max-width: 1320px; margin: 0 auto; }
        .pd-footer span { font-size: 12.5px; color: var(--muted); letter-spacing: 0.4px; }

        @media (max-width: 900px) {
          .pd-hero { grid-template-columns: 1fr; padding-top: 60px; }
          .pd-eco-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div id="pd-co" ref={coRef} />
      <div id="pd-ci" ref={ciRef} />

      {/* NAV */}
      <nav className="pd-nav">
        <div className="pd-word">
          <span className="pd-word-main">PUREDINE</span>
          <span className="pd-word-sub">Super Admin Portal</span>
        </div>
        <a href="/login" className="pd-nav-cta">Access Dashboard</a>
      </nav>

      {/* HERO */}
      <section className="pd-hero">
        <div>
          <div className="pd-eyebrow"><i /><span>Super Admin Console</span></div>
          <h1 className="pd-h1">
            Run every restaurant<br />from <em>one table</em>.
          </h1>
          <p className="pd-hero-desc">
            PUREDINE gives you real time command over menus, orders, billing, and every
            branch on the platform, from a single, centralized dashboard.
          </p>
          <div className="pd-hero-cta-row">
            <a href="/login" className="pd-btn-primary">
              Access Dashboard <ArrowUpRight />
            </a>
            <span className="pd-hero-note">Restricted to verified super admins</span>
          </div>
        </div>

        <div className="pd-hero-visual">
          <div className="pd-hero-chip">
            <span className="pd-live-dot" />
            <span>All systems operational</span>
          </div>
          <div className="pd-hero-img-main">
            <img
              src="https://images.unsplash.com/photo-1753727471014-efe38840c7c7?q=80&w=1200&auto=format&fit=crop"
              alt="Restaurant dining room"
            />
          </div>
          <div className="pd-hero-img-accent">
            <img
              src="https://images.unsplash.com/photo-1745236549199-542fe7a368f4?q=80&w=800&auto=format&fit=crop"
              alt="Kitchen in service"
            />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="pd-mq">
        <div className="pd-mq-track">
          {mq3.map((t, i) => (
            <div key={i} className="pd-mq-item">{t}<i>✦</i></div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <Reveal>
        <section className="pd-section" style={{ paddingBottom: 0 }}>
          <div className="pd-head">
            <span className="pd-head-eyebrow">Platform Capabilities</span>
            <h2>Everything a super admin <em>needs</em>, nothing they don't.</h2>
          </div>
          <div className="pd-feat-grid">
            {FEATURES.map((f) => (
              <div key={f.num} className="pd-feat-card">
                <div className="pd-feat-top">
                  <span className="pd-feat-num">{f.num}</span>
                  <f.Icon />
                </div>
                <div className="pd-feat-title">{f.title}</div>
                <div className="pd-feat-body">{f.body}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ECOSYSTEM */}
      <Reveal>
        <section className="pd-section">
          <div className="pd-eco">
            <div className="pd-head" style={{ marginBottom: 0 }}>
              <span className="pd-head-eyebrow">Product Ecosystem</span>
              <h2>One platform, <em>three</em> connected systems.</h2>
              <p>PUREDINE connects your entire restaurant workflow, from customer ordering to
              admin analytics, through a single, unified system.</p>
            </div>
            <div className="pd-eco-grid">
              {ECOSYSTEM.map((item) => (
                <div key={item.title} className="pd-eco-card">
                  <div className="pd-eco-icon"><item.Icon /></div>
                  <div className="pd-eco-title">{item.title}</div>
                  <div className="pd-eco-user">{item.user}</div>
                  <div className="pd-eco-desc">{item.desc}</div>
                  {item.live ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="pd-eco-link">
                      {item.cta} <ArrowUpRight />
                    </a>
                  ) : (
                    <span className="pd-eco-soon">Coming soon</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ROLES */}
      <Reveal>
        <section className="pd-section">
          <div className="pd-head">
            <span className="pd-head-eyebrow">User Roles</span>
            <h2>Built for every <em>role</em> at the table.</h2>
            <p>Designed for seamless collaboration between administrators, staff, and
            customers, all inside one ecosystem.</p>
          </div>
          <div className="pd-role-grid">
            {ROLES.map((r) => (
              <div key={r.role} className="pd-role-card">
                <div className="pd-role-mark" />
                <div className="pd-role-name">{r.role}</div>
                <div className="pd-role-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* CORE MODULES */}
      <Reveal>
        <section className="pd-section">
          <div className="pd-head">
            <span className="pd-head-eyebrow">Core Modules</span>
            <h2>Core system <em>modules</em>.</h2>
          </div>
          <div className="pd-tabs">
            {CORE_MODULES.map((m, i) => (
              <button
                key={m.title}
                className={`pd-tab ${activeTab === i ? "active" : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {m.title}
              </button>
            ))}
          </div>
          <div className="pd-panel" key={activeTab}>
            <div>
              <div className="pd-panel-title">{CORE_MODULES[activeTab].title}</div>
              <p className="pd-panel-desc">{CORE_MODULES[activeTab].desc}</p>
              <div className="pd-panel-label">Key Features</div>
              {CORE_MODULES[activeTab].points.map((p, idx) => (
                <div key={idx} className="pd-point">
                  <div className="pd-point-n">{idx + 1}</div>
                  <div className="pd-point-t">{p}</div>
                </div>
              ))}
            </div>
            <div className="pd-panel-img">
              <img src={CORE_MODULES[activeTab].img} alt={CORE_MODULES[activeTab].title} />
              <div className="pd-panel-overlay" />
              <div className="pd-panel-tag">MODULE PREVIEW</div>
              <div className="pd-panel-name">{CORE_MODULES[activeTab].title}</div>
              <a className="pd-panel-cta" href="https://pojectfinalrepo.vercel.app/admin/login" target="_blank" rel="noopener noreferrer">
                View Live
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FLOW */}
      <Reveal>
        <section className="pd-section">
          <div className="pd-head">
            <span className="pd-head-eyebrow">System Flow</span>
            <h2>How <em>PUREDINE</em> works.</h2>
            <p>A seamless ordering journey from QR scan to payment, built for speed,
            simplicity, and efficiency.</p>
          </div>
          <div className="pd-flow-grid">
            <div>
              <div className="pd-flow-track">
                <div className="pd-flow-base" />
                <div className="pd-flow-active" style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }} />
                <div className="pd-flow-steps">
                  {STEPS.map((step, i) => (
                    <div key={step} className="pd-flow-step">
                      <div className={`pd-flow-circle ${i <= activeStep ? "active" : "idle"}`}>0{i + 1}</div>
                      <div className="pd-flow-label" style={{ color: i <= activeStep ? "var(--ink)" : "#aaa" }}>{step}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pd-flow-desc">
                <h4>Step {activeStep + 1}</h4>
                <p>{DESCRIPTIONS[activeStep]}</p>
              </div>
            </div>
            <div className="pd-phone">
              <div className="pd-phone-tag">{STEPS[activeStep]}</div>
              <div className="pd-phone-screen">
                <img key={activeStep} src={STEP_IMAGES[activeStep]} alt={STEPS[activeStep]} />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FINAL CTA */}
      <Reveal>
        <section className="pd-final">
          <div className="pd-eyebrow" style={{ justifyContent: "center" }}><i /><span>Get Started</span></div>
          <h2>Take full control of your <em>restaurant ecosystem</em>.</h2>
          <p>From QR ordering to real time analytics, manage every part of your restaurant
          seamlessly, all in one powerful platform.</p>
          <a href="/login" className="pd-btn-primary" style={{ background: "linear-gradient(135deg, var(--gold), #b8934f)", color: "#2b1a10" }}>
            Launch Dashboard <ArrowUpRight />
          </a>
          <div className="pd-final-secondary">
            <a href="https://pojectfinalrepo.vercel.app/" target="_blank" rel="noopener noreferrer">View Live Demo →</a>
          </div>

          <div className="pd-contact">
            <h4>Own a restaurant?</h4>
            <p>Transform your operations with PUREDINE. Get QR ordering, billing,
            analytics, and complete management, all in one system.</p>
            <div className="pd-contact-row">
              <a href="mailto:support@puredine.com" className="pd-contact-btn" style={{ background: "var(--burgundy)", color: "#fff" }}>
                Contact Us
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="pd-contact-btn" style={{ background: "#25D366", color: "#fff" }}>
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* STATS */}
      <div className="pd-stats">
        {STATS.map((s) => (
          <div key={s.l} className="pd-stat">
            <div className="pd-stat-n">{s.n}</div>
            <div className="pd-stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="pd-footer">
        <span>© {new Date().getFullYear()} PUREDINE</span>
        <span>Super Admin Portal</span>
      </footer>
    </div>
  );
}