import React from "react";
import Image from "next/image";
import Button from "~/components/ui-components/Button";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const MapContainerComponent = dynamic(() => import("~/components/map"), {
  ssr: false,
});
const ContactSection: React.FC = () => {
  const router = useRouter();
  const handleContactUsClick = () => {
    router.push("/contact-us");
  };

  return (
    <div className="relative flex flex-col-reverse items-start gap-8 px-8 pb-16 pt-5 lg:flex-row">
      <div className="space-y-6 lg:w-1/2">
        <h2 className="text-xl font-bold text-red-500 md:text-3xl lg:text-5xl">
          CONTACT US
        </h2>
        <p className="text-md text-justify leading-relaxed text-zinc-600 dark:text-zinc-300">
          The UniShop team are here to help! Providing friendly, personalised
          service to make sure you’re fully satisfied with your shopping
          experience from start to finish.
        </p>
        <p className="text-md text-justify leading-relaxed text-zinc-600 dark:text-zinc-300">
          Give us a call or send us an email if you have an enquiry.
        </p>
        <Button
          title="Contact details"
          onClick={handleContactUsClick}
          className="mt-4"
          width="w-full"
        />
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2">
        <MapContainerComponent height={400} />
      </div>
    </div>
  );
};

export default ContactSection;
