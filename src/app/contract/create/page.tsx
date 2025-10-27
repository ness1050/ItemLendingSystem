"use client";

import { useState, useEffect } from "react";
import { createContract } from "@/app/Services/contract/contractServices";
import { getAvailableItems } from "@/app/Services/item/itemServices";
import Button from "@/app/ui/button/button";


export default function CreateContractPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    item_id: "",
    lender_id: "",
    name: "", // this could later come from Supabase Auth user
    start: "",
    end: "",
    terms: "",
    status: "Pending",
    category: "",
  });

  // Fetch available items
  useEffect(() => {
    async function fetchItems() {
      const data = await getAvailableItems();
      setItems(data);
      setLoading(false);
    }
    fetchItems();
  }, []);

  // When user selects an item, auto-fill lender_id & category
  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedItem = items.find((item) => item.id === selectedId);

    setFormData((prev) => ({
      ...prev,
      item_id: selectedId,
      lender_id: selectedItem?.owner?.id || "",
      category: selectedItem?.category || "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.item_id || !formData.lender_id) {
      alert("Please select an item before creating a contract.");
      return;
    }

    try {
      await createContract(formData);
      alert("✅ Contract created successfully!");
    } catch (error: any) {
      console.error(error);
      alert("❌ Failed to create contract: " + error.message);
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading available items...</p>;
  }

  return (
    <main className="max-w-lg mx-auto bg-white text-black p-10 mt-10 mb-0 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Create New Contract</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Selector */}
        <div>
          <label className=" block font-medium mb-1">Select Item *</label>
          <select
            name="item_id"
            value={formData.item_id}
            onChange={handleItemChange}
            required
            className=" border rounded-lg w-full p-2"
          >
            <option value="">-- Choose an available item --</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.item_name} (Owner: {item.owner?.name || "Unknown"})
              </option>
            ))}
          </select>
        </div>

        {/* Borrower (temporary input — replace with Supabase Auth user later) */}
        <div>
          <label className="block font-medium mb-1">Borrower ID *</label>
          <input
            name="borrower_id"
            value={formData.users.name}
            onChange={handleChange}
            placeholder="Enter borrower ID"
            className="border rounded-lg w-full p-2"
            required
          />
        </div>

        {/* Start & End Date */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block font-medium mb-1">Start Date *</label>
            <input
              type="date"
              name="start"
              value={formData.start}
              onChange={handleChange}
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
              onChange={handleChange}
              className="border rounded-lg w-full p-2"
              required
            />
          </div>
        </div>

        {/* Terms */}
        <div>
          <label className="block font-medium mb-1">Terms</label>
          <textarea
            name="terms"
            value={formData.terms}
            onChange={handleChange}
            rows={3}
            className="border rounded-lg w-full p-2"
            placeholder="Specify any special terms..."
          ></textarea>
        </div>

        {/* Submit */}
        <Button label="Create Contract" type="submit" />
      </form>
    </main>
  );
}
