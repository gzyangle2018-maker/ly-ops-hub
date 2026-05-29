import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-surface text-gray-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-white/5 py-6 text-center text-xs text-gray-600">
        LY-OPS Hub · Phase 1 — 总控台 · 幕后操盘手 L 的亚马逊运营 AI 中台
      </footer>
    </div>
  );
}
