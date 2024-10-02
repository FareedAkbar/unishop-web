
interface Category {
    label: string;
    href?:string;
    subItems?: SubItem[];
  }
  
  interface SubItem {
    label: string;
    href: string;
  }
  
export const categories: Category[] = [
    {
      label: 'Text Book',
      subItems: [{ label: 'Math Textbook', href: '#' }, { label: 'Science Textbook', href: '#' }],
    },
    { label: 'Books', subItems: [{ label: 'Fiction', href: '#' }, { label: 'Non-fiction', href: '#' }] },
    { label: 'E-Text Book',href:"" },
    { label: 'Pulse', href:"" },
    { label: 'Graduation', subItems: [{ label: 'Caps', href: '#' }, { label: 'Gowns', href: '#' }] },
    { label: 'UOW Merchandise', subItems: [{ label: 'T-shirts', href: '#' }, { label: 'Hoodies', href: '#' }] },
    { label: 'Stationary', subItems: [{ label: 'Pens', href: '#' }, { label: 'Notebooks', href: '#' }] },
    { label: 'Art & Gifts', subItems: [{ label: 'Posters', href: '#' }, { label: 'Frames', href: '#' }] },
    { label: 'Contact' },
  ];