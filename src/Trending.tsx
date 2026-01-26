import { useEffect, useState } from "react";
import { API_KEY, BASURL } from "./Api/Api";
import Image from "next/image";
import Link from "next/link";
import { Compass } from "lucide-react";

export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  release_date: string;
}

export default function Trending() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    fetch(`${BASURL}/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="p-0 m-0 w-full">
      <h2 className="text-2xl ml-20 mb-5 text-white font-extrabold flex items-center gap-2 ">
        <span>
          <Compass size={24} className="text-white" />
        </span>{" "}
        <i>Trending Now</i>
      </h2>
      <div className="flex justify-start  w-[95%] gap-5 space-y-5 mx-auto overflow-x-auto no-scrollbar">
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className="w-[200px] space-y-5 z-40">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={100}
                className="rounded-xl object-cover shadow-lg shadow-[#a2226f41] hover:animate-pulse"
              />
              <div className="px-3 space-y-1">
                <h2 className="font-extrabold text-white">{movie.title}</h2>
                <span className="font-medium text-gray-300 text-sm">
                  {movie.release_date}
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
