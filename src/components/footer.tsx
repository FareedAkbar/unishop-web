"use client";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import Logo from "../../public/pulseFooter2.png";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "~/Context/AuthContext";
import { usePathname } from "next/navigation";
import { FiGlobe } from "react-icons/fi";

const links = [
  { title: "Contact Us", href: "/contact-us" },
  { title: "Postage & Handling", href: "/postage-and-handling" },
  { title: "Refunds & Returns", href: "/refunds-and-returns" },
  { title: "Terms & Conditions", href: "/terms-and-conditions" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "About Us", href: "/about" },
  { title: "Academic Dress Hire", href: "/academic-dress-hire" },
];

function Footer() {
  const iconsTab = [
    // { icon: <FaFacebookF /> },
    // { icon: <AiOutlineTwitter /> },
    // { icon: <AiFillYoutube /> },
    // { icon: <BiLogoPinterestAlt /> },
    {
      icon: <AiOutlineInstagram />,
      link: "https://www.instagram.com/uowpulse_eatshop/",
      label: "Instagram",
    },
    {
      icon: <FiGlobe />,
      link: "https://pulse.uow.edu.au/pulseperks/",
      label: "Pulse Perks",
    },
  ];
  const { category } = useAuthContext();
  const pathname = usePathname();

  return (
    <footer className="border-t bg-white dark:bg-slate-900">
      <div className="container mx-auto pb-2 pt-8">
        <div className="grid grid-cols-1 gap-8 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* logo side */}
          <div className="flex flex-col items-center gap-8 text-center md:col-span-1 md:items-start md:text-left">
            <Image
              src={Logo}
              alt="footer_logo"
              width={1000}
              height={350}
              className="w-[10rem] sm:w-[12rem] xl:w-[16rem]"
            />

            <div className="flex flex-col gap-3">
              <a
                href="https://www.google.com/maps?q=-34.40755818806117,150.87911127658157"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
              >
                <FaMapMarkerAlt className="text-md text-[#646464] dark:text-gray-300" />
                Building 11, University of Wollongong
              </a>
              <a
                href="tel:(02) 4221 8050"
                className="flex items-center gap-2 text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
              >
                <FaPhoneAlt className="text-[#646464] dark:text-gray-300" />{" "}
                (02) 4221 8050
              </a>
              <a
                href="mailto:uow-bookshop@uow.edu.au"
                className="flex items-center gap-2 text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
              >
                <FaEnvelope className="text-[#646464] dark:text-gray-300" />{" "}
                uow-bookshop@uow.edu.au
              </a>
            </div>
            <div className="flex w-full justify-start gap-4 text-xl text-[#646464]">
              {iconsTab.map(({ icon, link, label }, index) => (
                <Link
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="cursor-pointer rounded-full bg-red-200 p-2 transition-all hover:bg-red-500 hover:text-white"
                >
                  <div>{icon}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* middle div */}
          <div className="flex flex-col items-center gap-3 md:col-span-1 md:items-start">
            <p className="text-lg font-bold">Customer Service</p>
            <span className="mb-2 block h-[4px] w-20 bg-red-500" />
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`text-sm font-medium ${
                  pathname === link.href
                    ? "text-red-500"
                    : "text-[#646464] hover:text-red-500"
                } dark:text-gray-300 dark:hover:text-red-500`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* shop online */}
          <div className="flex flex-col items-center gap-3 md:col-span-1 md:items-start">
            <p className="text-lg font-bold">Shop Online</p>
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
            {/* <span className="mb-2 block h-[4px] w-20 bg-red-500" />
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
            >
              Textbooks
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
            >
              Books
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
            >
              UOW Merchandise
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
            >
              Stationery & Tech
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-red-500 dark:text-gray-300 dark:hover:text-red-500"
            >
              Graduation
            </Link> */}
          </div>

          {/* working hours */}
          <div className="flex flex-col items-center gap-3 md:col-span-1 md:items-start">
            <p className="text-lg font-bold">Working Hours</p>
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
        </div>
        {/* bottom center */}
        <div className="flex flex-col items-center pt-3 text-center">
          <p className="text-xs font-medium text-[#646464] dark:text-gray-300">
            Privacy Policy | © {new Date().getFullYear()} PULSE
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

export default Footer;
