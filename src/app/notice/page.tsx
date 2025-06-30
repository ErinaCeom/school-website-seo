"use client";
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

export default function Notice() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ height: { xs: "max-content", md: "100vh" }, py: 10, border: 1 }}
    >
      <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
        All announcements
      </Typography>
      <Typography sx={{ fontSize: "1.2rem", color: "grey", lineHeight: 1 }}>
        Find all the announcements for all section and dates
      </Typography>

      <Box sx={{ backgroundColor: "black", my: 2 }}>
        <Stack direction="row" spacing={2}>
          {/* High School Dropdown Button */}
          <Button
            variant="outlined"
            endIcon={<ExpandMoreIcon />}
            onClick={handleClick}
            sx={{
              color: "white",
              borderColor: "white",
              borderRadius: "12px",
              textTransform: "none",
              fontFamily: "Josefin Sans",
              fontSize: "16px",
              px: 2,
            }}
          >
            High school
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                backgroundColor: "#2a2a2a", // dark gray background
                color: "white", // white text
                borderRadius: "12px",
                minWidth: 160,
              },
            }}
          >
            <MenuItem onClick={handleClose}>Pre-Primary</MenuItem>
            <MenuItem onClick={handleClose}>Primary</MenuItem>
            <MenuItem onClick={handleClose}>High school</MenuItem>
            <MenuItem onClick={handleClose}>College</MenuItem>
          </Menu>
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

      <Stack spacing={2}>
        <Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}
          >
            <Typography color="grey">
              {new Date().toLocaleDateString("en-GB", {
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
            <Typography color="grey">High school </Typography>
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
            Pre-Primary class routine for extreme heat wave
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
