"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/src/types/movie";
import { Search, AlertCircle } from "lucide-react";

export default function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    setSearch(value);
    if (!value.trim()) {
      setResults([]);
      setError(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    const trimmed = search.trim();
    if (!trimmed) {
      return;
    }

    // Debounce search to prevent excessive API requests
    const timer = setTimeout(() => {
      let isSubscribed = true;
      setLoading(true);
      setError(null);

      fetch(`/api/movies/search?query=${encodeURIComponent(trimmed)}`)
        .then(async (res) => {
          if (!res.ok) {
            let errorMsg = `Search failed (${res.status})`;
            try {
              const data = await res.json();
              if (data.error) errorMsg = data.error;
            } catch {
              // Ignore JSON parse error on bad status
            }
            throw new Error(errorMsg);
          }
          return res.json();
        })
        .then((data) => {
          if (isSubscribed) {
            setResults(Array.isArray(data.results) ? data.results : []);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (isSubscribed) {
            console.error("Failed to search movies:", err);
            setError(err instanceof Error ? err.message : "Failed to search movies.");
            setLoading(false);
          }
        });

      return () => {
        isSubscribed = false;
      };
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const activeResults = search.trim() ? results : [];

  return (
    <div className="w-full p-6">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-white text-2xl font-extrabold mb-4 flex items-center gap-2">
          <Search size={24} />
          Search Movies
        </h2>

        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          maxLength={100}
          onChange={(e) => handleInputChange(e.target.value)}
          aria-label="Search for movies"
          className="w-full md:w-[60%] rounded-2xl p-3 text-white bg-transparent
                   border-4 border-[#00E5FF] outline-none focus:border-[#8E24AA]
                   placeholder-gray-400 transition-colors"
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00E5FF]"></div>
          <span className="text-gray-400 ml-3">Searching...</span>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center mt-8 text-red-400">
          <AlertCircle size={20} className="mr-2" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {activeResults.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className="cursor-pointer hover:scale-105 transition-transform duration-200">
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/image/Logo.png"
                }
                alt={movie.title || "Movie poster"}
                width={200}
                height={300}
                className="rounded-xl"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <h3 className="text-white text-sm mt-2 font-bold truncate">
                {movie.title}
              </h3>
              <span className="text-gray-400 text-xs">
                {movie.release_date?.split("-")[0] || "N/A"}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {search.trim() !== "" && activeResults.length === 0 && !loading && !error && (
        <div className="flex flex-col items-center mt-6 text-gray-400">
          <p className="text-lg">No movies found 🎬</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      )}

      {search.trim() === "" && (
        <div className="flex flex-col items-center mt-6 text-gray-500">
          <Search size={48} className="mb-3 opacity-50" />
          <p>Enter a movie title to search</p>
        </div>
      )}
    </div>
  );
}
