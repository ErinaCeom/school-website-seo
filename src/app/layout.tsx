import { Forum, Josefin_Sans } from "next/font/google";
import type { Metadata } from "next";
import ThemeRegistry from "../lib/themeRegistry";
import "./globals.css";
import { NavDrawer } from "@/components/";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Home | SPSC",
  description:
    "Welcome to YourSiteName – Stay updated with the latest notices, events, and announcements.",
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
      "Stay informed with real-time school notices, announcements, and events.",
    url: "https://1725c8f9-17ed-4275-a6b6-f1d9ce3f0f9a-00-tawpiv14ujl3.sisko.replit.dev/",
    siteName: "St.Philip's High school and College",
    images: [
      {
        url: "https://1725c8f9-17ed-4275-a6b6-f1d9ce3f0f9a-00-tawpiv14ujl3.sisko.replit.dev/images/opengraph/home.png",
        width: 1200,
        height: 630,
        alt: "SPSC - Homepage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | SPSC",
    description: "Stay updated with real-time notices and announcements.",
    images: ["https://1725c8f9-17ed-4275-a6b6-f1d9ce3f0f9a-00-tawpiv14ujl3.sisko.replit.dev/images/opengraph/home.png"],
    creator: "@yourTwitterHandle",
  },
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
