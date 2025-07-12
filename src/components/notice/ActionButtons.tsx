// components/ActionButton.tsx
"use client";
import React from "react";
import { Stack, IconButton } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useSearchParams } from "next/navigation";

import CategoryFilter from "./actionButtons/CategoryFilter";
import SortFilterMenu from "./actionButtons/SortFilter";
import SearchBar from "./actionButtons/SearchBar";

export default function ClientNoticeControls() {
  const searchParams = useSearchParams();
  const hasQuery = !!searchParams.get("q");

  // this state fully drives hiding/showing
  const [searchOpen, setSearchOpen] = React.useState(hasQuery);
  React.useEffect(() => {
    setSearchOpen(!!searchParams.get("q"));
  }, [searchParams]);

  return (
    <>
      <Stack direction="row" gap={2}>
        <>
          {!searchOpen && (
            <>
              <CategoryFilter />
              <SortFilterMenu />
            </>
          )}
          <SearchBar searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
          {!searchOpen && (
            <>
              <IconButton
                sx={{
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "12px",
                  p: 1.2,
                  "&.Mui-disabled": {
                    color: "gray",
                    borderColor: "gray",
                  },
                }}
                disabled
              >
                <NotificationsNoneIcon />
              </IconButton>
            </>
          )}
        </>
      </Stack>
    </>
  );
}
