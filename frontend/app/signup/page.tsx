"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created");
  };

  return (
  <main className="auth-bg min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center px-6">
      <div className="glass-card w-full max-w-md p-10">
        <h1 className="text-5xl font-bold">
          Sign Up
        </h1>

        <div className="flex flex-col gap-4 mt-8 max-w-md">
          <input
            placeholder="Email"
            className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-purple-500 transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-purple-500 transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={signUp}
            className="bg-purple-600 p-4 rounded-xl"
          >
            Create Account
          </button>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?
            </p>

            <a
              href="/login"
              className="text-purple-500 hover:text-purple-400"
            >
              Login here
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}