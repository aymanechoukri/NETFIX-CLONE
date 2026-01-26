"use client";
import { createContext, useContext } from "react";
import { Movie } from "../Trending";

interface ListContextType {
  list: Movie[];
  setList: React.Dispatch<React.SetStateAction<Movie[]>>;
}


export const ListContext = createContext<ListContextType | null>(null);

export const useList = () => {
  const context = useContext(ListContext);

  if (!context) {
    throw new Error("useList must be used inside ListProvider");
  }

  return context;
};