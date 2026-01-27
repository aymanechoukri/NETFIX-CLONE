"use client";
import { createContext, useContext } from "react";
import { Movie } from "@/src/types/movie";

interface ListContextType {
  list: Movie[];
  setList: React.Dispatch<React.SetStateAction<Movie[]>>;
  removeMovie: (id: number) => void;
  addMovie: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
}

export const ListContext = createContext<ListContextType | null>(null);

export const useList = () => {
  const context = useContext(ListContext);

  if (!context) {
    throw new Error("useList must be used inside ListProvider");
  }

  return context;
};

