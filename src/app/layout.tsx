import { Forum, Josefin_Sans } from "next/font/google";
import type { Metadata } from "next";
import ThemeRegistry from "@/lib/themeRegistry";
import "./globals.css";
import { NavDrawer, InfoSnackBar, Footer } from "@/components/";

export const metadata: Metadata = {
  title: "Home | Saint Philip's high School and College",
  description:
    "Welcome to SPSC – St. Philip's High School and College offers enriching co-curricular activities and character-building programs for holistic growth.",
  keywords: [
    "school notices",
    "school announcements",
    "latest updates",
    "events",
    "student portal",
    "spsc",
    "dinajpur",
    "saint philip's high school and college",
    "st. philip's High school and college ",
    "saint philip's school",
    "about SPSC",
    "SPSC contact",  
    "dinajpur school list",
  ],
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  openGraph: {
    title: "Home | SPSC",
    description: "Official website of St.Philip's high School and College",
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
  },
};

//fonts imported from google fonts, also added as variables to use in css for both MUI and Next validation, use your copilot for better explanation
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

/*Navbar and footer in layout */
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
          <InfoSnackBar />
        </ThemeRegistry>
      </body>
    </html>
  );
}
