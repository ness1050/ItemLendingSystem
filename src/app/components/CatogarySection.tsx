"use client";

import React from "react";
import Card from "./Card";

const subcategories = [
  { name: "Web Development" },
  { name: "Mobile Apps" },
  { name: "Machine Learning" },
  { name: "UI/UX Design" },
  { name: "Data Science" },
  { name: "Cybersecurity" },
  { name: "Game Development" },
  { name: "Cloud Computing" },
  { name: "Artificial Intelligence" },
  { name: "DevOps" },
  { name: "Blockchain" },
  { name: "Database Management" },
];

export default function CategoriesSection() {
  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Categories</h2>

      {/* 4x3 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {subcategories.map((category) => (
          <Card key={category.name} name={category.name} image={""} rating={0} />
        ))}
      </div>
    </section>
  );
}
