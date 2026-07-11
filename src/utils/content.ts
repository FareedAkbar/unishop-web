import type {
  StaticPage,
  StaticPageHeading,
  StaticPagePoint,
  StaticPageHeadingPoint,
  StaticPageImage,
} from "~/types/content";

export const S3_BASE_URL =
  process.env.NEXT_PUBLIC_S3_BASE_URL ??
  "https://ipos-storage.s3.amazonaws.com/";

export function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value && typeof value === "object") {
    const data = (value as Record<string, unknown>).data;
    if (Array.isArray(data)) return data as T[];
  }
  return [];
}

export function asNumber(value: unknown) {
  return Number(value ?? 0);
}

export function isActive(value: unknown) {
  return asNumber(value) === 1;
}

export function resolveMediaUrl(path?: string | null) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${S3_BASE_URL}${path}`;
}

export function resolveBannerImage(banner: {
  media_url?: string;
  object_path?: string;
}) {
  return (
    resolveMediaUrl(banner.media_url ?? banner.object_path ?? "") ||
    "/assets/images/home/banner1.png"
  );
}

export function parseContact(contactText: string) {
  const [paragraph_1 = "", paragraph_2 = ""] = contactText.split("\n\n");
  return { paragraph_1, paragraph_2 };
}

export function titleToSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function findStaticPageByRoute(
  pages: StaticPage[],
  route: string,
): StaticPage | undefined {
  const slug = route.replace(/^\//, "");
  return pages.find((page) => titleToSlug(page.title) === slug);
}

export function sortByNumber<T extends { number?: number }>(items: T[]) {
  return [...items].sort((a, b) => asNumber(a.number) - asNumber(b.number));
}

export function getPagePoints(page: StaticPage): StaticPagePoint[] {
  return sortByNumber(
    Array.isArray(page.unishop_static_pages_points)
      ? page.unishop_static_pages_points
      : [],
  );
}

export function getPageHeadings(page: StaticPage): StaticPageHeading[] {
  return sortByNumber(
    Array.isArray(page.unishop_static_pages_headings)
      ? page.unishop_static_pages_headings
      : [],
  );
}

export function getHeadingPoints(
  heading: StaticPageHeading,
): StaticPageHeadingPoint[] {
  return sortByNumber(
    Array.isArray(heading.unishop_static_pages_headings_points)
      ? heading.unishop_static_pages_headings_points
      : [],
  );
}

export function getPageImages(page: StaticPage): StaticPageImage[] {
  return sortByNumber(
    Array.isArray(page.unishop_static_pages_images)
      ? page.unishop_static_pages_images
      : [],
  );
}
