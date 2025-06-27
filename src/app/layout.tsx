import { Forum, Josefin_Sans } from "next/font/google";
import type { Metadata } from "next";
import ThemeRegistry from "../lib/themeRegistry";
import "./globals.css";
import { NavDrawer } from "@/components/";
import Footer from "@/components/footer";

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
          <NavDrawer titleName="SPSC" logoSrc="/logo.png" homePage/>
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
