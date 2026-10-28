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
import type { FooterContent, FooterHeading, FooterLink, FooterRecord } from "~/types/content";
import { isActive } from "~/utils/content";

function Footer() {
  const { category } = useAuthContext();
  const pathname = usePathname();
  const [footerContent, setFooterContent] = useState<FooterRecord | null>(
    null,
  );

  useEffect(() => {
    getFooterContent()
      .then((data) => setFooterContent(data ?? null))
      .catch((error) => console.error("Failed to load footer content:", error));
  }, []);

  const footer = footerContent;



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
    <footer className="border-t bg-white dark:bg-slate-900 font-sans">
      <div className="container mx-auto pb-2 pt-8">
        <div className="grid grid-cols-1 gap-8 px-5 sm:grid-cols-2 lg:grid-cols-12">
          <div
            className="flex flex-col items-center gap-3 sm:items-start lg:col-span-3"
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

          <div className="flex flex-col items-center gap-3 sm:items-start lg:col-span-2">
            <p className="font-serif text-lg font-bold">Shop Online</p>
            <span className="mb-2 block h-[4px] w-20 bg-red-500" />
            {category?.map(
              (item, index) =>
                index < 7 && (
                  <Link
                    key={index}
                    href={`/products?category=${item.category_type_id}&name=${item.type}`}
                    className="text-sm font-medium capitalize text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
                  >
                    {item.type}
                  </Link>
                ),
            )}
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-start lg:col-span-3">
            <p className="font-serif text-lg font-bold">Opening Hours</p>
            <span className="mb-2 block h-[4px] w-20 bg-red-500" />
            <p className="text-sm font-medium text-[#646464] dark:text-gray-300 dark:hover:text-red-500">
              Delivery and Click & Collect available
            </p>
            <p className="text-sm font-medium text-[#646464] dark:text-gray-300 dark:hover:text-red-500">
              8:00am - 5:00pm
            </p>
            <p className="text-sm font-medium text-[#646464] dark:text-gray-300 dark:hover:text-red-500">
              Monday - Friday
            </p>
            <p className="text-sm font-medium text-[#646464] dark:text-gray-300 dark:hover:text-red-500">
              Weekends - CLOSED
            </p>
            <p className="text-sm font-medium text-[#646464] dark:text-gray-300 dark:hover:text-red-500">
              Public Holidays - CLOSED
            </p>
          </div>

          <div className="flex flex-col sm:items-start items-center justify-center text-center sm:justify-start gap-4 sm:text-left lg:col-span-4">
            <Image
              src={Logo}
              alt="footer_logo"
              width={1000}
              height={1000}
              className="h-fit w-[10rem] sm:w-[14rem] xl:w-[16rem]"
            />

            {iconsTab.length > 0 && (
              <div className="flex w-full lg:justify-start gap-4 text-xl text-[#646464]">
                {iconsTab.map(({ icon, link, label }, index) => (
                  <Link
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="cursor-pointer rounded-full bg-red-500 p-2 text-white transition-all hover:bg-red-600"
                  >
                    <div>{icon}</div>
                  </Link>
                ))}
              </div>
            )}

            {abn && (
              <p className="text-xs sm:text-sm text-[#646464] dark:text-gray-400 text-left">
                {abn}
              </p>
            )}

            <div className="flex flex-col lg:items-start gap-3 w-fit lg:text-left">
              <a
                href="https://www.google.com/maps?q=-34.40755818806117,150.87911127658157"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-xs sm:text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500 whitespace-nowrap"
              >
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#646464] group-hover:bg-red-50 group-hover:text-red-500 dark:bg-slate-800 dark:text-gray-300 dark:group-hover:bg-slate-700 transition-colors">
                  <FaMapMarkerAlt className="text-xs" />
                </div>
                <span className="whitespace-nowrap">{address}</span>
              </a>

              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 text-xs sm:text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500 whitespace-nowrap"
              >
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#646464] group-hover:bg-red-50 group-hover:text-red-500 dark:bg-slate-800 dark:text-gray-300 dark:group-hover:bg-slate-700 transition-colors">
                  <FaPhoneAlt className="text-xs" />
                </div>
                <span className="whitespace-nowrap">{phone}</span>
              </a>

              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-3 text-xs sm:text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500 whitespace-nowrap"
              >
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#646464] group-hover:bg-red-50 group-hover:text-red-500 dark:bg-slate-800 dark:text-gray-300 dark:group-hover:bg-slate-700 transition-colors">
                  <FaEnvelope className="text-xs" />
                </div>
                <span className="whitespace-nowrap">{email}</span>
              </a>
            </div>

            <Image
              src={"/assets/images/home/charity-logo.png"}
              alt="charity-logo"
              className="h-28 w-28 object-contain sm:self-start self-auto"
              width={1000}
              height={1000}
            />
          </div>
        </div>
        <div className="flex flex-col items-center pt-3 text-center border-t border-gray-100 dark:border-gray-800 mt-6 font-sans">
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
