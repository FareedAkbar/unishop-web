import React from "react";
import Image from "next/image";
import Button from "~/components/ui-components/Button";
import { useRouter } from "next/navigation";
import type { AboutUs } from "~/types/content";
import { resolveMediaUrl } from "~/utils/content";

interface AboutSectionProps {
  about?: AboutUs | null;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  const router = useRouter();
  const handleAboutUsClick = () => {
    router.push("/about");
  };

  const paragraph1 =
    about?.paragraph_1 ??
    "Welcome to UniShop, your one-stop shop for all your official UOW Merchandise, study essentials, textbooks, course notes, and graduation memorabilia and gowns.";
  const paragraph2 =
    about?.paragraph_2 ??
    "UniShop is a UOW Pulse business, with all proceeds from everything you buy going straight back to enhancing the student experience on campus. Whether through events, festivals, competitions, or through clubs and societies. Thank you for supporting the UOW campus experience.";
  const imageSrc =
    resolveMediaUrl(about?.object_path) ||
    "/assets/images/home/about_unishop.jpg";

  return (
    <div className="relative flex flex-col-reverse items-start gap-8 pb-16 pt-5 lg:flex-row lg:px-8">
      <div className="space-y-6 lg:w-1/2">
        <h2 className="text-xl font-bold text-red-500 md:text-3xl">
          ABOUT UNISHOP
        </h2>
        <p className="text-md text-justify leading-relaxed text-zinc-600 dark:text-zinc-300">
          {paragraph1}
        </p>
        <p className="text-md text-justify leading-relaxed text-zinc-600 dark:text-zinc-300">
          {paragraph2}
        </p>
        <Button
          title="About Us"
          onClick={handleAboutUsClick}
          className="mt-4"
          width="w-1/2 lg:w-1/3"
        />
      </div>

      <div className="lg:w-1/2">
        <Image
          src={imageSrc}
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
