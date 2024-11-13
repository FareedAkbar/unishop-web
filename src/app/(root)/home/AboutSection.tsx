import React from "react";
import Image from "next/image";
import Button from "~/components/ui-components/Button";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";

const AboutSection: React.FC = () => {
  const router = useRouter();
  const handleAboutUsClick = () => {
    router.push("/about");
  };

  return (
    <div className="flex relative flex-col-reverse items-center gap-8 px-8 py-16 lg:flex-row">
      {/* Text Content Section */}
      <div className="space-y-6 lg:w-1/2">
      {/* <div className="absolute  -z-10 opacity-10 dark:opacity-40">
          <Player
            src={"assets/gifs/lists-bg.json"}
            loop
            autoplay
            className="h-[500px] w-full object-contain overflow-visible"
          />
        </div> */}
        <h2 className="text-3xl font-bold text-red-500">
          ABOUT UNISHOP
        </h2>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 text-justify">
          Welcome to UniShop, your one-stop shop for all your official UOW
          Merchandise, study essentials, textbooks, course notes, and graduation
          memorabilia and gowns.
        </p>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 text-justify">
          UniShop is a UOW Pulse business, with all proceeds from everything you
          buy going straight back to enhancing the student experience on campus.
          Whether through events, festivals, competitions, or through clubs and
          societies. Thank you for supporting the UOW campus experience.
        </p>
        <Button
          title="About Us"
          onClick={handleAboutUsClick}
          className="mt-4"
        />
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2">
        <Image
          src="/assets/images/home/about_unishop.jpg" // Adjust path to your image
          alt="About UniShop"
          width={1000}
          height={1000}
          className="rounded-md object-cover shadow-lg"
        />
      </div>
    </div>
  );
};

export default AboutSection;
