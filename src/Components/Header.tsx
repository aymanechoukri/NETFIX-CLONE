"use client";

import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-5 left-0 -inset-2 bg-linear-to-r from-[#a2226f41] to-[#4fc2f760] backdrop-blur-md rounded-4xl w-[95%] mx-auto mt-3.5 shadow-[0_0_90px_rgb(162,34,110,0.5)] z-50 overflow-hidden mb-10">
      <nav className="flex justify-between items-center mx-5 py-3">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/image/Logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="h-16 w-auto"
            priority
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-2">
          <Link href="/">
            <li className="font-extrabold md:text-lg p-1 md:px-5 hover:bg-white/10 rounded-3xl transition">
              Home
            </li>
          </Link>
          <Link href="/list">
            <li className="font-extrabold md:text-lg p-1 md:px-5 hover:bg-white/10 rounded-3xl transition">
              My List
            </li>
          </Link>
          <Link href="/about">
            <li className="font-extrabold md:text-lg p-1 md:px-5 hover:bg-white/10 rounded-3xl transition">
              About us
            </li>
          </Link>
        </ul>

        {/* Right icons */}
        <div className="flex items-center space-x-3">
          <Link href="/search">
            <Search
              className="bg-black/60 text-white p-2 rounded-full backdrop-blur-2xl active:scale-95"
              size={35}
            />
          </Link>

          {/* Burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden flex flex-col items-center gap-4 pb-5">
          <Link href="/" onClick={() => setOpen(false)}>
            <li className="font-bold text-lg">Home</li>
          </Link>
          <Link href="/list" onClick={() => setOpen(false)}>
            <li className="font-bold text-lg">My List</li>
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            <li className="font-bold text-lg">About us</li>
          </Link>
        </ul>
      )}
    </header>
  );
}
