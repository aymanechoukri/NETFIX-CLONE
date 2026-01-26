"use client";

import { useEffect, useState } from "react";
import { ListContext } from "./ListContext";
import { Movie } from "../Trending";

interface Props {
  children: React.ReactNode;
}

export default function ListProvider({ children }: Props) {
  const [list, setList] = useState<Movie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorite");
    if (saved) setList(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      localStorage.setItem("favorite", JSON.stringify(list));
    } else {
      localStorage.removeItem("favorite");
    }
  }, [list]);

  return (
    <ListContext.Provider value={{ list, setList }}>
      {children}
    </ListContext.Provider>
  );
}
