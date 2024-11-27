import { useEffect, useState } from "react";

const bookWords = [
  "Literature",
  "Fiction",
  "Non-fiction",
  "Author",
  "Genre",
  "Fantasy",
  "Novel",
  "Narrative",
  "Protagonist",
  "Plot",
  "Chapter",
  "Page",
  "Publishing",
  "Manuscript",
  "Editor",
  "Storyline",
  "Biography",
  "Mystery",
];

const generateRandomPosition = () => {
  const top = Math.random() * 90;
  const left = Math.random() * 90;
  return { top: `${top}%`, left: `${left}%` };
};

const generateRandomRotation = () => {
  const rotation = Math.random() * 360;
  return rotation;
};

interface WordData {
  word: string;
  position: { top: string; left: string };
  rotation: number;
  opacity: number;
}

const BackgroundWords = () => {
  const [words, setWords] = useState<WordData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomWord =
        bookWords[Math.floor(Math.random() * bookWords.length)]!;

      const newWordData: WordData = {
        word: randomWord,
        position: generateRandomPosition(),
        rotation: generateRandomRotation(),
        opacity: 1,
      };

      setWords((prevWords) => [...prevWords, newWordData]);

      if (words.length > bookWords.length) {
        setTimeout(() => {
          setWords((currentWords) => {
            if (currentWords.length > bookWords.length) {
              return currentWords.slice(1).map((word, index) => ({
                ...word,
                opacity: index === 0 ? 0 : word.opacity,
              }));
            }
            return currentWords;
          });
        }, 500);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[-1] bg-red-200 bg-opacity-20 blur-[2px]">
      {words.map((wordData, index) => (
        <span
          key={index}
          className="absolute font-bold text-gray-400 transition-opacity duration-300 ease-in-out lg:text-3xl"
          style={{
            top: wordData.position.top,
            left: wordData.position.left,
            opacity: wordData.opacity,
            // animation: `swing ${3 + Math.random() * 2}s ease-in-out infinite`,
            transform: `rotate(${wordData.rotation}deg)`,
            transition: "opacity 1s ease",
          }}
        >
          {wordData.word}
        </span>
      ))}
    </div>
  );
};

export default BackgroundWords;
