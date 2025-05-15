import React from "react";
import Image from "next/image";
import Button from "~/components/ui-components/Button";
import { useRouter } from "next/navigation";

const AboutSection: React.FC = () => {
  const router = useRouter();
  const handleAboutUsClick = () => {
    router.push("/about");
  };

  return (
    <div className="relative flex flex-col-reverse items-start gap-8 px-8 pb-16 pt-5 lg:flex-row">
      <div className="space-y-6 lg:w-1/2">
        <h2 className="text-xl font-bold text-red-500 md:text-3xl lg:text-5xl">
          ABOUT UNISHOP
        </h2>
        <p className="text-md text-justify leading-relaxed text-zinc-600 dark:text-zinc-300">
          Welcome to UniShop, your one-stop shop for all your official UOW
          Merchandise, study essentials, textbooks, course notes, and graduation
          memorabilia and gowns.
        </p>
        <p className="text-md text-justify leading-relaxed text-zinc-600 dark:text-zinc-300">
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
          src="/assets/images/home/about_unishop.jpg"
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
