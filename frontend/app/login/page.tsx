"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }
    alert("LOGIN SUCCESS");
    window.location.href = "/dashboard";
    };

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold text-center">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-center mt-3 mb-8">
          Sign in to access your wardrobe
        </p>

        <div className="flex flex-col gap-4 mt-8 max-w-md">
          <input
            placeholder="Email"
            className="bg-[#13131A] p-4 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-[#13131A] p-4 rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="bg-purple-600 p-4 rounded-xl"
          >
            Login
          </button>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?
            </p>

            <a
              href="/signup"
              className="text-purple-500 hover:text-purple-400"
            >
              Sign up here
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}