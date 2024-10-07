import {
  FaEnvelope,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";
import Logo from "../../public/pulseFooter.png";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const iconsTab = [
    { icon: <FaFacebookF /> },
    { icon: <AiOutlineTwitter /> },
    { icon: <AiFillYoutube /> },
    { icon: <BiLogoPinterestAlt /> },
  ];

  return (
    <footer className=" bg-zinc-100">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* logo side */}
          <div className="flex flex-col items-center gap-8 text-center md:col-span-1 md:items-start md:text-left">
            <Image
              src={Logo}
              width={600}
              height={350}
              alt="footer_logo"
              className="w-[18rem]"
            />
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-2 pl-4 text-sm font-medium text-[#646464]">
                <FaMapMarkerAlt className="text-[#646464]" /> Suite 5, Level 3,
                5-7 Littleton St, Riverwood NSW 2210
              </p>
              <a
                href="tel:+61 2 9534 8744"
                className="flex items-center gap-2 pl-4 text-sm font-medium text-[#646464]"
              >
                <FaPhoneAlt className="text-[#646464]" /> +61 2 9534 8744
              </a>
              <a
                href="tel:+61 4 5074 5025"
                className="flex items-center gap-2 pl-4 text-sm font-medium text-[#646464]"
              >
                <FaPhoneAlt className="text-[#646464]" /> +61 4 5074 5025
              </a>
              <a
                href="mailto:support@iitsols.com"
                className="flex items-center gap-2 pl-4 text-sm font-medium text-[#646464]"
              >
                <FaEnvelope className="text-[#646464]" /> support@iitsols.com
              </a>
            </div>
            <div className="flex gap-4 pl-4 text-xl text-[#646464]">
              {iconsTab.map(({ icon }, index) => (
                <div
                  key={index}
                  className="cursor-pointer rounded-full bg-[#efefef] p-2 transition-all hover:bg-red-500 hover:text-white"
                >
                  {icon}
                </div>
              ))}
            </div>
            <p className="pl-4 text-sm font-medium text-[#646464]">
              Privacy Policy | © {new Date().getFullYear()} PULSE <br />
              Design by{" "}
              <a target="_blank" rel="noreferrer" href="https://iitsols.com/" className="text-xs">
                IMPACT SOLUTIONS
              </a>
            </p>
          </div>

          {/* middle div */}
          <div className="flex flex-col items-center gap-4 md:col-span-1 md:items-start">
            <p className="text-lg font-bold">Customer Service</p>
            <span className="mb-2 block h-[4px] w-20 bg-[#ff0366]"></span>
            <Link
              href="contact-us"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Contact Us
            </Link>
            <Link
              href="postage-and-handling"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Postage & Handling
            </Link>
            <Link
              href="refunds-and-returns"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Refunds & Returns
            </Link>
            <Link
              href="terms-and-conditions"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Privacy Policy
            </Link>
            <Link
              href="about"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              About Us
            </Link>
            <Link
              href="academic-dress-hire"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Academic Dress Hire
            </Link>
          </div>

          {/* shop online */}
          <div className="flex flex-col items-center gap-4 md:col-span-1 md:items-start">
            <p className="text-lg font-bold">Shop Online</p>
            <span className="mb-2 block h-[4px] w-20 bg-[#ff0366]"></span>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Textbooks
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Books
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              UOW Merchandise
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Stationery & Tech
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Graduation
            </Link>
          </div>

          {/* gifts & merch */}
          <div className="flex flex-col items-center gap-4 md:col-span-1 md:items-start">
            <p className="text-lg font-bold">Gifts & Merch</p>
            <span className="mb-2 block h-[4px] w-20 bg-[#ff0366]"></span>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Gifts
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              UOW Merchandise
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#646464] hover:text-[#ff0366]"
            >
              Erstwilder
            </Link>
          </div>

          {/* working hours */}
          <div className="flex flex-col items-center gap-4 md:col-span-1 md:items-start">
            <p className="text-lg font-bold">Working Hours</p>
            <span className="mb-2 block h-[4px] w-20 bg-[#ff0366]"></span>
            <p className="text-sm font-bold text-[#646464]">Monday - Friday:</p>
            <p className="text-sm font-medium text-[#646464]">
              8:00am - 5:00pm
            </p>
            <p className="text-sm font-medium text-[#646464]">
              Delivery and Click & Collect available
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
