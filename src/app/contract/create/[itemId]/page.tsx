"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getItemById } from "@/app/Services/item/itemServices";
import { createContract } from "@/app/Services/contract/contractServices";
import Button from "@/app/ui/button/button";
import { supabase } from "@/app/lib/supabase";

export default function CreateContractFromItemPage() {
  const params = useParams();
  const itemId = params.itemId as string;

  const [item, setItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    borrower_name: "",
    start: "",
    end: "",
    terms: "",
  });

  useEffect(() => {
    async function fetchItem() {
      const data = await getItemById(itemId);
      setItem(data);
    }
    fetchItem();
  }, [itemId]);

  useEffect(() => {
  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    console.log("🔐 Logged in user:", user);
  }
  checkUser();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();


    if (!item) return alert("Item not loaded yet.");
    const { data: { user }, error: userError } = await supabase.auth.getUser();
        console.log("🧭 Logged in user:", user);
        if (userError) console.error("Auth error:", userError);
        if (!user) {
        alert("Please log in first — no authenticated session found.");
        return;
    }


    try {
      await createContract({
        lender_id: item.owner_id,
        borrower_id: user.id, // you can replace this with the logged-in user later
        item_id: item.id,
        start: formData.start,
        end: formData.end,
        status: "Pending",
        terms: formData.terms,
        category: item.category,
      });
      alert("✅ Contract created successfully!");
    } catch (error: any) {
      console.error(error);
      alert("❌ Failed to create contract: " + error.message);
    }
  }

  if (!item) return <p className="p-6 text-center">Loading item details...</p>;

  return (
    <main className="max-w-lg mx-auto bg-white text-black p-10 mt-10 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">
        Create Contract for {item.item_name}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Borrower Name *</label>
          <input
            name="borrower_name"
            value={formData.borrower_name}
            onChange={(e) =>
              setFormData({ ...formData, borrower_name: e.target.value })
            }
            placeholder="Enter borrower name"
            className="border rounded-lg w-full p-2"
            required
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block font-medium mb-1">Start Date *</label>
            <input
              type="date"
              name="start"
              value={formData.start}
              onChange={(e) => setFormData({ ...formData, start: e.target.value })}
              className="border rounded-lg w-full p-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">End Date *</label>
            <input
              type="date"
              name="end"
              value={formData.end}
              onChange={(e) => setFormData({ ...formData, end: e.target.value })}
              className="border rounded-lg w-full p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Terms</label>
          <textarea
            name="terms"
            value={formData.terms}
            onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
            rows={3}
            className="border rounded-lg w-full p-2"
            placeholder="Specify any special terms..."
          ></textarea>
        </div>

        <Button label="Create Contract" type="submit" />
      </form>
    </main>
  );
}
