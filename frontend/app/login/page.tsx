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

    alert("Login successful");
  };

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white p-10">
      <h1 className="text-5xl font-bold">
        Login
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
          onClick={login}
          className="bg-purple-600 p-4 rounded-xl"
        >
          Login
        </button>
      </div>
    </main>
  );
}