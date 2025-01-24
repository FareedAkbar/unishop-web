import { Suspense } from "react";
import Footer from "~/components/footer";
import Spinner from "~/components/spinner";
import Header from "~/components/ui-components/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    <Suspense fallback={<Spinner/>}>
      <Header />
      {children}
      <Footer/>
      </Suspense>
    </>
  );
}
