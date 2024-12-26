import fs from "fs/promises";
import path from "path";

interface Word {
  word: string;
  meaning: string;
  furigana: string;
  romaji: string;
  level: number;
}

export async function getRandomWords(
  level: string,
  count: number
): Promise<Word[]> {
  const filePath = path.join(process.cwd(), "public", "words", `${level}.json`);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const words: Word[] = JSON.parse(fileContent);

  return words.sort(() => 0.5 - Math.random()).slice(0, count);
}

export async function generateQuizByLevels(
  categories: Record<string, boolean>,
  totalCount: number
): Promise<Word[]> {
  const selectedLevels = Object.entries(categories)
    .filter(([, isSelected]) => isSelected)
    .map(([level]) => level.toLowerCase());

  if (selectedLevels.length === 0) {
    throw new Error("No JLPT levels selected");
  }

  const wordsPerLevel = Math.ceil(totalCount / selectedLevels.length);
  const allWords: Word[] = [];

  for (const level of selectedLevels) {
    const words = await getRandomWords(level, wordsPerLevel);
    allWords.push(...words);
  }

  return allWords.sort(() => 0.5 - Math.random()).slice(0, totalCount);
}
