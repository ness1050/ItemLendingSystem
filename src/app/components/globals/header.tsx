"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../../lib/supabase";
import Logo from "../../assests/logo.svg";
import type { User } from "@supabase/supabase-js";
import UserMenu from "@/app/login/component/userMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      console.log("Checking session...");
      const { data: sessionData } = await supabase.auth.getSession();

      if (mounted && sessionData?.session) {
        console.log("Session found:", sessionData.session.user);
        setUser(sessionData.session.user);
      }

      // Listen for login/logout
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log("Auth state changed:", session?.user);
        if (mounted) setUser(session?.user ?? null);
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src={Logo} alt="Logo" width={40} height={50} />
          <span className="text-2xl font-bold tracking-wide">ItemLending</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-yellow-400 transition">Home</a>
          <a href="/User" className="hover:text-yellow-400 transition">Account</a>
          <a href="/contract" className="hover:text-yellow-400 transition">Contracts</a>
          <a href="/about" className="hover:text-yellow-400 transition">About</a>
          <a href="/contact" className="hover:text-yellow-400 transition">Contact</a>
        </nav>

        {/* Search + Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center bg-gray-800 px-2 py-1 rounded-md">
            <Image
              src="/icons/search.svg"
              alt="Search"
              width={16}
              height={16}
              className="opacity-70 mr-1"
            />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-gray-200"
            />
          </div>
    
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <a href="/login" className="hover:text-yellow-400 transition">
                <Image src="/icons/user.svg" alt="Login" width={22} height={22} />
              </a>
              <a
                href="/registration"
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md text-black font-semibold"
              >
                Register
              </a>
            </>
)}

        </div>

        {/* Mobile Menu */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Image
            src={menuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
            alt="Menu"
            width={26}
            height={26}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-gray-800 px-6 py-4 space-y-2">
          <a href="/" className="block hover:text-yellow-400">Home</a>
          <a href="/User" className="block hover:text-yellow-400">Members</a>
          <a href="/items" className="block hover:text-yellow-400">Items</a>
          <a href="/about" className="block hover:text-yellow-400">About</a>
          <a href="/contact" className="block hover:text-yellow-400">Contact</a>
        </nav>
      )}
    </header>
  );
}
