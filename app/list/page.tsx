"use client";
import { useList } from "@/src/Context/ListContext";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/src/types/movie";

export default function List() {
  const { list, removeMovie } = useList();

  if (!list || list.length === 0) {
    return (
      <div className="w-full text-center text-gray-400 mt-40">
        <h1 className="text-2xl font-bold">No movies in your list</h1>
        <p className="mt-2 text-sm">
          Start exploring and add movies to your favorites
        </p>
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto flex md:justify-start gap-4 overflow-x-auto no-scrollbar">
      {list.map((movie: Movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <div className="w-[200px] z-40 shrink-0">
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
              sizes="(max-width: 768px) 50vw, 200px"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeMovie(movie.id);
              }}
              aria-label={`Remove ${movie.title} from favorites`}
              className="relative top-[-40px] left-2 bg-black p-2 rounded-full text-white z-50 active:scale-95 hover:text-red-600 transition-colors"
            >
              <Trash2 size={30} />
            </button>
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
  );
}

