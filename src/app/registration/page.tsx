"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // 1️⃣ Create user in Supabase Auth with metadata
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { name: formData.name }, // 👈 include name in metadata
        emailRedirectTo: `${window.location.origin}/`, // redirect after email confirmation
      },
    });

    if (error) {
      setMessage("Error: " + error.message);
      setLoading(false);
      return;
    }

    // 2️⃣ Optionally store extra info in your "users" table
    const user = data.user;
    if (user) {
      const { error: insertError } = await supabase
        .from("users")
        .insert([{ id: user.id, name: formData.name, email: formData.email }]);

      if (insertError) {
        setMessage("Signup succeeded but failed to save profile.");
      } else {
        setMessage("✅ Registration successful! Check your email to confirm.");
      }
    }

    setLoading(false);
    router.push("/login");
  }

  return (
    <main className="flex flex-col text-black items-center justify-center min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-md"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-md"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-md"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
        )}
      </form>
    </main>
  );
}
