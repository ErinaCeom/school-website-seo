"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowserClient";
import { Box, CircularProgress } from "@mui/material";
import { Forum, Josefin_Sans } from "next/font/google";
import ThemeRegistry from "@/lib/themeRegistry";
import LoginForm from "@/components/admin/LoginForm";

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

export default function Admin() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  //check auth
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabaseBrowser.auth.getUser();
      if (!user) {
        setIsLoading(false);
      } else {
        router.replace("/admin/dashboard");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <html lang="en">
      <body
        className={`${josefin.variable} ${forum.variable}`}
        style={{ background: "black", color: "white" }}
      >
        <ThemeRegistry>
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLoading ? <CircularProgress /> : <LoginForm />}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
