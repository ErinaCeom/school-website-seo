import React, { ReactNode } from "react";
import { Forum, Josefin_Sans } from "next/font/google";
import BottomNav from "@/components/admin/BottomNav";
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

export default function DashboardLayout({ children }: Props) {
  return (
    <html lang="en" className={`${josefin.variable} ${forum.variable}`}>
      <body>
        <ThemeRegistry>
          {children}
          <BottomNav />
        </ThemeRegistry>
      </body>
    </html>
  );
}
