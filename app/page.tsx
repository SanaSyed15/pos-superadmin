"use client";

import Reveal from "@/components/Reveal";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ADMIN_LANDING_CSS_1 } from "./admin-landing-styles-part1";
import { ADMIN_LANDING_CSS_2 } from "./admin-landing-styles-part2";
import { Monitor, Smartphone, QrCode } from "lucide-react";

// ✅ TYPE (add at top of file)
type Module = {
  title: string;
  desc: string;
  ico: string;
  points?: string[];
};

// ✅ MODULE DATA
const CORE_MODULES = [
  {
    title: "Restaurant Configuration",
    desc: "Setup restaurant details, GST, and table management.",
    img: "/screens/config.png",
    points: [
      "GST & tax settings",
      "Table layout management",
      "Restaurant profile setup",
    ],
  },
  {
    title: "Menu Management",
    desc: "Create categories and manage menu items dynamically.",
    img: "/screens/menu1.png",
    points: [
      "Add / edit menu items",
      "Veg / Non-veg classification",
      "Real-time QR sync",
    ],
  },
  {
    title: "Order Management",
    desc: "Handle dine-in, takeaway, and online orders.",
    img: "/screens/orders.png",
    points: [
      "Order lifecycle tracking",
      "Live order updates",
      "Order history",
    ],
  },
  {
    title: "Billing & Payments",
    desc: "Generate invoices and manage payments.",
    img: "/screens/billings.png",
    points: [
      "GST-compliant billing",
      "Digital invoices",
      "Multiple payment modes",
    ],
  },
];

/* 🔥 SUPER ADMIN TEXT */
const MQ = [
  "Super Admin Panel",
  "Platform Control",
  "Multi-Restaurant",
  "Global Dashboard",
  "Admin Management",
  "System Analytics",
  "Security Logs",
  "Platform Settings",
];

const FEATS = [
  { num: "01", ico: "🏢", title: "Multi-Restaurant Control", body: "Manage all restaurant branches from one centralized system." },
  { num: "02", ico: "📊", title: "Global Analytics", body: "Track performance and revenue across all outlets." },
  { num: "03", ico: "👥", title: "Admin Management", body: "Manage all admins with role-based permissions." },
  { num: "04", ico: "⚙️", title: "Platform Settings", body: "Control system-wide configurations and settings." },
  { num: "05", ico: "🔐", title: "Security Logs", body: "Monitor activities and audit logs across platform." },
  { num: "06", ico: "🌐", title: "System Monitoring", body: "Track uptime and system performance globally." },
];

const STATS = [
  { ico: "🏢", n: "15+", l: "Restaurants" },
  { ico: "📋", n: "8K+", l: "Orders Daily" },
  { ico: "👥", n: "200+", l: "Admins" },
  { ico: "⭐", n: "99.9%", l: "Uptime" },
];

const DEF = {
  name: "ScanPOS Platform",
  type: "Super Admin System",
  description:
    "Control all restaurants, admins, analytics and platform operations from one powerful dashboard.",
};

const MODULES = [
  { title: "Configuration", desc: "GST, tables & setup", ico: "🏢" },
  { title: "Menu", desc: "Items, pricing, QR sync", ico: "🍽️" },
  { title: "Orders", desc: "Track all orders live", ico: "📋" },
  { title: "Billing", desc: "Invoices & payments", ico: "💳" },
  { title: "Analytics", desc: "Reports & insights", ico: "📊" },
];
const steps: string[] = [
  "Scan QR",
  "View Menu",
  "Place Order",
  "Kitchen",
  "Payment",
];

const descriptions: string[] = [
  "Customer scans QR code placed on table.",
  "Menu loads instantly with real-time items.",
  "Customer selects items and places order.",
  "Kitchen receives and prepares the order.",
  "Bill is generated and payment is completed.",
];

const images: string[] = [
  "https://plus.unsplash.com/premium_photo-1681293215038-2717d2b84c0d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://i.pinimg.com/736x/59/3c/6b/593c6b3c9787177097016747131195ca.jpg",
                "https://img.freepik.com/premium-vector/hand-holding-phone-with-mobile-app-order-food-online-website-fast-food-delivery-service-concept-fast-food-burger-delivery-online-service-vector_276184-113.jpg",
                "https://img.freepik.com/premium-photo/modern-kitchen-chefs-prepare-dishes-stove-kitchen-restaurant-hotel_926199-4361586.jpg",
                "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              ];

const contactBtn = {
  padding: "10px 18px",
  borderRadius: 6,
  background: "#7a1f1f",
  color: "#fff",
  fontSize: 13,
  letterSpacing: "1px",
  textDecoration: "none",
};

export default function SuperAdminLanding() {
  const coRef = useRef<HTMLDivElement>(null);
  const ciRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const outer = useRef({ x: -200, y: -200 });
  const tgt = useRef({ x: -200, y: -200 });

  const [resto, setResto] = useState(DEF);
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveStep((prev) => (prev + 1) % 5);
  }, 2500);
  return () => clearInterval(interval);
}, []);

  /* Cursor Glow (same as your admin) */
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

  const mq3 = [...MQ, ...MQ];

  return (
    <div className="landing-root">
      {/* SAME CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: ADMIN_LANDING_CSS_1 + ADMIN_LANDING_CSS_2,
        }}
      />

      {/* CURSOR */}
      <div id="lco" ref={coRef} />
      <div id="lci" ref={ciRef} />

      {/* NAVBAR */}
      <nav className="l-nav">
        <div className="nav-wordmark">
          <span className="nav-w1">{resto.name}</span>
          <span className="nav-w2">Super Admin Portal</span>
        </div>

        <a href="/login" className="nav-cta">
          <span>Access Dashboard</span>
        </a>
      </nav>

      {/* HERO */}
      <div className="l-hero">
        <div className="hero-body">
          <div className="hero-l">
            <div className="h-badge">
              <span className="h-badge-txt">Super Admin Control</span>
            </div>

            <h1 className="h-name">{resto.name}</h1>
            <p className="h-name-sub">{resto.type}</p>

            <p className="h-desc">
              Centralized Platform Management System
            </p>

            <a href="/login" className="h-btn">
              <span>Access Dashboard</span>
            </a>

            <p className="h-note">Restricted to Super Admins</p>
          </div>

          <div className="hero-r">
            <div className="hero-img-top">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0" />
            </div>
            <div className="hero-img-bot">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" alt="Kitchen" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="l-mq">
        <div className="mq-track">
          {mq3.map((t, i) => (
            <div key={i} className="mq-item">
              {t}
              <span className="mq-sep">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <Reveal>
      <section className="l-feat">
        <div className="feat-grid">
          {FEATS.map((f) => (
            <div key={f.num} className="fc">
              <div className="fc-num">{f.num}</div>
              <span className="fc-ico">{f.ico}</span>
              <div className="fc-title">{f.title}</div>
              <div className="fc-body">{f.body}</div>
            </div>
          ))}
        </div>
      </section>
      </Reveal>

<Reveal>
 <section
  style={{
    padding: "140px 40px",
    maxWidth: 1300,
    margin: "auto",
    position: "relative",
    background:
      "linear-gradient(to bottom, #f9f5ef 0%, #f3eadf 100%)",
    borderRadius: 24,
    overflow: "hidden",
  }}
>
  {/* BACKGROUND GLOW */}
  <div
    style={{
      position: "absolute",
      top: -120,
      right: -120,
      width: 400,
      height: 400,
      background:
        "radial-gradient(circle, rgba(201,164,92,0.15), transparent)",
      zIndex: 0,
    }}
  />

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      gap: 80,
      alignItems: "center",
      position: "relative",
      zIndex: 1,
    }}
  >
    {/* LEFT CONTENT */}
    <div>
      <div style={{ marginBottom: 30 }}>
  {/* TOP LABEL */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 10,
    }}
  >
    <div style={{ width: 40, height: 1, background: "#7a1f1f" }} />

    <span
      style={{
        fontSize: 12,
        letterSpacing: "3px",
        color: "#7a1f1f",
      }}
    >
      PRODUCT ECOSYSTEM
    </span>
  </div>

  {/* GOLD LINE */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 20,
    }}
  >
    <div style={{ width: 60, height: 1, background: "#c9a45c" }} />
    <div
      style={{
        width: 6,
        height: 6,
        background: "#c9a45c",
        transform: "rotate(45deg)",
      }}
    />
    <div style={{ width: 60, height: 1, background: "#c9a45c" }} />
  </div>

  {/* HEADING */}
  <h2
    style={{
      fontSize: 60,
      lineHeight: 1.15,
      margin: 0,
    }}
  >
    One Platform
    <br />
    Three Powerful{" "}
    <em style={{ color: "#7a1f1f" }}>Systems</em>
  </h2>
</div>
      


      <p
        style={{
          color: "#6b6b6b",
          lineHeight: 1.8,
          maxWidth: 500,
        }}
      >
        ScanPOS connects your entire restaurant workflow — from
        customer ordering to analytics — through a unified system.
      </p>

      {/* 🔥 CARDS */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {[
          {
            title: "Web Dashboard",
            user: "Admins & Staff",
            desc: "Control operations, analytics, staff and reports.",
            link: "https://pojectfinalrepo.vercel.app/",
            live: true,
          },
          {
            title: "QR Ordering",
            user: "Customers",
            desc: "Scan, browse menu and place orders instantly.",
            link: "https://customerfinal1.vercel.app/",
            live: true,
          },
          {
            title: "Mobile App",
            user: "Staff",
            desc: "Fast billing and order handling.",
            live: false,
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "22px 26px",
              borderRadius: 12,
              background:
                "linear-gradient(to right, #eadac1, #f6efe5)",
              border: "1px solid rgba(0,0,0,0.05)",
              transition: "all 0.35s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* LEFT ACCENT */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 4,
                background: "#7a1f1f",
                borderRadius: "4px 0 0 4px",
              }}
            />

            <div style={{ marginLeft: 10 }}>
              {/* TITLE */}
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#3a1f1f",
                }}
              >
                {item.title}
              </div>

              {/* USER */}
              <div
                style={{
                  fontSize: 13,
                  color: "#a08f7a",
                  margin: "4px 0",
                }}
              >
                {item.user}
              </div>

              {/* DESC */}
              <div
                style={{
                  fontSize: 14,
                  color: "#6b6b6b",
                  marginBottom: 12,
                }}
              >
                {item.desc}
              </div>

              {/* 🔥 PREMIUM BUTTON */}
              {item.live ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 18px",
                    background: "#7a1f1f",
                    color: "#fff",
                    fontSize: 12,
                    letterSpacing: "1px",
                    textDecoration: "none",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#5f1818";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#7a1f1f";
                  }}
                >
                  {item.title === "Web Dashboard"
                    ? "Access Dashboard"
                    : "See Live"}

                  {/* GOLD DIAMOND */}
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      background: "#c9a45c",
                      transform: "rotate(45deg)",
                    }}
                  />
                </a>
              ) : (
                <span
                  style={{
                    fontSize: 13,
                    color: "#999",
                  }}
                >
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* RIGHT SIDE IMAGES */}
    <div style={{ position: "relative" }}>
      <img
        src="https://media.istockphoto.com/id/1309902487/photo/womens-hands-using-the-phone-to-scan-the-qr-code-to-order-pizza.jpg?s=1024x1024&w=is&k=20&c=5cRULtTooyFrQETEY-NixvFY9ZpK6cjlhWNUWKdI5q4="
        style={{
          width: "100%",
          borderRadius: 16,
        }}
      />

      <img
        src="https://images.unsplash.com/photo-1601972602288-3be527b4f18a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={{
          position: "absolute",
          bottom: -40,
          left: -40,
          width: 260,
          borderRadius: 16,
          border: "8px solid #f9f5ef",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        }}
      />
    </div>
  </div>
</section>
</Reveal>

<Reveal>
<section
  style={{
    padding: "140px 40px",
    maxWidth: 1300,
    margin: "auto",
    position: "relative",
  }}
>
  {/* HEADER */}
 <div style={{ marginBottom: 70 }}>
  {/* TOP LABEL */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 10,
    }}
  >
    <div style={{ width: 40, height: 1, background: "#7a1f1f" }} />

    <span
      style={{
        fontSize: 12,
        letterSpacing: "3px",
        color: "#7a1f1f",
      }}
    >
      USER ROLES
    </span>
  </div>

  {/* GOLD DECOR LINE */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 20,
    }}
  >
    <div style={{ width: 60, height: 1, background: "#c9a45c" }} />

    <div
      style={{
        width: 6,
        height: 6,
        background: "#c9a45c",
        transform: "rotate(45deg)",
      }}
    />

    <div style={{ width: 60, height: 1, background: "#c9a45c" }} />
  </div>

  {/* MAIN HEADING */}
  <h2
    style={{
      fontSize: 52,
      lineHeight: 1.2,
      marginBottom: 10,
    }}
  >
    Built for Every{" "}
    <em style={{ color: "#7a1f1f" }}>Role</em>
  </h2>

  {/* DESCRIPTION */}
  <p
    style={{
      maxWidth: 600,
      color: "#6b6b6b",
    }}
  >
    Designed for seamless collaboration between administrators,
    staff, and customers — all in one ecosystem.
  </p>
</div>


  {/* GRID */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 30,
    }}
  >
    {[
      {
        role: "Super Admin",
        desc: "Controls platform, manages restaurants, monitors global analytics and system health.",
      },
      {
        role: "Restaurant Owner",
        desc: "Manages menu, orders, staff, reports and overall business performance.",
      },
      {
        role: "Staff",
        desc: "Handles billing, order processing, and real-time service operations.",
      },
      {
        role: "Customer",
        desc: "Scans QR, browses menu, and places orders effortlessly.",
      },
    ].map((r, i) => (
      <div
        key={i}
        style={{
          padding: "32px 28px",
          borderRadius: 14,
          background:
            "linear-gradient(to bottom, #f4ece0, #efe6d8)",
          border: "1px solid rgba(0,0,0,0.05)",
          position: "relative",
          transition: "all 0.35s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow =
            "0 20px 50px rgba(0,0,0,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* TOP ACCENT LINE */}
        <div
          style={{
            width: 40,
            height: 2,
            background: "#c9a45c",
            marginBottom: 16,
          }}
        />

        {/* ROLE */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#3a1f1f",
            marginBottom: 10,
          }}
        >
          {r.role}
        </div>

        {/* DESC */}
        <div
          style={{
            fontSize: 14,
            color: "#6b6b6b",
            lineHeight: 1.6,
          }}
        >
          {r.desc}
        </div>

        {/* NUMBER MARK (SUBTLE PREMIUM TOUCH) */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            fontSize: 32,
            color: "rgba(122,31,31,0.08)",
            fontWeight: 700,
          }}
        >
          0{i + 1}
        </div>
      </div>
    ))}
  </div>
</section>
</Reveal>

<Reveal>
<section
  style={{
    padding: "140px 40px",
    maxWidth: 1300,
    margin: "auto",
  }}
>
  {/* 🔥 HEADING */}
  <div style={{ marginBottom: 60 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 40, height: 1, background: "#7a1f1f" }} />
      <span style={{ fontSize: 12, letterSpacing: "3px", color: "#7a1f1f" }}>
        CORE MODULES
      </span>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0 20px" }}>
      <div style={{ width: 60, height: 1, background: "#c9a45c" }} />
      <div style={{ width: 6, height: 6, background: "#c9a45c", transform: "rotate(45deg)" }} />
      <div style={{ width: 60, height: 1, background: "#c9a45c" }} />
    </div>

    <h2 style={{ fontSize: 52 }}>
      Core System <em style={{ color: "#7a1f1f" }}>Modules</em>
    </h2>
  </div>

  {/* 🔥 TABS */}
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 40,
    }}
  >
    {CORE_MODULES.map((m, i) => (
      <button
        key={i}
        onClick={() => setActiveTab(i)}
        style={{
          padding: "10px 18px",
          borderRadius: 30,
          background: activeTab === i ? "#7a1f1f" : "transparent",
          color: activeTab === i ? "#fff" : "#7a1f1f",
          border: activeTab === i ? "none" : "1px solid #7a1f1f33",
          boxShadow: activeTab === i ? "0 8px 20px rgba(122,31,31,0.25)" : "none",
          fontSize: 13,
          letterSpacing: "1px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        {m.title}
      </button>
    ))}
  </div>

  {/* 🔥 PANEL */}
  <div
    key={activeTab}
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 50,
      padding: "45px",
      borderRadius: 18,
      background: "linear-gradient(to bottom, #f4ece0, #efe6d8)",
      border: "1px solid rgba(0,0,0,0.05)",
      transition: "all 0.4s ease",
    }}
  >
    {/* LEFT CONTENT */}
    <div>
      <h3
        style={{
          fontSize: 28,
          color: "#3a1f1f",
          marginBottom: 12,
        }}
      >
        {CORE_MODULES[activeTab].title}
      </h3>

      <p
        style={{
          color: "#6b6b6b",
          lineHeight: 1.8,
          marginBottom: 20,
        }}
      >
        {CORE_MODULES[activeTab].desc}
      </p>

      {/* 🔥 PREMIUM FEATURE CARDS */}
      <div
  style={{
    fontSize: 12,
    letterSpacing: "2px",
    color: "#8b6f3d",
    marginBottom: 10,
  }}
>
  KEY FEATURES
</div>
      <div
  style={{
    marginTop: 20,
    display: "grid",
    gap: 12,
  }}
>
  {CORE_MODULES[activeTab].points?.map((p, idx) => (
    <div
      key={idx}
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
      }}
    >
      {/* NUMBER */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "#7a1f1f",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {idx + 1}
      </div>

      {/* TEXT */}
      <div
        style={{
          background: "#f6efe5",
          padding: "10px 14px",
          borderRadius: 8,
          flex: 1,
          border: "1px solid #eadfce",
        }}
      >
        {p}
      </div>
    </div>
  ))}
</div>
    </div>

    {/* 🔥 RIGHT SIDE - DASHBOARD PREVIEW */}
    <div
  style={{
    position: "relative",
    borderRadius: 16,
    overflow: "hidden", // 🔥 IMPORTANT (hides overflow when zooming)
    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
  }}
>
  {/* 🔥 REAL SCREENSHOT */}
  <img
    src={CORE_MODULES[activeTab].img}
    alt={CORE_MODULES[activeTab].title}
    style={{
      width: "100%",
      height: 320,
      objectFit: "cover",
      transition: "transform 0.6s ease", // 🔥 smooth zoom
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  />

  {/* 🔥 DARK GRADIENT OVERLAY */}
   {/* GRADIENT OVERLAY */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
    }}
  />


  {/* 🔥 TOP LABEL */}
  <div
  style={{
    position: "absolute",
    top: 16,
    right: 16, // ✅ moved from left → right
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 14px",
    borderRadius: 20,
    background: "rgba(201,164,92,0.95)",
    color: "#2b1a10",
    fontSize: 11,
    letterSpacing: "2px",
    fontWeight: 600,
    backdropFilter: "blur(6px)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    zIndex: 2, // 🔥 ensures it stays above image
  }}
>
  MODULE PREVIEW

  {/* DIAMOND */}
  <span
    style={{
      width: 6,
      height: 6,
      background: "#7a1f1f",
      transform: "rotate(45deg)",
    }}
  />
</div>

  {/* 🔥 TITLE */}
  <div
    style={{
      position: "absolute",
      bottom: 70,
      left: 20,
      color: "#fff",
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: "1px",
    }}
  >
    {CORE_MODULES[activeTab].title}
  </div>

  {/* 🔥 LIVE BUTTON */}
  <a
  href="https://pojectfinalrepo.vercel.app/admin/login"
  target="_blank"
  style={{
    position: "absolute",
    bottom: 20,
    left: 20,
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 20px",
    background: "linear-gradient(135deg, #c9a45c, #b8934f)",
    color: "#2b1a10",
    borderRadius: 6,
    fontSize: 12,
    letterSpacing: "1px",
    textDecoration: "none",
    fontWeight: 600,
    boxShadow: "0 8px 20px rgba(201,164,92,0.35)",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow =
      "0 12px 30px rgba(201,164,92,0.5)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow =
      "0 8px 20px rgba(201,164,92,0.35)";
  }}
>
  VIEW LIVE

  {/* GOLD DIAMOND */}
  <span
    style={{
      width: 8,
      height: 8,
      background: "#7a1f1f",
      transform: "rotate(45deg)",
    }}
  />
</a>
</div>
</div>
</section>
</Reveal>

<Reveal>
<section
  style={{
    padding: "90px 40px 120px",
    maxWidth: 1200,
    margin: "auto",
    position: "relative",
    overflow: "hidden",

    background: `
      radial-gradient(circle at 20% 30%, rgba(201,164,92,0.15), transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(122,31,31,0.08), transparent 40%),
      linear-gradient(to bottom, #f8f3eb, #efe6d8)
    `,
  }}
>
  {/* 🔥 HEADING */}
  <div style={{ marginBottom: 40 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 40, height: 1, background: "#7a1f1f" }} />
      <span style={{ fontSize: 12, letterSpacing: "3px", color: "#7a1f1f" }}>
        SYSTEM FLOW
      </span>
    </div>

    <h2 style={{ fontSize: 52, marginTop: 10, marginBottom: 10 }}>
      How <em style={{ color: "#7a1f1f" }}>ScanPOS Works</em>
    </h2>

    <p style={{ maxWidth: 520, color: "#6b6b6b", lineHeight: 1.7 }}>
      Experience a seamless ordering journey from QR scan to payment —
      built for speed, simplicity, and efficiency.
    </p>
  </div>

  {/* 🔥 MAIN GRID */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60,
      alignItems: "center",
    }}
  >
    {/* LEFT SIDE */}
    <div style={{ position: "relative" }}>
      {/* BASE LINE */}
      <div
        style={{
          position: "absolute",
          top: 38,
          left: 0,
          right: 0,
          height: 2,
          background: "#eadfce",
        }}
      />

      {/* ACTIVE LINE */}
      <div
        style={{
          position: "absolute",
          top: 38,
          left: 0,
          height: 2,
          width: `${((activeStep + 1) / steps.length) * 100}%`,
          background: "linear-gradient(90deg,#c9a45c,#e0c48a)",
          transition: "width 0.6s ease",
        }}
      />

      {/* STEPS */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {steps.map((step: string, i: number) => {
          const isActive = i <= activeStep;

          return (
            <div key={i} style={{ textAlign: "center", width: "18%" }}>
              {/* CIRCLE */}
              <div
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: "50%",
                  margin: "auto",
                  background: isActive
                    ? "linear-gradient(135deg,#c9a45c,#b8934f)"
                    : "linear-gradient(#f4ece0,#efe6d8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 16,
                  color: isActive ? "#2b1a10" : "#999",
                  transition: "all 0.4s ease",
                  boxShadow: isActive
                    ? "0 15px 40px rgba(201,164,92,0.5)"
                    : "inset 0 0 12px rgba(0,0,0,0.05)",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                  position: "relative",
                }}
              >
                0{i + 1}

                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      width: 95,
                      height: 95,
                      borderRadius: "50%",
                      border: "1px solid rgba(201,164,92,0.3)",
                    }}
                  />
                )}
              </div>

              {/* LABEL */}
              <div
                style={{
                  marginTop: 12,
                  fontSize: 13,
                  letterSpacing: "1px",
                  color: isActive ? "#3a1f1f" : "#aaa",
                }}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>

      {/* DESCRIPTION */}
      <div
        style={{
          marginTop: 50,
          padding: 28,
          borderRadius: 18,
          background: "linear-gradient(#f4ece0,#efe6d8)",
        }}
      >
        <h4 style={{ color: "#7a1f1f", marginBottom: 8 }}>
          Step {activeStep + 1}
        </h4>

        <p style={{ color: "#6b6b6b", lineHeight: 1.7 }}>
          {descriptions[activeStep]}
        </p>
      </div>
    </div>

    

    {/* RIGHT SIDE PHONE */}
    
    <div
      style={{
        width: 260,
        height: 520,
        margin: "auto",
        borderRadius: 40,
        background: "#111",
        padding: 10,
        position: "relative",
        boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 30,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          key={activeStep}
          src={images[activeStep]}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "all 0.5s ease",
          }}
        />

        {activeStep === 0 && (
          <div
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              height: 2,
              background: "#c9a45c",
              animation: "scan 2s infinite",
            }}
          />
        )}
      </div>

      {/* STEP TAG */}
      <div
        style={{
          position: "absolute",
          top: -50,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#7a1f1f",
          color: "#fff",
          padding: "6px 14px",
          borderRadius: 20,
          fontSize: 12,
        }}
      >
        {steps[activeStep]}
      </div>
    </div>
  </div>

  {/* ANIMATION */}
  <style>
    {`
      @keyframes scan {
        0% { top: 20%; opacity: 0; }
        50% { opacity: 1; }
        100% { top: 80%; opacity: 0; }
      }
    `}
  </style>
</section>
</Reveal>

<Reveal>
<section
  style={{
    position: "relative",
    textAlign: "center",
    padding: "120px 40px",
    overflow: "hidden",
    background: `
      radial-gradient(circle at 30% 40%, rgba(201,164,92,0.15), transparent 40%),
      radial-gradient(circle at 70% 70%, rgba(122,31,31,0.1), transparent 40%),
      linear-gradient(to bottom, #f8f3eb, #efe6d8)
    `,
  }}
>
  {/* 🔥 TOP LINE */}
  <div
    style={{
      position: "absolute",
      top: 40,
      left: "50%",
      transform: "translateX(-50%)",
      width: 80,
      height: 1,
      background: "#c9a45c",
    }}
  />

  {/* 🔥 HEADING */}
  <h2 style={{ fontSize: 56, marginTop: 20 }}>
    Take Full Control of Your{" "}
    <em style={{ color: "#7a1f1f" }}>Restaurant Ecosystem</em>
  </h2>

  {/* 🔥 SUBTEXT */}
  <p
    style={{
      maxWidth: 600,
      margin: "20px auto",
      color: "#6b6b6b",
      lineHeight: 1.7,
    }}
  >
    From QR ordering to real-time analytics, manage every aspect of your
    restaurant seamlessly — all in one powerful platform.
  </p>

  {/* 🔥 MAIN CTA */}
  <a
    href="/login"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      marginTop: 25,
      padding: "14px 26px",
      background: "linear-gradient(135deg,#c9a45c,#b8934f)",
      color: "#2b1a10",
      borderRadius: 6,
      fontSize: 13,
      letterSpacing: "1px",
      fontWeight: 600,
      textDecoration: "none",
      boxShadow: "0 10px 30px rgba(201,164,92,0.4)",
      transition: "all 0.3s ease",
    }}
  >
    LAUNCH DASHBOARD

    <span
      style={{
        width: 8,
        height: 8,
        background: "#7a1f1f",
        transform: "rotate(45deg)",
      }}
    />
  </a>

  {/* 🔥 SECONDARY CTA */}
  <div style={{ marginTop: 15 }}>
    <a
      href="https://pojectfinalrepo.vercel.app/"
      target="_blank"
      style={{
        fontSize: 13,
        color: "#7a1f1f",
        textDecoration: "none",
        letterSpacing: "1px",
      }}
    >
      View Live Demo →
    </a>
  </div>

  {/* ===================== */}
  {/* 🔥 NEW: BUSINESS CONTACT BLOCK */}
  {/* ===================== */}
  <div
    style={{
      marginTop: 60,
      padding: "30px",
      borderRadius: 16,
      maxWidth: 650,
      marginInline: "auto",
      background: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(0,0,0,0.05)",
    }}
  >
    <h4 style={{ color: "#7a1f1f", marginBottom: 10 }}>
      Own a Restaurant?
    </h4>

    <p style={{ color: "#6b6b6b", fontSize: 14, lineHeight: 1.6 }}>
      Transform your restaurant operations with ScanPOS.  
      Get QR ordering, billing, analytics, and complete management — all in one system.
    </p>

    {/* CONTACT BUTTONS */}
    <div
      style={{
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        gap: 15,
        flexWrap: "wrap",
      }}
    >
      {/* EMAIL */}
      <a
        href="mailto:support@scanpos.com"
        style={contactBtn}
      >
        Contact Us
      </a>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        style={{
          ...contactBtn,
          background: "#25D366",
          color: "#fff",
        }}
      >
        WhatsApp
      </a>
    </div>
  </div>

  {/* 🔥 BOTTOM LINE */}
  <div
    style={{
      position: "absolute",
      bottom: 40,
      left: "50%",
      transform: "translateX(-50%)",
      width: 120,
      height: 1,
      background: "#c9a45c",
    }}
  />
</section>
</Reveal>

      {/* STATS */}
      <div className="l-stats">
        {STATS.map((s) => (
          <div key={s.l} className="sc-card">
            <span className="sc-ico">{s.ico}</span>
            <div className="sc-n">{s.n}</div>
            <div className="sc-l">{s.l}</div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="l-footer">
        <div className="ft-bottom">
          <span className="ft-copy">
            © {new Date().getFullYear()} {resto.name}
          </span>
          <span className="ft-ver">Super Admin Portal</span>
        </div>
      </footer>
    </div>
  );
}