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
    <main className="min-h-screen bg-[#0B0B0F] text-white p-10">
      <h1 className="text-5xl font-bold">
        Sign Up
      </h1>

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
          onClick={signUp}
          className="bg-purple-600 p-4 rounded-xl"
        >
          Create Account
        </button>
      </div>
    </main>
  );
}