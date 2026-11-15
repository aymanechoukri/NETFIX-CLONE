import Link from "next/link";
import { ShieldCheck, Film } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-gray-800/80 bg-[#0d0d0d] text-gray-400 py-10">
      <div className="w-[90%] md:w-[85%] mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <Film className="text-[#00E5FF]" size={24} />
            <span className="text-white font-extrabold text-xl tracking-wide bg-gradient-to-r from-[#A2226E] to-[#00E5FF] bg-clip-text text-transparent">
              Stream Flex
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-[#00E5FF] border border-cyan-800 font-medium">
              Educational Demo
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/list" className="hover:text-white transition-colors">
              My List
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/search" className="hover:text-white transition-colors">
              Search
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800/60 pt-6 space-y-3 text-xs leading-relaxed text-gray-400">
          <p>
            <strong className="text-gray-300">Disclaimer & Attribution:</strong> Stream Flex is an open-source educational portfolio demonstration. This project is <strong>not affiliated with, endorsed by, or sponsored by Netflix, Inc.</strong> or any streaming provider. All trademarks, titles, and posters belong to their respective copyright owners.
          </p>
          <p>
            Movie data and media metadata are provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00E5FF] hover:underline"
            >
              The Movie Database (TMDB)
            </a>
            . This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-gray-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-green-400" />
              <span>Safe Browsing Verified: No user data, passwords, or payment details are collected.</span>
            </div>
          </div>
        </div>

        <div className="pt-4 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Stream Flex — Educational Portfolio Project.
        </div>
      </div>
    </footer>
  );
}
