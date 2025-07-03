"use client";

import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function SortFilterMenu() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest";

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (sortValue?: string) => {
    setAnchorEl(null);
    if (sortValue && sortValue !== currentSort) {
      const params = new URLSearchParams(searchParams);
      params.set("sort", sortValue);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <>
      <Tooltip
        title={`Sort: ${sortOptions.find((o) => o.value === currentSort)?.label}`}
      >
        <IconButton
          onClick={handleClick}
          sx={{
            color: "white",
            border: "1px solid white",
            borderRadius: "12px",
            p: 1.2,
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          sx: {
            mt: 1,
            backgroundColor: "black",
            color: "white",
            border: 1,
            borderColor: "white",
            borderRadius: 2,
            minWidth: 160,
            "& .MuiMenuItem-root": {
              "&.Mui-selected": {
                color: "dodgerblue",
              },
            },
          },
        }}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentSort}
            onClick={() => handleClose(option.value)}
          >
            <Typography>{option.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
