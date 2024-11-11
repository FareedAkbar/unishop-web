import { FaBook, FaGraduationCap, FaTshirt, FaPen, FaGift, FaClipboardList } from 'react-icons/fa';
  import { AiOutlineFileText, AiOutlineContacts } from 'react-icons/ai';
  
interface Category {
    label: string;
    href?:string;
    subItems?: SubItem[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon:any;
  }
  
  interface SubItem {
    label: string;
    href: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
  }
  export const categories: Category[] = [
    // {
    //   label: 'Text Book',
    //   icon: 'AiOutlineFileText', // Use the icon name as a string
    //   subItems: [],
    // },
    { 
      label: 'Books',
      icon: 'FaBook', // Example of another icon
      subItems: [] 
    },
    { 
      label: 'E-Text Book',
      icon: 'FaClipboardList',
      href: "https://unishopuow.vitalsource.com/" 
    },
    { 
      label: 'Pulse',
      icon: 'AiOutlineContacts',
      href: "" 
    },
    // { 
    //   label: 'Graduation',
    //   icon: 'FaGraduationCap',
    //   // subItems: [
    //   //   { label: 'Caps', icon: 'FaGraduationCap', href: '#' },
    //   //   { label: 'Gowns', icon: 'FaGraduationCap', href: '#' }
    //   // ] 
    // },
    // { 
    //   label: 'Merch & Clothing',
    //   icon: 'FaTshirt',
    //   subItems: [
    //     // { label: "Merchandise", icon: FaTshirt, href: "#" },
    //     // { label: "Graduation", icon: FaTshirt, href: "#" },
    //     // { label: "Clothing", icon: FaTshirt, href: "#" },
    //   ],
    // },
    // { 
    //   label: 'Stationary & Tech',
    //   icon: 'FaPen',
    //   // subItems: [
    //   //   { label: 'Pens', icon: 'FaPen', href: '#' },
    //   //   { label: 'Notebooks', icon: 'FaPen', href: '#' }
    //   // ] 
    // },
    // { 
    //   label: 'Art & Gifts',
    //   icon: 'FaGift',
    //   subItems: [
    //     // { label: "Imagine Homewares", icon: FaGift, href: "#" },
    //     // { label: "Indigenous art merch", icon: FaGift, href: "#" },
    //     { label: "Danielle Hulls Photography", icon: FaGift, href: "/gifts?desc=Photography" },
    //     { label: "Marini Ferlazzo", icon: FaGift, href: "/gifts?desc=Ferlazzo" },
    //     { label: "White Clay Mountain", icon: FaGift, href: "/gifts?desc=Mountain" },
    //     { label: "Eliza Jade Candles", icon: FaGift, href: "/gifts?desc=Candles" },
    //   ]
    // },
    // { 
    //   label: 'Contact',
    //   icon: 'AiOutlineContacts' 
    // },
  ];
  