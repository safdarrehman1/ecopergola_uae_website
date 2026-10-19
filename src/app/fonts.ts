import { Inter, Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";

export const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const fontArabicDisplay = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-arabic-display",
  display: "swap",
});

export const fontArabicSans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic-sans",
  display: "swap",
});
