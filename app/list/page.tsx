"use client";
import { useList } from "@/src/Context/ListContext";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function List() {
  const { list, setList } = useList();

function removeList(id: number) {
  setList(prev => prev.filter(u => String(u.id) !== String(id)));
}


  return (
    <div className="w-[95%] mx-auto flex md:justify-start gap-4 overflow-x-auto no-scrollbar">
      {list.length === 0 ? (
        <div className="w-full text-center text-gray-400 mt-40">
          <h1 className="text-2xl font-bold">No movies in your list</h1>
          <p className="mt-2 text-sm">
            Start exploring and add movies to your favorites
          </p>
        </div>
      ) : (
        list.map((u) => (
          <Link href={`/movie/${u.id}`} key={u.id}>
            <div className="w-[200px] z-40">
              <Image
                src={`https://image.tmdb.org/t/p/w500${u.poster_path}`}
                alt={u.title}
                width={200}
                height={100}
                className="rounded-xl object-cover shadow-lg shadow-[#a2226f41] hover:animate-pulse"
              />
              <Trash2
                onClick={(e) => {
                  e.preventDefault(); // prevent link navigation
                  e.stopPropagation(); // stop bubble
                  removeList(u.id);
                }}
                className="relative top-[-40px] left-2 bg-black p-2 rounded-full text-white z-50 active:scale-95 hover:text-red-600"
                size={30}
              />
              <div className="px-3 space-y-1">
                <h2 className="font-extrabold text-white">{u.title}</h2>
                <span className="font-medium text-gray-300 text-sm">
                  {u.release_date}
                </span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
