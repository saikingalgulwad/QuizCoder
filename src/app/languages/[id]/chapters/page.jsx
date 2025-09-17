"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ChaptersPage() {
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/languages/chapter?languageId=${id}`)
      .then((res) => res.json())
      .then((data) => setChapters(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mb-4 mx-auto"></div>
          <p className="text-lg font-semibold">Loading chapters...</p>
        </div>
      </div>
    );
  }

  if (!chapters.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">No chapters found</h2>
          <p className="text-gray-600">This language has no chapters yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-yellow-400 mb-8">
        Chapters
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {chapters.map((ch) => (
          <Link key={ch.id} href={`/chapters/${ch.id}/quiz`}>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer text-center font-bold text-gray-800 dark:text-white transform hover:-translate-y-1 duration-200">
              {ch.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
