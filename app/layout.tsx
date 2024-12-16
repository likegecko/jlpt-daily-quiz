import type { Metadata } from "next";
import "./globals.css";
import Appbar from "@/components/Appbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

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
        <div className="flex flex-col items-center justify-center h-screen">
          <main className="flex flex-col h-full w-full max-w-[900px] px-4">
            <Appbar />
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
