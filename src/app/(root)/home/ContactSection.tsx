import React from "react";
import Button from "~/components/ui-components/Button";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { ContactUs } from "~/types/content";
import { parseContact } from "~/utils/content";

const MapContainerComponent = dynamic(() => import("~/components/map"), {
  ssr: false,
});

interface ContactSectionProps {
  contact?: ContactUs | null;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const router = useRouter();
  const handleContactUsClick = () => {
    router.push("/contact-us");
  };

  const { paragraph_1, paragraph_2 } = contact?.contact_text
    ? parseContact(contact.contact_text)
    : {
      paragraph_1:
        "The UniShop team are here to help! Providing friendly, personalised service to make sure you're fully satisfied with your shopping experience from start to finish.",
      paragraph_2:
        "Give us a call or send us an email if you have an enquiry.",
    };

  return (
    <div className="relative flex flex-col-reverse items-start gap-8 pb-16 pt-5 lg:flex-row-reverse lg:px-8">
      <div className="space-y-6 lg:w-1/2">
        <h2 className="text-xl font-bold text-red-500 md:text-3xl">
          CONTACT US
        </h2>
        <p className="text-md text-justify leading-relaxed text-zinc-600 dark:text-zinc-300">
          {paragraph_1}
        </p>
        {paragraph_2 && (
          <p className="text-md text-justify leading-relaxed text-zinc-600 dark:text-zinc-300">
            {paragraph_2}
          </p>
        )}
        <Button
          title="Contact us"
          onClick={handleContactUsClick}
          className="mt-4 uppercase"
          width="w-1/2 lg:w-1/3"
        />
      </div>

      <div className="w-full lg:w-1/2">
        <MapContainerComponent height={400} />
      </div>
    </div>
  );
};

export default ContactSection;
