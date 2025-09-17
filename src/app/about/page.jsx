"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white px-6 py-16">
      {/* Page title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-8 text-yellow-400">
        About QuizCoder
      </h1>

      {/* About section */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <p className="text-lg md:text-xl text-gray-200">
          QuizCoder is an interactive platform for learning coding through quizzes.  
          You can sharpen your skills, track your progress, and challenge yourself with coding quizzes in multiple programming languages.
        </p>
        <p className="text-lg md:text-xl text-gray-200">
          Inspired by modern portfolio sites, this platform is built fully using Next.js and TailwindCSS, making it fast, responsive, and visually engaging.
        </p>
      </div>

      {/* Projects section */}
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 text-center mt-16 mb-8">
        My Projects
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Example Project Cards */}
        <Link href="https://portfolio-saiprasad.vercel.app/" target="_blank">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer text-gray-800 dark:text-white transform hover:-translate-y-1 duration-200 text-center">
            <h3 className="text-xl font-bold mb-2">Portfolio Website</h3>
            <p className="text-gray-600 dark:text-gray-300">A personal portfolio built with Next.js showcasing my work.</p>
          </div>
        </Link>

        <Link href="https://portfolio-saiprasad.vercel.app/projects" target="_blank">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer text-gray-800 dark:text-white transform hover:-translate-y-1 duration-200 text-center">
            <h3 className="text-xl font-bold mb-2">QuizCoder</h3>
            <p className="text-gray-600 dark:text-gray-300">Interactive quiz platform for learning programming languages.</p>
          </div>
        </Link>

        <Link href="https://portfolio-saiprasad.vercel.app/projects" target="_blank">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer text-gray-800 dark:text-white transform hover:-translate-y-1 duration-200 text-center">
            <h3 className="text-xl font-bold mb-2">Other Project</h3>
            <p className="text-gray-600 dark:text-gray-300">Another project demonstrating full-stack web development skills.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
