import React from "react";
import { Metadata } from "next";
import {
  Container,
  Typography,
  Stack,
  Box,
  Link,
  Divider,
} from "@mui/material";
import { LoadMoreBtn } from "@/components/";
import ActionButtons from "@/components/notice/ActionButtons";

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
  const { category, sort, limit } = await searchParams;
  const limitNum = parseInt((limit) || "10"); // default limit is 10
  const notices = await getNotice(category, sort);
  const renderedNotices = notices.slice(0, limitNum);
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
        <ActionButtons />
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
      {hasMore && <LoadMoreBtn />}
    </Container>
  );
}
