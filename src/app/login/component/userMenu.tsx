"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function UserMenu({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md"
      >
        <Image
          src="/icons/user.svg"
          alt="User"
          width={24}
          height={24}
          className="rounded-full bg-gray-700 p-1"
        />
        <span className="text-yellow-400 font-medium">
          {user.user_metadata?.name || user.email}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-2 z-50">
          <div className="px-3 py-2 border-b border-gray-700">
            <p className="text-sm font-semibold text-black">
              {user.user_metadata?.name || user.email}
            </p>
            <p className="text-xs text-gray-400">Online</p>
          </div>

          <div className="py-2">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-800 rounded-md text-gray-200">Profile</a>
            <a href="/Dashboard" className="block px-4 py-2 hover:bg-gray-800 rounded-md text-gray-200">Dashboard</a>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-800 rounded-md text-gray-200">Settings</a>
            <a href="/help" className="block px-4 py-2 hover:bg-gray-800 rounded-md text-gray-200">Help</a>
          </div>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 rounded-md"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
