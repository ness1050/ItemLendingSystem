"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  getItemsByUser,
  deleteItem,
  updateItemStatus,
} from "../Services/item/itemServices";

export default function MyItemsList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Fetch user items
  useEffect(() => {
    async function loadItems() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const data = await getItemsByUser(user.id);
      setItems(data);
    }

    loadItems();
  }, []);

  // Delete item
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setMessage("🗑️ Item deleted successfully!");
    } catch (error: any) {
      console.error(error);
      setMessage("❌ Failed to delete item: " + error.message);
    }
  }

  // Update item status
  async function handleUpdateStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "available" ? "unavailable" : "available";
    try {
      await updateItemStatus(id, newStatus);
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
      setMessage(`✅ Item marked as ${newStatus}`);
    } catch (error: any) {
      console.error(error);
      setMessage("❌ Failed to update status: " + error.message);
    }
  }

  if (!userId) return <p className="text-center mt-10 text-gray-600">Please log in to view your items.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">My Items</h2>

      {message && (
        <p className="text-center mb-4 text-sm text-blue-700 font-medium">{message}</p>
      )}

      {items.length === 0 ? (
        <p className="text-center text-gray-600">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {item.item_name}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Category: {item.category}
                </p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      item.status === "available"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateStatus(item.id, item.status)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  {item.status === "available" ? "Mark Unavailable" : "Mark Available"}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
