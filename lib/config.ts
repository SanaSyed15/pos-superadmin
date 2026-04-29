// Base API URL (your deployed backend)
export const BASE_URL = "https://pos-backend-s380.onrender.com";

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: "/api/auth/login",

  // Super Admin
  GET_RESTAURANTS: "/api/super-admin/restaurants",
  GET_DASHBOARD: "/api/super-admin/dashboard-stats", // ✅ FIXED
  GET_ANALYTICS: "/api/super-admin/analytics",
  GET_OWNERS: "/api/super-admin/owners",
};