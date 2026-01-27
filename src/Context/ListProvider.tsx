"use client";

import { useEffect, useState, useCallback } from "react";
import { ListContext } from "./ListContext";
import { Movie } from "@/src/types/movie";

interface Props {
  children: React.ReactNode;
}

export default function ListProvider({ children }: Props) {
  const [list, setList] = useState<Movie[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on client-side only
  useEffect(() => {
    const saved = localStorage.getItem("favorite");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setList(parsed);
        }
      } catch (err) {
        console.error("Failed to parse favorites from localStorage:", err);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever list changes
  useEffect(() => {
    if (isInitialized) {
      if (list.length > 0) {
        localStorage.setItem("favorite", JSON.stringify(list));
      } else {
        localStorage.removeItem("favorite");
      }
    }
  }, [list, isInitialized]);

  // Helper function to remove a movie
  const removeMovie = useCallback((id: number) => {
    setList((prev) => prev.filter((movie) => movie.id !== id));
  }, []);

  // Helper function to add a movie
  const addMovie = useCallback((movie: Movie) => {
    setList((prev) => {
      // Prevent duplicates
      if (prev.some((m) => m.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  }, []);

  // Helper function to check if movie is in favorites
  const isFavorite = useCallback(
    (id: number) => {
      return list.some((movie) => movie.id === id);
    },
    [list]
  );

  return (
    <ListContext.Provider value={{ list, setList, removeMovie, addMovie, isFavorite }}>
      {children}
    </ListContext.Provider>
  );
}

// Re-export Movie type for backward compatibility
export type { Movie as Movie };

