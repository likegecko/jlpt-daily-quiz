import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily JLPT",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="flex justify-center h-screen">
          <main className="h-full bg-red-100 w-full max-w-[900px] px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
