"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowserClient";
import { Box, CircularProgress } from "@mui/material";
import LoginForm from "@/components/admin/LoginForm";

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
  );
}
