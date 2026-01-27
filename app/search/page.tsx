"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_KEY, BASURL } from "@/src/Api/Api";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      const res = await fetch(
        `${BASURL}/search/movie?api_key=${API_KEY}&query=${search}`,
      );
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    };

    const timer = setTimeout(fetchMovies, 500); // debounce

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="w-full p-6">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-white text-2xl font-extrabold mb-4">
          Search Movies
        </h2>

        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[60%] rounded-2xl p-3 text-white bg-transparent
                   border-4 border-[#00E5FF] outline-none focus:border-[#8E24AA]"
        />
      </div>

      {loading && <p className="text-gray-400 mt-4">Searching...</p>}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {results.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className="cursor-pointer hover:scale-105 transition">
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/no-image.png"
                }
                alt={movie.title}
                width={200}
                height={300}
                className="rounded-xl"
              />
              <h3 className="text-white text-sm mt-2 font-bold">
                {movie.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {search && results.length === 0 && !loading && (
        <p className="text-gray-400 mt-6">No movies found 🎬</p>
      )}
    </div>
  );
}
