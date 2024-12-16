"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import n5Words from "@/public/words/n5.json";

interface Word {
  word: string;
  meaning: string;
  furigana: string;
  romaji: string;
  level: number;
}

export default function WordPage() {
  const params = useParams();
  const [word, setWord] = useState<Word | null>(null);

  useEffect(() => {
    const wordId = Number(params.wordId);
    const foundWord = n5Words[wordId];
    setWord(foundWord);
  }, [params.wordId]);

  if (!word) {
    return <div className="h-full" />;
  }
  return (
    <div className="max-w-[900px] mt-12">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-9xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {word.word}
          </h1>
          {word.furigana && (
            <p className="text-2xl text-gray-500 font-medium tracking-wider">
              {word.furigana}
            </p>
          )}
        </div>

        <div className="grid gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mr-2">
                의미
              </span>
            </h2>
            <p className="text-3xl font-medium text-gray-800">{word.meaning}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm mr-2">
                로마자
              </span>
            </h2>
            <p className="text-2xl font-medium text-gray-800">{word.romaji}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mr-2">
                JLPT 레벨
              </span>
            </h2>
            <p className="text-2xl font-medium text-gray-800">N{word.level}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
