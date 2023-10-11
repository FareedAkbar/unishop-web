import { JetBrains_Mono as FontMono, Inter as FontSans, Poppins as FontPoppins } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontPoppins = FontPoppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: "400"
})
