"use client";
import { Suspense } from "react";
import Footer from "~/components/footer";
import CategoriesSidebar from "~/components/ui-components/CategoriesSideBar";
import Header from "~/components/ui-components/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header at top */}
      <Header />

      {/* Main content with sidebar + children */}
      <div className="flex flex-1">
        {/* Sidebar on the left (visible only on large screens) */}
        {/* <aside className="hidden w-fit lg:block">
          <CategoriesSidebar />
        </aside> */}

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
