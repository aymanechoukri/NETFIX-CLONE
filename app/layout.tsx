import type { Metadata, Viewport } from "next";
import Header from "@/src/Components/Header";
import Footer from "@/src/Components/Footer";
import "./globals.css";
import ListProvider from "@/src/Context/ListProvider";

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://netfix-clone-two.vercel.app"),
  title: "Stream Flex — Movie Discovery Platform",
  description:
    "Stream Flex is an open-source educational movie discovery platform powered by the TMDB API. Browse trending, popular, and top-rated movies.",
  applicationName: "Stream Flex",
  authors: [{ name: "Aymane Choukri" }],
  keywords: ["movies", "movie discovery", "TMDB", "cinema", "portfolio", "Stream Flex"],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/image/Logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://netfix-clone-two.vercel.app/",
    siteName: "Stream Flex",
    title: "Stream Flex — Movie Discovery Platform",
    description:
      "Explore trending, popular, and top-rated movies with real-time data from TMDB. An educational portfolio project.",
    images: [
      {
        url: "/image/Logo.png",
        width: 500,
        height: 500,
        alt: "Stream Flex Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-0 m-0 bg-[#121212] min-h-screen flex flex-col justify-between">
        <ListProvider>
          <div className="flex-1">
            <Header />
            {children}
          </div>
          <Footer />
        </ListProvider>
      </body>
    </html>
  );
}
