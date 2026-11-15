import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Stream Flex",
  description: "Learn more about Stream Flex, an educational movie discovery platform.",
};

export default function AboutUs() {
  return (
    <section className="w-[90%] md:w-[80%] mx-auto py-14 text-gray-200">
      <h1 className="text-4xl font-extrabold text-white mb-8">
        About Stream Flex
      </h1>

      <p className="text-lg leading-relaxed mb-6">
        Welcome to Stream Flex — an open-source movie discovery platform created for movie enthusiasts.
        We believe that films are more than just entertainment; they are stories,
        emotions, and experiences that connect people across the world.
      </p>

      <p className="text-lg leading-relaxed mb-6">
        Our goal is to provide a smooth and immersive experience where users can
        discover trending movies, explore detailed information about each film,
        and keep track of their favorite titles in one personal list.
        Everything is designed to be simple, fast, and visually engaging.
      </p>

      <p className="text-lg leading-relaxed mb-6">
        This platform is inspired by modern streaming services and focuses on
        delivering a clean user interface, powerful performance, and real-time
        movie data. By using the TMDB API, we ensure that movie information stays
        accurate and up to date.
      </p>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 my-8 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Educational Purpose & Non-Affiliation Notice
        </h2>
        <p className="text-sm leading-relaxed text-gray-300">
          Stream Flex is an independent educational student portfolio demonstration.
          <strong> It is not affiliated with, endorsed by, sponsored by, or associated with Netflix, Inc.</strong>
          This application does not host, stream, or distribute copyrighted video content, nor does it provide
          access to paid streaming catalogs.
        </p>
        <p className="text-sm leading-relaxed text-gray-300">
          <strong>Security & Privacy:</strong> Stream Flex does NOT collect, store, or solicit passwords,
          credit card information, emails, or personal identification. Favorites are stored solely within
          your local browser storage (<code className="text-[#00E5FF]">localStorage</code>) on your own device.
        </p>
        <p className="text-sm leading-relaxed text-gray-400">
          Movie metadata and poster images are provided via the TMDB API under TMDB terms of service.
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>

      <p className="text-lg leading-relaxed text-gray-400">
        Built with passion for cinema and powered by modern web technologies
        such as Next.js 16, React 19, and TypeScript.
      </p>
    </section>
  );
}
