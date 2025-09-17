"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-400">
          QuizCoder
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-6 items-center text-gray-800">
          <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <Link href="/languages" className="hover:text-yellow-400 transition-colors">Languages</Link>
          <Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link>
        </div>

        {/* Mobile menu */}
        <MobileMenu />
      </div>
    </nav>
  );
}

// Mobile Menu Component
function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-800 focus:outline-none"
      >
        ☰
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-yellow-400">Home</Link>
          <Link href="/languages" onClick={() => setOpen(false)} className="hover:text-yellow-400">Languages</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="hover:text-yellow-400">About</Link>
        </div>
      )}
    </div>
  );
}
