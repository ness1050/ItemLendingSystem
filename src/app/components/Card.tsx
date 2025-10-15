

import React from "react";
import {Star} from "lucide-react";
import image from "next/image";


interface CategoryProps {
    name: string,
    image: string,
    rating: number;
}

export default function CardProps( {name, image, rating}: CategoryProps) {
 return (
    <div
      className="relative w-60 h-72 rounded-2xl overflow-hidden shadow-md flex-shrink-0 hover:scale-105 hover:shadow-lg transition-transform duration-300"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Card content */}
      <div className="absolute bottom-0 w-full p-4 text-white">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm">{rating.toFixed(1)}</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
          Explore
        </button>
      </div>
    </div>
  );
}