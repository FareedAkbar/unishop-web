import Header from "~/components/ui-components/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-1">
      <Header />
      {children}
    </div>
  );
}
