import Header from "@/src/Components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-0 m-0 bg-[#121212]">
        <Header />
        {children}
      </body>
    </html>
  );
}
