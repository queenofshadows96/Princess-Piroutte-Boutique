"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function FulfillmentLoginPage() {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    // Step 1: Sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMsg("Invalid login");
      return;
    }

    // ⭐ Step 2: Wait for session cookie to be written
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Step 3: Fetch profile using the user ID
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    // Step 4: Allowed roles
    const allowedRoles = ["fulfillment", "admin_fulfillment"];

    if (!profile || !allowedRoles.includes(profile.role)) {
      setMsg("Access denied");
      await supabase.auth.signOut();
      return;
    }

    router.push("/fulfillment/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Fulfillment Login
        </h1>

        {msg && (
          <p className="text-center text-red-600 mb-4">{msg}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
