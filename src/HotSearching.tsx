"use client";

import { useEffect, useState } from "react";
import { API_KEY, BASURL } from "./Api/Api";
import Link from "next/link";
import Image from "next/image";
import { FireExtinguisherIcon } from "lucide-react";
import { Movie } from "@/src/types/movie";

export default function HotSearching() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `${BASURL}/movie/popular?api_key=${API_KEY}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Failed to fetch popular movies:", err);
        setError("Failed to load popular movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <section className="p-0 m-0 w-full">
        <h2 className="text-2xl ml-20 mb-5 text-white font-extrabold flex items-center gap-2">
          <span>
            <FireExtinguisherIcon size={18} />
          </span>{" "}
          <i>Hot Searching</i>
        </h2>
        <div className="flex justify-start w-[95%] gap-5 mx-auto overflow-x-auto no-scrollbar">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-[200px] space-y-5 animate-pulse">
              <div className="w-[200px] h-[300px] bg-gray-700 rounded-xl"></div>
              <div className="px-3 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-0 m-0 w-full">
        <h2 className="text-2xl ml-20 mb-5 text-white font-extrabold flex items-center gap-2">
          <span>
            <FireExtinguisherIcon size={18} />
          </span>{" "}
          <i>Hot Searching</i>
        </h2>
        <div className="flex justify-center items-center w-full py-10">
          <p className="text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-0 m-0 w-full">
      <h2 className="text-2xl ml-20 mb-5 text-white font-extrabold flex items-center gap-2">
        <span>
          <FireExtinguisherIcon size={18} />
        </span>{" "}
        <i>Hot Searching</i>
      </h2>
      <div className="flex justify-start w-[95%] gap-5 mx-auto overflow-x-auto no-scrollbar">
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className="w-[200px] space-y-5 z-40 shrink-0">
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/image/Logo.png"
                }
                alt={movie.title || "Movie poster"}
                width={200}
                height={300}
                className="rounded-xl object-cover shadow-lg shadow-[#a2226f41] hover:animate-pulse"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="px-3 space-y-1">
                <h2 className="font-extrabold text-white truncate">
                  {movie.title}
                </h2>
                <span className="font-medium text-gray-300 text-sm">
                  {movie.release_date?.split("-")[0] || "N/A"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="fixed left-1/2 top-1/2 translate-x-1/2 shadow-[0_0_300px_200px_rgba(255,255,255,0.4)] rounded-full z-[-9999]"></div>
    </section>
  );
}

