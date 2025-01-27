import Footer from "~/components/footer";
import Header from "~/components/ui-components/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    
      <Header />
      {children}
      <Footer />
    
    </>
  );
}
