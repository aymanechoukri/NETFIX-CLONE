"use client";
import { useList } from "@/src/Context/ListContext";
import Image from "next/image";
import Link from "next/link";

export default function List() {
  const { list } = useList();
  console.log(list);
  return (
    <div className="w-[95%] mx-auto flex justify-start gap-4">
      {list.map((u) => (
          <Link href={`/movie/${u.id}`} key={u.id}>
            <div className="w-[200px] space-y-5 z-40">
              <Image
                src={`https://image.tmdb.org/t/p/w500${u.poster_path}`}
                alt={u.title}
                width={200}
                height={100}
                className="rounded-xl object-cover shadow-lg shadow-[#a2226f41] hover:animate-pulse"
              />
              <div className="px-3 space-y-1">
                <h2 className="font-extrabold text-white">{u.title}</h2>
                <span className="font-medium text-gray-300 text-sm">
                  {u.release_date}
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
