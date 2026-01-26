import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-5 left-0 -inset-2 bg-linear-to-r from-[#a2226f41] to-[#4fc2f760] backdrop-blur-md rounded-4xl w-[95%] mx-auto mt-3.5 shadow-[0_0_90px_rgb(162,34,110,0.5)] z-50 overflow-hidden mb-10">
      <nav className="flex justify-between items-center mx-5">
        <div className="flex  justify-center items-center space-x-2">
          <Image
            src="/image/Logo.png"
            alt="Movie poster for Interstellar"
            width={120}
            height={40}
            className="h-20 w-25"
            priority
          />
          <ul className="flex justify-center items-center space-x-1 w-[80%]">
            <Link href={"/"}>
            <li className="font-extrabold p-1 px-5 hover:bg-white/10 hover:backdrop-blur-2xl rounded-3xl active:scale-95 transition-all duration-75">
              Home
            </li>
            </Link>
            <Link href={"/list"}>
            <li className="font-extrabold p-1 px-5 hover:bg-white/10 hover:backdrop-blur-2xl rounded-3xl active:scale-95 transition-all duration-75">
              My List
            </li>
            </Link>
            <li className="font-extrabold p-1 px-5 hover:bg-white/10 hover:backdrop-blur-2xl rounded-3xl active:scale-95 transition-all duration-75">
              About us
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
