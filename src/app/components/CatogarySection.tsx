"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getCategories } from "@/app/Services/item/itemServices";

export default function CategoriesSection() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="text-center py-20 bg-white mt-10 mx-10 border rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Categories</h2>
        <p className="text-gray-500">Loading categories...</p>
      </section>
    );
  }

  return (
    <section className="flex-initial text-center gap-3 px-20 py-20 bg-white mt-10 ml-10 mr-10 border rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Categories</h2>

      {/* Grid of dynamic categories */}
      <div className="item-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <p className="text-gray-500 col-span-full">
            No categories available.
          </p>
        ) : (
          categories.map((category) => (
            <Card key={category} name={category} image={""} rating={0} />
          ))
        )}
      </div>
    </section>
  );
}
