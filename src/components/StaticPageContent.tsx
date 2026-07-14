"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaChevronDown, FaChevronUp, FaCheck } from "react-icons/fa";
import { getStaticPages } from "~/_actions/content";
import type { StaticPage } from "~/types/content";
import {
  findStaticPageByRoute,
  getHeadingPoints,
  getPageHeadings,
  getPagePoints,
  getPageImages,
  resolveMediaUrl,
} from "~/utils/content";

const LottiePlayer = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then((mod) => {
      const Player = mod.Player;
      return function LottieWrapper({
        src,
        className,
      }: {
        src: string;
        className?: string;
      }) {
        return <Player autoplay loop src={src} className={className} />;
      };
    }),
  { ssr: false },
);

let pagesCache: StaticPage[] | null = null;
let pagesPromise: Promise<StaticPage[]> | null = null;

function loadStaticPages() {
  if (pagesCache) return Promise.resolve(pagesCache);
  pagesPromise ??= getStaticPages()
    .then((pages) => {
      pagesCache = pages;
      return pages;
    })
    .catch((error) => {
      pagesPromise = null;
      throw error;
    });
  return pagesPromise;
}

export function useStaticPage(route: string) {
  const [page, setPage] = useState<StaticPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStaticPages()
      .then((pages) => {
        setPage(findStaticPageByRoute(pages, route) ?? null);
      })
      .catch((error) =>
        console.error(`Failed to load static page (${route}):`, error),
      )
      .finally(() => setLoading(false));
  }, [route]);

  return { page, loading };
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
    </div>
  );
}

export function StaticPageHeader({ page }: { page: StaticPage }) {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold text-red-600">{page.title}</h1>
      {page.description && (
        <p className="text-justify text-sm dark:text-white md:text-base">
          {page.description}
        </p>
      )}
    </>
  );
}

export function StaticPageIntro({
  page,
  lottieSrc,
}: {
  page: StaticPage;
  lottieSrc?: string;
}) {
  const pagePoints = getPagePoints(page);

  return (
    <>
      <h1 className="mb-6 text-center text-3xl font-extrabold text-red-600">
        {page.title}
      </h1>
      {(page.description || pagePoints.length > 0 || lottieSrc) && (
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 pb-7 lg:flex-row">
          {lottieSrc && (
            <div className="flex w-full justify-center lg:w-1/3 lg:justify-start">
              <LottiePlayer
                src={lottieSrc}
                className="h-48 w-48 scale-110 md:h-64 md:w-64"
              />
            </div>
          )}
          <article
            className={`w-full text-center leading-8 ${lottieSrc ? "lg:w-2/3 lg:text-left" : ""}`}
          >
            {page.description && (
              <p className="mb-4 whitespace-pre-line">{page.description}</p>
            )}
            {pagePoints.length > 0 && (
              <ul className="list-none space-y-2 text-left">
                {pagePoints.map((point, idx) => (
                  <li
                    key={point.unishop_static_pages_point_id ?? `point-${idx}`}
                    className="flex items-start"
                  >
                    <FaCheck className="mr-2 mt-2 h-4 w-4 flex-shrink-0 text-red-500" />
                    {point.title}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </div>
      )}
    </>
  );
}

export function StaticPageCards({ page }: { page: StaticPage }) {
  const headings = getPageHeadings(page);
  if (headings.length === 0) return null;

  return (
    <>
      {headings.map((heading) => {
        const points = getHeadingPoints(heading);
        return (
          <div
            key={heading.unishop_static_pages_heading_id}
            className="w-full max-w-sm rounded-lg bg-red-100 p-6 shadow-md transition-all duration-300 hover:scale-105 dark:bg-slate-700"
          >
            <h2 className="mb-4 text-xl font-semibold text-red-600">
              {heading.title}
            </h2>
            {heading.description && (
              <p className="mb-4 text-left text-gray-700 dark:text-gray-300">
                {heading.description}
              </p>
            )}
            {points.length > 0 && (
              <ul className="list-none space-y-2 text-left">
                {points.map((point) => (
                  <li
                    key={point.unishop_static_pages_headings_point_id}
                    className="flex items-start gap-2"
                  >
                    <FaCheck className="h-4 w-4 flex-shrink-0 text-red-500" />
                    {point.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </>
  );
}

export function StaticPageCollapsibleSections({ page }: { page: StaticPage }) {
  const headings = getPageHeadings(page);
  const [openSections, setOpenSections] = useState<boolean[]>([]);

  useEffect(() => {
    setOpenSections(Array(headings.length).fill(false));
  }, [headings.length]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)),
    );
  };

  if (headings.length === 0) return null;

  return (
    <div className="mx-auto max-w-4xl">
      {headings.map((heading, index) => {
        const points = getHeadingPoints(heading);
        return (
          <div
            key={heading.unishop_static_pages_heading_id}
            className="mb-4 rounded-lg bg-red-100 p-5 shadow-lg dark:bg-slate-800"
          >
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => toggleSection(index)}
            >
              <h2 className="text-xl font-semibold text-red-600">
                {heading.title}
              </h2>
              {openSections[index] ? (
                <FaChevronUp className="text-gray-600 dark:text-gray-300" />
              ) : (
                <FaChevronDown className="text-gray-600 dark:text-gray-300" />
              )}
            </div>

            <div
              className={`mt-2 overflow-hidden rounded bg-white transition-all duration-300 ease-in-out dark:bg-slate-700 ${openSections[index] ? "max-h-[2000px]" : "max-h-0"
                }`}
            >
              <div className="mt-3 px-4 pb-4 pt-1 text-gray-800 dark:text-gray-100">
                {heading.description && (
                  <p className="mb-3 whitespace-pre-line">
                    {heading.description}
                  </p>
                )}
                {points.length > 0 && (
                  <ul className="ml-2 space-y-2 lg:ml-6">
                    {points.map((point) => (
                      <li
                        key={point.unishop_static_pages_headings_point_id}
                        className="flex items-start gap-2"
                      >
                        <FaCheck className="mt-1 flex-shrink-0 text-red-500" />
                        <span>{point.description}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function StaticPageImages({ page }: { page: StaticPage }) {
  const images = getPageImages(page);
  if (images.length === 0) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8">

        {images.map((img) => {
          const src = resolveMediaUrl(img.media_url ?? img.object_path ?? "");

          const cardContent = (
            <div className="group flex flex-col items-center justify-center transition-all duration-300">
              {src && (
                <div className="relative flex w-full justify-center bg-transparent">
                  <img
                    src={src}
                    alt={img.title || "Static Page Image"}
                    className="max-w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              )}
              {(img.title || img.description) && (
                <div className="p-5 text-center max-w-2xl">
                  {img.title && (
                    <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-red-500 dark:text-white">
                      {img.title}
                    </h3>
                  )}
                  {img.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {img.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          );

          if (img.link_url) {
            const isExternal =
              img.link_url.startsWith("http://") ||
              img.link_url.startsWith("https://");
            if (isExternal) {
              return (
                <a
                  key={img.unishop_static_pages_image_id}
                  href={img.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full cursor-pointer"
                >
                  {cardContent}
                </a>
              );
            } else {
              return (
                <Link
                  key={img.unishop_static_pages_image_id}
                  href={img.link_url}
                  className="block h-full cursor-pointer"
                >
                  {cardContent}
                </Link>
              );
            }
          }

          return (
            <div key={img.unishop_static_pages_image_id} className="h-full">
              {cardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface StaticPageContentProps {
  route: string;
  lottieSrc?: string;
  variant?: "default" | "cards" | "header-only";
  children?: React.ReactNode;
}

export function StaticPageContent({
  route,
  lottieSrc,
  variant = "default",
  children,
}: StaticPageContentProps) {
  const { page, loading } = useStaticPage(route);

  if (loading) return <LoadingSpinner />;
  if (!page) return null;

  if (variant === "header-only") {
    return <StaticPageHeader page={page} />;
  }

  if (variant === "cards") {
    return (
      <div className="relative z-[5] -mt-14 flex flex-wrap justify-center gap-14 px-8 text-center">
        <StaticPageCards page={page} />
        {children}
      </div>
    );
  }

  return (
    <div className="relative min-h-fit p-8">
      <StaticPageIntro page={page} lottieSrc={lottieSrc} />
      <StaticPageCollapsibleSections page={page} />
      <StaticPageImages page={page} />
      {children}
    </div>
  );
}
