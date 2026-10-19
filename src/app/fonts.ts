import { Playfair_Display, Inter, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";

export const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const fontArabicDisplay = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic-display",
  display: "swap",
});

export const fontArabicSans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic-sans",
  display: "swap",
});
