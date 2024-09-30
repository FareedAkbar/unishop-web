"use client";
import { cn } from "~/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";

type itemsType = {
  title: string;
  description: string;
  link: string;
  image_path: StaticImageData;
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: itemsType[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <p className="mb-2 mt-4 font-serif text-xl font-bold text-red-600 dark:text-neutral-200">
        {" "}
        Popular Categories
      </p>
      <div
        className={cn(
          "grid grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-3",
          className,
        )}
      >
        {items.map((item, idx) => (
          <Link
            href={item.link}
            key={item.link}
            className="group relative block h-full w-full p-2"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 block h-full w-full rounded-3xl bg-red-500 dark:bg-slate-800/[0.8]"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>
                <div className="grid grid-cols-2">
                  <div>
                    <Image
                      src={item.image_path}
                      alt={item.title}
                      // layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="pl-2">{item.description}</div>
                </div>
              </CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-transparent bg-black p-4 group-hover:border-slate-700 dark:border-white/[0.2]",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "mt-4 font-serif font-bold tracking-wide text-zinc-100",
        className,
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mt-8 font-sans text-sm leading-relaxed tracking-wide text-zinc-400",
        className,
      )}
    >
      {children}
    </div>
  );
};
