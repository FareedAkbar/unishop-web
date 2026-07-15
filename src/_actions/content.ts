"use server";

import type {
  FooterRecord,
  HomeContent,
  StaticPage,
} from "~/types/content";
import { asArray } from "~/utils/content";

const CONTENT_BASE =
  process.env.NEXT_PUBLIC_CONTENT_BASE_URL ??
  `${process.env.NEXT_PUBLIC_PASSKEY_BOOKNET ?? ""}api/unishop_content`;

const requestOptions: RequestInit = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PASSKEY_TOKEN}`,
    "Content-Type": "application/json",
  },
  cache: "no-store",
};

async function fetchContent<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${CONTENT_BASE}${path}`, requestOptions);
    if (!response.ok) {
      console.error(`Content API error (${path}):`, response.status);
      return null;
    }


    const jsonResponse: unknown = await response.json();
    return jsonResponse as T;
  } catch (error) {
    console.error(`Content API fetch failed (${path}):`, error);
    return null;
  }
}

export async function getHomeContent(): Promise<HomeContent | null> {
  const response = await fetchContent<{ data?: Record<string, unknown> }>("");

  if (!response) return null;

  const data =
    (response as { data?: Record<string, unknown> }).data ??
    (response as Record<string, unknown>);

  return {
    banners: asArray(data.banners),
    flipWords: asArray(data.flip_words),
    featuredImages: asArray(data.featured_images),
    aboutUs: asArray(data.about_us),
    contactUs: asArray(data.contact_us),
  };
}

interface FooterResponse {
  data?: {
    footer?: unknown;
  };
}

export async function getFooterContent(): Promise<FooterRecord | null> {
  const response = await fetchContent<FooterResponse>("/footer");

  if (!response?.data) return null;

  const footerData = response.data.footer;
  return (asArray<FooterRecord>(footerData)[0]) ?? null;
}

export async function getStaticPages(): Promise<StaticPage[]> {
  const response = await fetchContent<unknown>("/static-pages");
  if (!response) return [];

  return asArray<StaticPage>(response);
}
