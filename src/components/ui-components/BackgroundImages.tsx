import Image from 'next/image';
import { useEffect, useState } from 'react';

// Sample book images - replace with your actual image URLs
const bookImages = [
  "/images/bookicon.png",
  "/images/bookicon.png",
  "/images/bookicon.png",
  "/images/bookicon.png",
  "/images/bookicon.png",
  "/images/bookicon.png"
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

interface ImageData {
  src: string; // Image source
  position: { top: string; left: string };
  rotation: number; // Store rotation as a number to animate it
  opacity: number; // Add opacity to control fading effect
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
    <div className="absolute inset-0 z-[-1] bg-opacity-20 blur-[2px] bg-red-200 pointer-events-none">
      {images.map((imageData, index) => (
        <Image
          key={index}
          src={imageData.src}
          alt="Book"
          className="absolute  animate-swing"
          style={{
            top: imageData.position.top,
            left: imageData.position.left,
            opacity: imageData.opacity,
            // animationDuration: `${3 + Math.random() * 2}s`, // Random swing duration
            // transform: `rotate(${imageData.rotation}deg)`, // Start at the initial rotation angle
            // transition: "opacity 3s ease, transform 3s ease", // Smooth opacity and transform changes
            width: '100px', // Adjust image width
            height: 'auto', // Maintain aspect ratio
          }}
          width={1000}
          height={1000}
        />
      ))}
    </div>
  );
};

export default BackgroundImages;
