"use client";
import dynamic from "next/dynamic";
import { Controls, Player } from "@lottiefiles/react-lottie-player";

import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "~/components/ui/3d-card";

const MapContainerComponent = dynamic(() => import("~/components/map"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div>
      <main className="min-h-screen">
        <div className="grid h-[40rem] w-full items-center justify-between sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex flex-col">
            <h2 className="relative z-20 mx-auto mt-32 text-center font-serif text-2xl font-bold tracking-tight text-red-600 dark:text-white md:text-4xl lg:text-5xl">
              Welcome to UniShop
            </h2>

            <p className="text-1xl inter-var relative left-0 top-[1px] bg-gradient-to-r from-zinc-600 via-zinc-600 to-zinc-500 bg-clip-text bg-no-repeat py-4 text-center font-sans text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)] md:text-2xl lg:text-2xl">
              Your one-stop shop for all your official UOW Merchandise, study
              essentials, textbooks, course notes and equipment and graduation
              memorabilia and gowns.
            </p>
          </div>
          <div className="mx-auto text-left">
            <Player
              autoplay
              loop
              src={'/book.json'}
              style={{ height: "500px", width: "500px" }}
            >
              <Controls buttons={["play", "repeat", "frame", "debug"]} />
            </Player>
          </div>
        </div>
        <div className="flex justify-center px-8">
          <div className="grid w-full max-w-screen-xl grid-cols-8 gap-4">
          </div>
        </div>
        <div className="flex justify-center px-8">
          <div className="grid w-full max-w-screen-xl grid-cols-8 gap-4">
            {/* Your content goes here */}
            <div className="col-span-8 sm:col-span-12">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12 md:col-span-6">
                  <CardContainer className="inter-var">
                    <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
                      <CardItem translateZ="50">
                        <div className="font-serif text-xl font-bold text-red-600 dark:text-white">
                          ABOUT UNISHOP
                        </div>
                      </CardItem>
                      <CardItem as="div" translateZ="60">
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                          Welcome to UniShop, your one-stop shop for all your
                          official UOW Merchandise, study essentials, textbooks,
                          course notes, equipment, and graduation memorabilia
                          and gowns.
                        </p>
                      </CardItem>
                      <CardItem translateZ="100">
                        <div className="mt-4 flex w-max justify-center">
                          <Image
                            src={'/homePage/about-us-side.jpg'}
                            objectFit="contain"
                            className="h-60 w-auto rounded-xl object-cover group-hover/card:shadow-xl"
                            alt="thumbnail"
                          />
                        </div>
                      </CardItem>
                      <CardItem as="div" translateZ="60">
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                          UniShop is a UOW Pulse business, with all proceeds
                          from everything you buy going straight back to
                          enhancing the student experience on campus. Whether
                          that’s through events, festivals, competitions, or
                          through our clubs and societies. Thank you for
                          supporting the UOW campus experience.
                        </p>
                      </CardItem>
                      <div className="mt-20 flex items-center justify-between">
                        <CardItem translateZ={20} as={Link} href="/about">
                          <div className="rounded-xl bg-zinc-600 to-neutral-600 px-4 py-2 text-xs font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:bg-zinc-800 dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
                            ABOUT
                          </div>
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <CardContainer className="inter-var">
                    <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
                      <CardItem translateZ="50">
                        <div className="font-serif text-xl font-bold text-red-600 dark:text-white">
                          CONTACT US
                        </div>
                      </CardItem>
                      <CardItem as="div" translateZ="60">
                        <p className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300">
                          The UniShop team are here to help! Providing friendly,
                          personalised service to make sure you’re fully
                          satisfied with your shopping experience from start to
                          finish.
                        </p>
                      </CardItem>
                      <MapContainerComponent height={400} />
                      <CardItem as="div" translateZ="60">
                        <p className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300">
                          Give us a call or send us an email if you have an
                          enquiry.
                        </p>
                      </CardItem>
                      <div className="mt-5 flex items-center justify-between">
                        <CardItem translateZ={20} as={Link} href="/contact-us">
                          <div className="rounded-xl bg-zinc-600 to-neutral-600 px-4 py-2 text-xs font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:bg-zinc-800 dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
                            CONTACT US
                          </div>
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
