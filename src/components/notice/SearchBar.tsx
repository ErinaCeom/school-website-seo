// components/SearchBar.tsx
"use client";
import React from "react";
import {
  IconButton,
  InputBase,
  Box,
  ClickAwayListener,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({
  searchOpen,
  setSearchOpen,
}: {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") || "";
  const [query, setQuery] = React.useState(initial);
  const width = searchOpen ? "100%" : "auto";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query.trim()) params.set("q", query.trim());
    else params.delete("q");
    router.replace(`?${params.toString()}`, { scroll: false });
    setSearchOpen(!!query.trim());
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    router.replace(`?${params.toString()}`, { scroll: false });
    setSearchOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={() => !query && setSearchOpen(false)}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: width,
        }}
      >
        {!searchOpen && (
          <IconButton
            onClick={() => setSearchOpen(true)}
            sx={{
              color: "white",
              border: "1px solid white",
              borderRadius: "12px",
              p: 1.2,
            }}
          >
            <SearchIcon />
          </IconButton>
        )}
        <AnimatePresence mode="wait">
          {searchOpen && (
            <motion.div
              key="search-bar"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 0.5,
                  border: 1,
                  borderRadius: 2,
                  borderColor: "white",
                  bgcolor: "black",
                  color: "white",
                  width: "100%",
                  boxShadow: 3,
                }}
              >
                <InputBase
                  autoFocus
                  placeholder="Search notices..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  sx={{ color: "white", flex: 1 }}
                />
                <IconButton type="submit" sx={{ color: "white" }}>
                  <SearchIcon />
                </IconButton>
                <IconButton onClick={handleClear} sx={{ color: "white" }}>
                  <CloseIcon />
                </IconButton>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ClickAwayListener>
  );
}
