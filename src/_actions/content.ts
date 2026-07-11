"use server";

import type {
  FooterContent,
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


    const jsonResponse = await response.json();
    console.log("pointsssssss", jsonResponse);
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

export async function getFooterContent(): Promise<FooterContent | null> {
  const [footer, headings, links] = await Promise.all([
    fetchContent<unknown>("/footer"),
    fetchContent<unknown>("/footer-headings"),
    fetchContent<unknown>("/footer-headings-links"),
  ]);

  if (!footer && !headings && !links) return null;

  return {
    footer: (asArray(footer)[0] as FooterRecord | undefined) ?? null,
    headings: asArray(headings),
    links: asArray(links),
  };
}

export async function getStaticPages(): Promise<StaticPage[]> {
  const response = await fetchContent<unknown>("/static-pages");
  if (!response) return [];

  console.log("resp static data",response);
  
  return asArray<StaticPage>(response);
}
