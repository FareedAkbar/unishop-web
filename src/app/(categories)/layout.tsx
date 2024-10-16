'use client'
import Footer from "~/components/footer";
import CategoriesSidebar from "~/components/ui-components/CategoriesSideBar";
import Header from "~/components/ui-components/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <CategoriesSidebar className=" top-[calc(100px)] lg:block hidden" />
      {children}
      <Footer/>
    </>
  );
}
