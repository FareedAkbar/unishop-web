import {
  FaBook,
  FaGraduationCap,
  FaTshirt,
  FaPen,
  FaGift,
  FaClipboardList,
} from "react-icons/fa";
import { AiOutlineFileText, AiOutlineContacts } from "react-icons/ai";

interface Category {
  label: string;
  href?: string;
  subItems?: SubItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: string;
}

interface SubItem {
  label: string;
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: string;
}
export const categories: Category[] = [
  {
    label: "E-Text Book",
    icon: "FaClipboardList",
    href: "https://unishopuow.vitalsource.com/",
  },
  {
    label: "Join Pulse Perks",
    icon: "AiOutlineContacts",
    href: "",
    subItems: [
      {
        label: "Download on the App Store",
        href: "https://apps.apple.com/ie/app/uow-pulse-ltd/id6476544403",
      },
      {
        label: "Download on Google Play",
        href: "https://play.google.com/store/apps/details?id=com.iitsols.pulseuowltd",
      },
    ],
  },
];
