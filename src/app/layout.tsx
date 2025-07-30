import { Forum, Josefin_Sans } from "next/font/google";
import ThemeRegistry from "@/lib/themeRegistry";
import "./globals.css";

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
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
