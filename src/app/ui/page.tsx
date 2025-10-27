"use client";

import { useState } from "react";
import { addItem } from "../Services/item/itemServices"; // adjust path if needed

export default function AddItemForm({ ownerId }: { ownerId: string }) {


  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "available",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await addItem({
        owner_id: ownerId,
        item_name: formData.item_name,
        description: formData.description,
        category: formData.category,
        status: formData.status,
      });
      setMessage("✅ Item added successfully!");
      setFormData({ item_name: "", description: "", category: "", status: "available" });
    } catch (error: any) {
      console.error(error);
      setMessage("❌ Failed to add item: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md m-auto mt-10 flex flex-col text-black justify-center p-4 bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-center">Add New Item</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Item Name *</label>
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Adding..." : "Add Item"}
      </button>

      {message && <p className="text-center text-sm mt-2">{message}</p>}
    </form>
  );
}
