import React from "react";
import {
  Container,
  Typography,
  Stack,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryFilter from "@/components/CategoryFilter";

import { getNotice } from "@/utils";

export default async function Notice({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  const notices = await getNotice(category);

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

      <Box sx={{ backgroundColor: "black", my: 2 }}>
        <Stack direction="row" gap={2}>
          <CategoryFilter />
          {/* Icon Buttons */}
          {[<FilterListIcon />, <SearchIcon />, <NotificationsNoneIcon />].map(
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
      <Stack spacing={3}>
        {notices.map((notice, i) => {
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
    </Container>
  );
}
