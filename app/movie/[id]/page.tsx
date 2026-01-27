import { Suspense } from "react";
import { API_KEY, BASURL } from "@/src/Api/Api";
import WatchButton from "@/src/Button";
import FavoriteButton from "@/src/FavoriteBtn";
import Image from "next/image";
import { Movie } from "@/src/types/movie";

interface Props {
  params: Promise<{ id: string }>;
}

// Movie loading skeleton component
function MovieSkeleton() {
  return (
    <section className="p-0 m-0 overflow-hidden">
      <div className="md:flex space-x-5 p-4 justify-center md:w-[95%] mx-auto">
        <div className="w-[250px] h-[400px] bg-gray-700 rounded-xl animate-pulse"></div>
        <div className="space-y-4 flex-1">
          <div className="h-8 bg-gray-700 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
          <div className="flex gap-2 mt-12">
            <div className="w-24 h-10 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-24 h-10 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Error display component
function ErrorDisplay({ message }: { message: string }) {
  return (
    <section className="p-0 m-0 overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-extrabold text-red-500 mb-4">Error Loading Movie</h2>
        <p className="text-gray-400">{message}</p>
      </div>
    </section>
  );
}

// Movie content component
async function MovieContent({ id }: { id: string }) {
  const res = await fetch(
    `${BASURL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const errorMessage = res.status === 404
      ? "Movie not found"
      : `Failed to fetch movie (status: ${res.status})`;
    return <ErrorDisplay message={errorMessage} />;
  }

  const movie: Movie = await res.json();

  // Validate required fields
  if (!movie.id || !movie.title) {
    return <ErrorDisplay message="Invalid movie data received" />;
  }

  return (
    <section className="p-0 m-0 overflow-hidden">
      <div
        key={movie.id}
        className="md:flex space-x-5 p-4 justify-center md:w-[95%] mx-auto"
      >
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/image/Logo.png"
          }
          alt={movie.title || "Movie poster"}
          width={250}
          height={400}
          className="rounded-xl shadow-lg shadow-[#a2226f41]"
          priority
          sizes="(max-width: 768px) 100vw, 250px"
        />
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-white mt-5">
            {movie.title}
          </h2>
          {movie.overview && (
            <p className="font-bold text-sm text-gray-200">{movie.overview}</p>
          )}
          <span className="text-gray-300">
            Release Date: <i>{movie.release_date || "N/A"}</i>
          </span>
          <div className="flex justify-center items-end w-full mt-30 gap-2">
            <WatchButton />
            <FavoriteButton
              movie={{
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path || "",
                release_date: movie.release_date || "",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<MovieSkeleton />}>
      <MovieContent id={id} />
    </Suspense>
  );
}

