import Image from "next/image";
import { useEffect, useState } from "react";

const bookImages = [
  "/images/bookicon.png",
  "/images/bookicon.png",
  "/images/bookicon.png",
  "/images/bookicon.png",
  "/images/bookicon.png",
  "/images/bookicon.png",
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

interface ImageData {
  src: string;
  position: { top: string; left: string };
  rotation: number;
  opacity: number;
}

const BackgroundImages = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomImage =
        bookImages[Math.floor(Math.random() * bookImages.length)]!;

      const newImageData: ImageData = {
        src: randomImage,
        position: generateRandomPosition(),
        rotation: generateRandomRotation(),
        opacity: 1,
      };

      setImages((prevImages) => [...prevImages, newImageData]);

      // Limit the number of images on screen
      if (images.length > bookImages.length) {
        setTimeout(() => {
          setImages((currentImages) => {
            if (currentImages.length > bookImages.length) {
              return currentImages.slice(1).map((image, index) => ({
                ...image,
                opacity: index === 0 ? 0 : image.opacity,
              }));
            }
            return currentImages;
          });
        }, 500);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[-1] bg-red-200 bg-opacity-20 blur-[2px]">
      {images.map((imageData, index) => (
        <Image
          key={index}
          src={imageData.src}
          alt="Book"
          className="absolute animate-swing"
          style={{
            top: imageData.position.top,
            left: imageData.position.left,
            opacity: imageData.opacity,
            // animationDuration: `${3 + Math.random() * 2}s`, // Random swing duration
            // transform: `rotate(${imageData.rotation}deg)`, // Start at the initial rotation angle
            // transition: "opacity 3s ease, transform 3s ease", // Smooth opacity and transform changes
            width: "100px",
            height: "auto",
          }}
          width={1000}
          height={1000}
        />
      ))}
    </div>
  );
};

export default BackgroundImages;
