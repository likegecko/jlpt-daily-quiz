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
      <body className="antialiased overflow-scroll">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Appbar />
          <main className="flex flex-col flex-1 w-full max-w-[900px] px-4">
            <div className="flex-1">{children}</div>
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
