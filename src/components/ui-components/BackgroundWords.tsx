import { useEffect, useState } from 'react';

const bookWords = [
  "Literature", "Fiction", "Non-fiction", "Author", "Genre", "Fantasy", 
  "Novel", "Narrative", "Protagonist", "Plot", "Chapter", "Page", 
  "Publishing", "Manuscript", "Editor", "Storyline", "Biography", "Mystery"
];

const generateRandomPosition = () => {
  const top = Math.random() * 90; // Top percentage (to avoid going beyond the screen)
  const left = Math.random() * 90; // Left percentage (to avoid going beyond the screen)
  return { top: `${top}%`, left: `${left}%` };
};

const generateRandomRotation = () => {
  const rotation = Math.random() * 360; // Random rotation angle
  return rotation; // Return only the angle as a number
};

interface WordData {
  word: string;
  position: { top: string; left: string };
  rotation: number; // Store rotation as a number to animate it
  opacity: number; // Add opacity to control fading effect
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
        rotation: generateRandomRotation(), // Set random rotation
        opacity: 1,
      };

      setWords((prevWords) => [...prevWords, newWordData]);

      // Limit the number of words on screen
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
    <div className="absolute inset-0 z-[-1] bg-opacity-20 bg-red-200 blur-[2px] pointer-events-none">
      {words.map((wordData, index) => (
        <span
          key={index}
          className="absolute lg:text-3xl font-bold text-gray-400 transition-opacity duration-300 ease-in-out"
          style={{
            top: wordData.position.top,
            left: wordData.position.left,
            opacity: wordData.opacity,
            // animation: `swing ${3 + Math.random() * 2}s ease-in-out infinite`, // Random swing duration
            transform: `rotate(${wordData.rotation}deg)`, // Start at the initial rotation angle
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
