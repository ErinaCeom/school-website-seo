import React, { ReactNode } from "react";
import { Forum, Josefin_Sans } from "next/font/google";
import ThemeRegistry from "@/lib/themeRegistry";

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

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${josefin.variable} ${forum.variable}`}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
