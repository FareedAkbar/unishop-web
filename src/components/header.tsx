"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
} from "~/components/ui/navBar/navbar-menu";
import { useAuthContext } from "~/Context/AuthContext";
import { cn } from "~/lib/utils";


export default function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { getGenre, genre, checkoutData } = useAuthContext();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Prevents further API calls on first render
    } else {
      getGenre().then((res) => {
        console.log(res);

      }).catch((err) => {
        console.log(err);
      });
    }

  }, [])

  return (
    <div className={cn("w-xl fixed inset-x-0 top-5 z-50 mx-auto", className)}>
      <div className="">
        <Menu setActive={setActive}>
          <Link
            onMouseEnter={() => setActive(null)}
            href="/"
            className="hidden text-neutral-700 hover:text-black dark:text-neutral-200 md:text-xs lg:block font-sans"
          >
            HOME
          </Link>
          {checkoutData?.booknet_customer_id && (
            <Link
              onMouseEnter={() => setActive(null)}
              href={`my-orders`}
              className="hidden text-neutral-700 hover:text-black dark:text-neutral-200 md:text-xs lg:block font-sans"
            >
              MY ORDERS
            </Link>
          )}

          <MenuItem setActive={setActive} active={active} item="TEXTBOOKS">
            {/* <div className="grid gap-6 p-4 text-sm xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 overflow-y-auto max-h-[80vh]"> */}
            {/* <div className="animate-pulse rounded-lg bg-white p-4 shadow-md">
                <div className="flex gap-2">
                  <div>
                    <div className="mb-2 h-32 w-28 rounded bg-gray-300"></div>
                  </div>
                  <div className="grow">
                    <div className="mb-2 h-8 w-full rounded bg-gray-300"></div>
                    <div className="mb-2 h-4 w-32 rounded bg-gray-300"></div>
                    <div className="mb-2 h-4 w-28 rounded bg-gray-300"></div>
                  </div>
                </div>
              </div> */}
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href={`textbooks?detail=${"Engineering and Information Sciences EIS"}`}>
                ENGINEERING AND INFORMATION SCIENCES EIS
              </HoveredLink>
              <HoveredLink href={`textbooks?detail=${"Science, Medicine & Health SMAH"}`}>
                SCIENCE, MEDICINE & HEALTH SMAH
              </HoveredLink>
              <HoveredLink href={`textbooks?detail=${"Business and Law BAL"}`}>
                BUSINESS AND LAW BAL
              </HoveredLink>
              <HoveredLink href={`textbooks?detail=${"Arts, Social Sciences & Humanities ASSH"}`}>
                ARTS, SOCIAL SCIENCES & HUMANITIES ASSH
              </HoveredLink>
            </div>
            {/* <ProductItem
                title="Engineering and Information Sciences EIS"
                href={`books?detail=${"Engineering and Information Sciences EIS"}`}
                src="https://assets.aceternity.com/demos/algochurn.webp"
                description="Prepare for tech interviews like never before."
                setActive={setActive}
              />
              <ProductItem
                title="Science, Medicine & Health SMAH"
                href={`books?detail=${"Science, Medicine & Health SMAH"}`}
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                description="Production ready Tailwind css components for your next project"
                setActive={setActive}
              />
              <ProductItem
                title="Business and Law BAL"
                href={`books?detail=${"Business and Law BAL"}`}
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                description="Never write from scratch again. Go from idea to blog in minutes."
                setActive={setActive}
              />
              <ProductItem
                title="Arts, Social Sciences & Humanities ASSH"
                href={`books?detail=${"Arts, Social Sciences & Humanities ASSH"}`}
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                setActive={setActive}
              /> */}
            {/* </div> */}
          </MenuItem>

          <Link
            onMouseEnter={() => setActive(null)}
            href={`https://unishopuow.vitalsource.com/`}
            className="hidden text-neutral-700 hover:text-black dark:text-neutral-200 md:text-xs lg:block font-sans"
          >
            E-TEXTBOOKS
          </Link>

          <MenuItem setActive={setActive} active={active} item="BOOKS">
            <div className="flex flex-col space-y-4 text-sm">
              {genre?.map((item, index) =>
                <HoveredLink key={index} href={`books?detail=${item.genre}`}>
                  {item.genre}
                </HoveredLink>
              )}

              {/* <HoveredLink href={`books?detail=${"NON-FICTION"}`}>
                NON-FICTION
              </HoveredLink>
              <HoveredLink href={`books?detail=${"CHILDREN'S BOOKS"}`}>
                CHILDREN&apos;S BOOKS
              </HoveredLink>
              <HoveredLink href={`books?detail=${"TRAVEL GUIIDES"}`}>
                TRAVEL GUIIDES
              </HoveredLink> */}
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="UHO MERCH & CLOTHING">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href={`cloths?detail=${"MERCHANDISE"}`}>
                MERCHANDISE
              </HoveredLink>
              <HoveredLink href={`cloths?detail=${"GRADUATION"}`}>
                GRADUATION
              </HoveredLink>
              <HoveredLink href={`cloths?detail=${"CLOTHING"}`}>
                CLOTHING
              </HoveredLink>
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="GIFTS">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href={`gifts?detail=${"ERSTWILDER"}`}>
                ERSTWILDER
              </HoveredLink>
              <HoveredLink href={`gifts?detail=${"INDIGENOUS ART MERCH"}`}>
                INDIGENOUS ART MERCH
              </HoveredLink>
              <HoveredLink href={`gifts?detail=${"IMAGINE HOMEWARES"}`}>
                IMAGINE HOMEWARES
              </HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
