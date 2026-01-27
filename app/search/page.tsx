"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_KEY, BASURL } from "@/src/Api/Api";
import { Movie } from "@/src/types/movie";
import { Search, AlertCircle } from "lucide-react";

export default function SearchPage() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Debounce search to avoid too many API calls
    const timer = setTimeout(() => {
      if (search.trim() === "") {
        setResults([]);
        setError(null);
        return;
      }

      const fetchMovies = async () => {
        setLoading(true);
        setError(null);

        try {
          const res = await fetch(
            `${BASURL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}`
          );

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          setResults(data.results || []);
        } catch (err) {
          console.error("Failed to search movies:", err);
          setError("Failed to search movies. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [search]);

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
          onChange={(e) => setSearch(e.target.value)}
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
        {results.map((movie) => (
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

      {search && results.length === 0 && !loading && !error && (
        <div className="flex flex-col items-center mt-6 text-gray-400">
          <p className="text-lg">No movies found 🎬</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      )}

      {!search && (
        <div className="flex flex-col items-center mt-6 text-gray-500">
          <Search size={48} className="mb-3 opacity-50" />
          <p>Enter a movie title to search</p>
        </div>
      )}
    </div>
  );
}

