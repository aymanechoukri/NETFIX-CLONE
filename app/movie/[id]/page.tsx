import { API_KEY, BASURL } from "@/src/Api/Api";
import WatchButton from "@/src/Button";
import FavoriteBtn from "@/src/FavoriteBtn";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Moviepage({ params }: Props) {
  const { id } = await params;
  const res = await fetch(
    `${BASURL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
    { cache: "no-store" },
  );

  const movie = await res.json();
  return (
    <section className="p-0 m-0 overflow-hidden">
      <div
        key={movie.id}
        className="md:flex space-x-5 p-4 justify-center md:w-[95%]  mx-auto"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={250}
          height={400}
          className="rounded-xl shadow-lg shadow-[#a2226f41]"
        />
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-white mt-5">
            {movie.title}
          </h2>
          <p className="font-bold text-sm text-gray-200">{movie.overview}</p>
          <span className="text-gray-300">
            The time of publication: <i>{movie.release_date}</i>
          </span>
          <div className="flex justify-center items-end w-full mt-30 gap-2">
            <WatchButton />
            <FavoriteBtn
              movie={{
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
