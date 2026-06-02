"use client";

import { supabase } from "@/lib/supabase";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-xl transition-all ${
      pathname === path
        ? "bg-purple-600 text-white"
        : "text-gray-300 hover:bg-[#1C1C24] hover:text-white"
    }`;

  return (
    <nav className="flex justify-between items-center p-6 border-b border-gray-800 mb-8">
    <a
    href="/dashboard"
    className="text-3xl font-bold tracking-tight gradient-text"
    >
    Vardrobe
    </a>

      <div className="flex gap-3 items-center">
        <a
          href="/dashboard"
          className={linkClass("/dashboard")}
        >
          Dashboard
        </a>

        <a
          href="/wardrobe"
          className={linkClass("/wardrobe")}
        >
          Wardrobe
        </a>

        <a
          href="/profile"
          className={linkClass("/profile")}
        >
          Profile
        </a>

        <a
          href="/tryon"
          className={linkClass("/tryon")}
        >
          Try-On
        </a>

        <button
          onClick={logout}
          className="ml-3 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition-all"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}