"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white px-6">
   
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-center">
        Welcome to <span className="text-yellow-400">QuizCoder</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-lg md:text-xl text-center text-gray-200 max-w-2xl">
        Sharpen your coding skills through fun, interactive quizzes.  
        Learn by solving, compete with friends, and become a <span className="text-yellow-400">Code Master</span>.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <Link href="/languages">
          <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
            Start Quiz
          </Button>
        </Link>
        <Link href="/about">
          <Button
            size="lg"
            variant="outline"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            Learn More
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-gray-400">
        © {new Date().getFullYear()} QuizCoder. All rights reserved.
      </footer>
    </div>
  );
}
