"use client";

import Link from "next/link";
import { Button } from "./ui/button";

const Appbar = () => {
  return (
    <header className="h-[60px] w-full flex items-center justify-center">
      <div className="flex items-center justify-between max-w-[900px] w-full h-full px-4">
        <Link href="/">
          <div>(임시) 데일리 JLPT</div>
        </Link>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" size="sm" className="rounded-full">
            후원하기
          </Button>
          <Button size="lg" className="rounded-full font-bold">
            무료 구독하기
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Appbar;
