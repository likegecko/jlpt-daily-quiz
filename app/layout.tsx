import type { Metadata } from "next";
import "./globals.css";
import Appbar from "@/components/Appbar";

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
          <main className="flex flex-col h-full border w-full max-w-[900px] px-4">
            <Appbar />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
