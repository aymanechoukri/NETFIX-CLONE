"use client";
import Trending from "@/src/Trending";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const Movie = [
    { img: "/image/movie1.png" },
    { img: "/image/movie2.jpg" },
    { img: "/image/movie3.jpg" },
    { img: "/image/movie4.jpg" },
    { img: "/image/movie5.jpg" },
    { img: "/image/movie6.jpg" },
  ];
  return (
    <main className="w-full p-0 m-0">
      <h1 className="text-white text-3xl font-bold text-center mt-10 mb-10">
        Welcome to the Stream Flex
      </h1>
      <div className="overflow-hidden bg-[#1212129a] z-50 mask-t-from-50% mask-b-from-20% mask-b-to-80%">
        <motion.div
          className="flex justify-center items-center gap-3 w-max overflow-hidden z-50"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          }}
        >
          {[...Movie, ...Movie].map((m, index) => (
            <div key={index}>
              <Image
                src={m.img}
                alt="Movie"
                width={200}
                height={200}
                className="object-center mask-t-from-50% mask-b-from-20% mask-b-to-80% w-auto"
              />
            </div>
          ))}
        </motion.div>
        <div className="absolute z-50 left-0 top-100 shadow-[0_0_300px_200px_rgba(255,255,255,0.7)] rounded-2xl"></div>
        <div className="absolute z-50 right-0 top-100 shadow-[0_0_300px_200px_rgba(255,255,255,0.7)] rounded-2xl"></div>
      </div>
        <Trending />
    </main>
  );
}
