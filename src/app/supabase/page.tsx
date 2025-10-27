"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import Registration from "../registration/page"

export default function Home() {
  useEffect(() => {
    async function checkConnection() {
      const { data, error } = await supabase.from("users").select("*").limit(1);
      if (error) console.error("❌ Supabase connection failed:", error);
      else console.log("✅ Supabase connected:", data);
    }
    checkConnection();
  }, []);

  return (
    <main className="p-8">
      < Registration />
      <h1 className="text-2xl font-bold">Hello Supabase!</h1>
    </main>
  );
}
