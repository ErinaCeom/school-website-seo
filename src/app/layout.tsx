import { Forum, Josefin_Sans } from "next/font/google";
import type { Metadata } from "next";
import ThemeRegistry from "../lib/themeRegistry";
import "./globals.css";
import { NavDrawer } from "@/components/";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Home | SPSC",
  description:
    "Welcome to SPSC – Beyond academics, SPSC nurtures well-rounded individuals. St. Philip's High School and College offers enriching co-curricular activities and character-building programs for holistic growth.",
  keywords: [
    "school notices",
    "school announcements",
    "latest updates",
    "events",
    "student portal",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Home | SPSC",
    description:
      "Official website of St.Philip's high School and College",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "St.Philip's High school and College",
    images: [
      {
        url: "/images/opengraph/home.png",
        width: 1200,
        height: 630,
        alt: "SPSC - Homepage",
      },
    ],
    locale: "en_US",
    type: "website",
  }
};

const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-forum",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josefin.variable} ${forum.variable}`}>
        <ThemeRegistry>
          <NavDrawer titleName="SPSC" logoSrc="/logo.png" />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
