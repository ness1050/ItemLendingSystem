"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  href?: string; // optional navigation target
  variant?: "primary" | "secondary" | "danger";
}

/**
 * Reusable Button component with optional routing support
 */
export default function Button({ label, href, variant = "primary", ...props }: ButtonProps) {
  const router = useRouter();

  const baseStyle =
    "rounded-lg px-4 py-2 font-medium transition duration-200 focus:outline-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href) {
      e.preventDefault();
      router.push(href);
    }
    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`${baseStyle} ${variants[variant]} ${props.className || ""}`}
    >
      {label}
    </button>
  );
}
