import React from "react";
import { Metadata } from "next";
import {
  Container,
  Typography,
  Stack,
  Box,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CategoryFilter from "@/components/CategoryFilter";
import SortFilter from "@/components/SortFilter";
import LoadMoreNoticeBtn from "@/components/LoadMoreNoticeBtn";

import { getNotice } from "@/utils";

export const generateMetadata = (): Metadata => {
  return {
    title: "All Notice",
    description: "Find all notices",
  };
};

export default async function Notice({
  searchParams,
}: {
  searchParams: { category?: string; limit?: string; sort?: string };
}) {
  const category = await searchParams.category;
  const sort = await searchParams.sort;
  const limit = parseInt(searchParams.limit || "2"); // default limit is 6
  const notices = await getNotice(category, sort);
  const renderedNotices = notices.slice(0, limit);
  const hasMore = notices.length > renderedNotices.length;

  return (
    <Container
      maxWidth="xl"
      sx={{ height: { xs: "max-content", md: "100vh" }, py: 10, border: 0 }}
    >
      <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
        All announcements
      </Typography>
      <Typography sx={{ fontSize: "1.2rem", color: "grey", lineHeight: 1 }}>
        Find all the announcements for all section and dates
      </Typography>

      {/* Action buttons */}
      <Box sx={{ backgroundColor: "black", my: 2 }}>
        <Stack direction="row" gap={2}>
          <CategoryFilter />
          <SortFilter/>
          {/* Icon Buttons */}
          {[ <SearchIcon />, <NotificationsNoneIcon />].map(
            (icon, i) => (
              <IconButton
                key={i}
                sx={{
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "12px",
                  p: 1.2,
                }}
              >
                {icon}
              </IconButton>
            ),
          )}
        </Stack>
      </Box>
      
      {/* Notice list */}
      <Stack spacing={3}>
        {renderedNotices.map((notice, i) => {
          return (
            <Stack key={i}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}
              >
                <Typography color="grey">
                  {new Date(notice.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    border: 3,
                    borderRadius: 8,
                    borderColor: "gray",
                    height: "1px",
                    alignSelf: "center",
                  }}
                />
                <Typography color="grey">{notice.category}</Typography>
              </Stack>
              <Link
                href="#"
                underline="always"
                color="inherit"
                sx={{
                  fontSize: { md: "1.2rem" },
                  fontFamily: "Josefin Sans",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {notice.title}
              </Link>
            </Stack>
          );
        })}
      </Stack>
      {hasMore && <LoadMoreNoticeBtn />}
    </Container>
  );
}
