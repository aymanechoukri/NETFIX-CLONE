"use client";

export default function Button() {
  return (
      <button
        onClick={() => alert("Just Netflix clone")}
        className="bg-white/30 px-5 py-2 rounded-lg backdrop-blur-lg active:scale-95 transition duration-300 cursor-pointer font-extrabold"
      >
        Watch Now
      </button>
  );
}
