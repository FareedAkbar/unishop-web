"use client";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import Logo from "../../public/pulseFooter2.png";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "~/Context/AuthContext";
import { usePathname } from "next/navigation";
import { FiGlobe } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { getFooterContent } from "~/_actions/content";
import type { FooterContent, FooterHeading, FooterLink } from "~/types/content";
import { isActive } from "~/utils/content";

function Footer() {
  const { category } = useAuthContext();
  const pathname = usePathname();
  const [footerContent, setFooterContent] = useState<FooterContent | null>(
    null,
  );

  useEffect(() => {
    getFooterContent()
      .then(setFooterContent)
      .catch((error) => console.error("Failed to load footer content:", error));
  }, []);

  const footer = footerContent?.footer;
  const links = [
    { title: "Contact Us", href: "/contact-us" },
    { title: "Postage & Handling", href: "/postage-and-handling" },
    { title: "Refunds & Returns", href: "/refunds-and-returns" },
    { title: "Terms & Conditions", href: "/terms-and-conditions" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "About Us", href: "/about-us" },
    { title: "Academic Dress Hire", href: "/academic-dress-hire" },
  ];
  const iconsTab = [
    footer?.instagram_link && {
      icon: <AiOutlineInstagram />,
      link: footer.instagram_link,
      label: "Instagram",
    },
    footer?.pulse_perks_link && {
      icon: <FiGlobe />,
      link: footer.pulse_perks_link,
      label: "Pulse Perks",
    },
  ].filter(Boolean) as { icon: React.ReactNode; link: string; label: string }[];

  const abn = footer?.abn ?? "UOW Pulse ABN 28 915 832 337";
  const address =
    footer?.address ?? "Building 11, University of Wollongong";
  const phone = footer?.phone ?? "(02) 4221 8050";
  const email = footer?.email ?? "uow-bookshop@uow.edu.au";

  return (
    <footer className="border-t bg-white dark:bg-slate-900">
      <div className="container mx-auto pb-2 pt-8">
        <div className="grid grid-cols-1 gap-8 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div
            className="flex flex-col items-center gap-3 md:col-span-1 md:items-start"
          >
            <p className="font-serif text-lg font-bold">Customer Service</p>
            <span className="mb-2 block h-[4px] w-20 bg-red-500" />
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`text-sm font-medium ${pathname === link.href
                    ? "text-red-500"
                    : "text-[#646464] hover:text-red-500"
                  } dark:text-gray-300 dark:hover:text-red-500`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 md:col-span-1 md:items-start">
            <p className="font-serif text-lg font-bold">Shop Online</p>
            <span className="mb-2 block h-[4px] w-20 bg-red-500" />
            {category?.map(
              (item, index) =>
                index < 7 && (
                  <Link
                    key={index}
                    href={`products?category=${item.category_type_id}&name=${item.type}`}
                    className="text-sm font-medium capitalize text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
                  >
                    {item.type}
                  </Link>
                ),
            )}
          </div>

          <div className="flex flex-col items-center gap-3 md:col-span-1 md:items-start">
            <p className="font-serif text-lg font-bold">Working Hours</p>
            <span className="mb-2 block h-[4px] w-20 bg-red-500" />
            <p className="text-sm font-bold text-[#646464] dark:text-gray-300 dark:hover:text-red-500">
              Monday - Friday
            </p>
            <p className="text-sm font-medium text-[#646464] dark:text-gray-300 dark:hover:text-red-500">
              8:00am - 5:00pm
            </p>
            <p className="text-sm font-medium text-[#646464] dark:text-gray-300 dark:hover:text-red-500">
              Delivery and Click & Collect available
            </p>
          </div>

          <div className="flex flex-col items-center justify-end gap-2 text-center md:col-span-1 md:items-end md:text-right">
            <Image
              src={Logo}
              alt="footer_logo"
              width={1000}
              height={1000}
              className="h-fit w-[10rem] sm:w-[16rem] xl:w-[18rem]"
            />

            {iconsTab.length > 0 && (
              <div className="flex w-full justify-center gap-4 text-xl text-[#646464] md:justify-end">
                {iconsTab.map(({ icon, link, label }, index) => (
                  <Link
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="cursor-pointer rounded-full bg-red-500 p-2 text-white transition-all"
                  >
                    <div>{icon}</div>
                  </Link>
                ))}
              </div>
            )}
            <div className="flex flex-col items-end gap-3 text-right">
              <p className="text-sm">{abn}</p>

              <a
                href="https://www.google.com/maps?q=-34.40755818806117,150.87911127658157"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row-reverse items-center gap-2 text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
              >
                <FaMapMarkerAlt className="text-md text-[#646464] dark:text-gray-300" />
                {address}
              </a>

              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex flex-row-reverse items-center gap-2 text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
              >
                <FaPhoneAlt className="text-[#646464] dark:text-gray-300" />
                {phone}
              </a>

              <a
                href={`mailto:${email}`}
                className="flex flex-row-reverse items-center gap-2 text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
              >
                <FaEnvelope className="text-[#646464] dark:text-gray-300" />
                {email}
              </a>
            </div>

            <Image
              src={"/assets/images/home/charity-logo.png"}
              alt="charity-logo"
              className="h-36 w-36 object-contain"
              width={1000}
              height={1000}
            />
          </div>
        </div>
        <div className="flex flex-col items-center pt-3 text-center">
          <p className="text-xs font-medium text-[#646464] dark:text-gray-300">
            <a
              rel="noreferrer"
              href="/privacy-policy"
              className="hover:text-red-500"
            >
              Privacy Policy
            </a>{" "}
            | © {new Date().getFullYear()} PULSE
          </p>
          <p className="text-xs font-medium text-[#646464] dark:text-gray-300">
            Designed by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://iitsols.com/"
              className="text-red-500"
            >
              IMPACT IT SOLUTIONS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function getLinksForHeading(heading: FooterHeading, links: FooterLink[]) {
  return links
    .filter(
      (link) =>
        isActive(link.is_active) &&
        link.unishop_footer_heading_id === heading.unishop_footer_heading_id,
    )
    .sort((a, b) => a.title.localeCompare(b.title));
}

export default Footer;
