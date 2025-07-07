// components/LoadMoreButton.tsx
"use client";

import { Button, Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoadMoreButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLimit = parseInt(searchParams.get("limit") || "10");
//  const category = searchParams.get("category") || "all";

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", (currentLimit + 10).toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Box textAlign="center" mt={4}>
      <Button
        variant="outlined"
        size="small"
        onClick={handleClick}
        sx={{
          borderRadius: 2,
          borderColor: "white",
          color: "white",
        }}
      >
        Load More
      </Button>
    </Box>
  );
}
