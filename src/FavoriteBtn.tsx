"use client";
import { Heart } from "lucide-react";
import { useList } from "./Context/ListContext";
import { Movie } from "./Trending";

interface Props {
  movie: Movie;
}

export default function Button({movie} : Props) {
const { setList } = useList()

function addFavorite() {
  setList(priv => [...priv, movie])
}

  return (
    <button
    onClick={addFavorite}
      className="bg-white/30 px-5 py-2 rounded-lg backdrop-blur-lg active:scale-95 transition duration-300 cursor-pointer font-extrabold flex justify-center items-center gap-2"
    >
      <span>
        <Heart className="inline text-red-500" size={20} />
      </span>
      Favorite
    </button>
  );
}
