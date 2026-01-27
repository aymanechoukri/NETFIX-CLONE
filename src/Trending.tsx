"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchFromTMDB } from "./Api/Api";
import Image from "next/image";
import Link from "next/link";
import { Compass, RefreshCw } from "lucide-react";
import { Movie } from "@/src/types/movie";

export default function Trending() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchMovies = useCallback(async (isRetry = false) => {
    try {
      if (!isRetry) {
        setLoading(true);
        setError(null);
      }
      
      const data = await fetchFromTMDB('/trending/movie/week');
      setMovies(data.results || []);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load trending movies";
      console.error("Failed to fetch trending movies:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <section className="p-0 m-0 w-full">
        <h2 className="text-2xl ml-20 mb-5 text-white font-extrabold flex items-center gap-2">
          <span>
            <Compass size={24} className="text-white" />
          </span>{" "}
          <i>Trending Now</i>
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
            <Compass size={24} className="text-white" />
          </span>{" "}
          <i>Trending Now</i>
        </h2>
        <div className="flex flex-col justify-center items-center w-full py-10 gap-4">
          <p className="text-red-400 text-center">{error}</p>
          <button 
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-[#A2226E] text-white rounded-lg hover:bg-[#8a1d5e] transition-colors"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="p-0 m-0 w-full">
      <h2 className="text-2xl ml-20 mb-5 text-white font-extrabold flex items-center gap-2">
        <span>
          <Compass size={24} className="text-white" />
        </span>{" "}
        <i>Trending Now</i>
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

