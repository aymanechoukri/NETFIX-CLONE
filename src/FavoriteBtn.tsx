"use client";
import { Heart } from "lucide-react";
import { useList } from "./Context/ListContext";
import { Movie } from "./types/movie";

interface FavoriteButtonProps {
  movie: Movie;
}

export default function FavoriteButton({ movie }: FavoriteButtonProps) {
  const { addMovie, removeMovie, isFavorite } = useList();
  const isInFavorites = isFavorite(movie.id);

  const toggleFavorite = () => {
    if (isInFavorites) {
      removeMovie(movie.id);
    } else {
      addMovie(movie);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      aria-label={isInFavorites ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
      className="bg-white/30 px-5 py-2 rounded-lg backdrop-blur-lg active:scale-95 transition duration-300 cursor-pointer font-extrabold flex justify-center items-center gap-2"
    >
      <span>
        <Heart
          className="inline text-red-500"
          size={20}
          fill={isInFavorites ? "currentColor" : "none"}
        />
      </span>
      {isInFavorites ? "Remove" : "Favorite"}
    </button>
  );
}

