export interface Banner {
  unishop_banners_id: number;
  number: number;
  media_id: number;
  is_active: number;
  link_url?: string;
  media_url?: string;
  object_path?: string;
}

export interface FlipWord {
  unishop_flip_word_id: number;
  flip_word_text: string;
  number: number;
  is_active: number;
}

export interface FeaturedImage {
  unishop_featured_image_id: number;
  media_id: number;
  is_active: number;
  link_url?: string;
  media_url?: string;
  object_path?: string;
}

export interface AboutUs {
  unishop_about_us_id: number;
  paragraph_1: string;
  paragraph_2: string;
  object_path?: string;
  media_id?: number;
}

export interface ContactUs {
  unishop_contact_us_id: number;
  contact_text: string;
}

export interface HomeContent {
  banners: Banner[];
  flipWords: FlipWord[];
  featuredImages: FeaturedImage[];
  aboutUs: AboutUs[];
  contactUs: ContactUs[];
}

export interface FooterRecord {
  unishop_footer_id: number;
  abn: string;
  address: string;
  phone: string;
  email: string;
  instagram_link?: string;
  pulse_perks_link?: string;
  bookshop_link?: string;
}

export interface FooterHeading {
  unishop_footer_heading_id: number;
  title: string;
  is_active: number;
}

export interface FooterLink {
  unishop_footer_headings_link_id: number;
  unishop_footer_heading_id: number;
  title: string;
  link_url: string;
  is_active: number;
}

export interface FooterContent {
  footer: FooterRecord | null;
  headings: FooterHeading[];
  links: FooterLink[];
}

export interface StaticPagePoint {
  unishop_static_pages_point_id: number;
  title: string;
  number: number;
}

export interface StaticPageHeadingPoint {
  unishop_static_pages_headings_point_id: number;
  description: string;
  number: number;
}

export interface StaticPageHeading {
  unishop_static_pages_heading_id: number;
  title: string;
  number: number;
  description?: string;
  unishop_static_pages_headings_points?: StaticPageHeadingPoint[];
}

export interface StaticPageImage {
  unishop_static_pages_image_id: number;
  unishop_static_page_id: number;
  title: string;
  number: number;
  description: string;
  link_url?: string;
  media_id: number;
  media_url?: string;
  object_path?: string;
}

export interface StaticPage {
  unishop_static_page_id: number;
  title: string;
  description: string;
  unishop_static_pages_points?: StaticPagePoint[];
  unishop_static_pages_headings?: StaticPageHeading[];
  unishop_static_pages_images?: StaticPageImage[];
}

export interface ContentApiResponse<T> {
  status: boolean;
  data: T;
}
