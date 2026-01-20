"use client";

import { Heart } from "lucide-react";

export default function Button() {
  return (
      <button
        onClick={() => alert("Just Netflix clone")}
        className="bg-white/30 px-5 py-2 rounded-lg backdrop-blur-lg active:scale-95 transition duration-300 cursor-pointer font-extrabold flex justify-center items-center gap-2"
      >
        <span><Heart className="inline text-red-500" size={20} /></span>
        Favorite
      </button>
  );
}