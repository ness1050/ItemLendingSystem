"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllItems } from "@/app/Services/item/itemServices";
import Button from "@/app/ui/button/button";
import { createRequest } from "@/app/Services/request/requestServices";
import { supabase } from "@/app/lib/supabase";


interface Item {
  id: string;
  item_name: string;
  description?: string;
  category?: string;
  status?: string;
  image_url?: string;
  owner_id?: string;
}

export default function AllItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Fetch all items
  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      try {
        const data = await getAllItems(selectedStatus !== "all" ? selectedStatus : undefined);
        setItems(data || []);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [selectedStatus]);

    useEffect(() => {
        async function checkUser() {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error("Auth session error:", error);
            return;
        }

        if (session?.user) {
            console.log("🧭 Logged-in user:", session.user);
        } else {
            console.log("⚠️ No active session or user not logged in.");
        }
        }

        checkUser();
        }, []);



  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading items...</p>;
  }

  return (
    <main className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Items</h1>
        <Button label="Add New Item" href="/Member" />
      </div>

      

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {["all", "available", "unavailable"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg border transition ${
              selectedStatus === status
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Item Grid */}
      {items.length === 0 ? (
        <div className="text-center text-gray-500 py-10 border border-dashed border-gray-300 rounded-lg">
          <p>No items found for this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition border border-gray-100"
            >
              <Image
                src={item.image_url || "/icons/box.svg"}
                alt={item.item_name}
                width={120}
                height={120}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h2 className="font-semibold text-lg text-gray-900">{item.item_name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description || "No description"}</p>
              <p className="text-sm text-gray-500 mt-1">Category: {item.category || "—"}</p>

              <div className="flex justify-between items-center mt-3">
                <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    item.status === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
                >
                {item.status}
                </span>

                    {item.status === "available" && (
                    <button
                        onClick={async () => {
                        try {
                            await createRequest(item.id, item.owner_id);
                            alert("📨 Request sent to the owner!");
                        } catch (error: any) {
                            console.error(error);
                            alert("❌ Failed to send request: " + error.message);
                        }
                        }}
                        className="mt-3 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Request Item
                    </button>
                    )}

                </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}
