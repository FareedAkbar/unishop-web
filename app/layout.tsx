"use client"

import "@/styles/globals.css"
import { usePathname } from "next/navigation"
import { ContextGlobal } from "@/context/ContextGlobal"

import { fontPoppins } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Footer from "@/components/footer/Footer"
import HeaderSignup from "@/components/header/HeaderSignup"
import { metadata } from "@/components/metadata/metadata"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { TestDropDown } from "@/components/testDropDown/TestDropDown"
import ZodTost from "@/components/testDropDown/ZodTost"
import { ThemeProvider } from "@/components/theme-provider"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const path = usePathname()
  const isLoginPage = path === "/login"
  const isSignupPage = path === "/signup"

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Use the metadata object here */}
          <title>{metadata.title.default}</title>
          <meta name="description" content={metadata.description} />
          {/* ...other head elements... */}
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-poppins antialiased",
            fontPoppins.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              {isLoginPage || isSignupPage ? null : <HeaderSignup />}
              {isLoginPage || isSignupPage ? null : <SiteHeader />}
              <ContextGlobal>
                <div className="flex-1">{children}</div>
              </ContextGlobal>
              {isLoginPage || isSignupPage ? null : <Footer />}
              {/* <TestDropDown />
              {/* <ZodTost /> */}
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
