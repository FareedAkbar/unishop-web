import { FaBook, FaGraduationCap, FaTshirt, FaPen, FaGift, FaClipboardList } from 'react-icons/fa';
  import { AiOutlineFileText, AiOutlineContacts } from 'react-icons/ai';
  
interface Category {
    label: string;
    href?:string;
    subItems?: SubItem[];
    icon:any;
  }
  
  interface SubItem {
    label: string;
    href: string;
    icon:any;
  }
  export const categories: Category[] = [
    {
      label: 'Text Book',
      icon: 'AiOutlineFileText', // Use the icon name as a string
      subItems: [],
    },
    { 
      label: 'Books',
      icon: 'FaBook', // Example of another icon
      subItems: [] 
    },
    { 
      label: 'E-Text Book',
      icon: 'FaClipboardList',
      href: "" 
    },
    { 
      label: 'Pulse',
      icon: 'AiOutlineContacts',
      href: "" 
    },
    { 
      label: 'Graduation',
      icon: 'FaGraduationCap',
      subItems: [
        { label: 'Caps', icon: 'FaGraduationCap', href: '#' },
        { label: 'Gowns', icon: 'FaGraduationCap', href: '#' }
      ] 
    },
    { 
      label: 'UOW Merchandise',
      icon: 'FaTshirt',
      subItems: [
        { label: 'T-shirts', icon: 'FaTshirt', href: '#' },
        { label: 'Hoodies', icon: 'FaTshirt', href: '#' }
      ] 
    },
    { 
      label: 'Stationary',
      icon: 'FaPen',
      subItems: [
        { label: 'Pens', icon: 'FaPen', href: '#' },
        { label: 'Notebooks', icon: 'FaPen', href: '#' }
      ] 
    },
    { 
      label: 'Art & Gifts',
      icon: 'FaGift',
      subItems: [
        { label: 'Posters', icon: 'FaGift', href: '#' },
        { label: 'Frames', icon: 'FaFrame', href: '#' }
      ] 
    },
    { 
      label: 'Contact',
      icon: 'AiOutlineContacts' 
    },
  ];
  