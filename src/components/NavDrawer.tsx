"use client";

import React from "react";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import NavSectionDetails from "@/components/NavSectionDetails";
import NavAboutDetails from "@/components/NavAboutDetails";
import NavFacilitiesDetails from "@/components/NavFacilitiesDetails";
import NavStaffDetails from "@/components/NavStaffs";
import NavNoticeDetails from "@/components/NavNotice";

const NavAccordion = styled((props: React.ComponentProps<typeof Accordion>) => (
  <Accordion disableGutters {...props} />
))(() => ({
  backgroundColor: "#121212",
  color: "white",
  boxShadow: "none",
  border: "none",
  "&.Mui-expanded": {
    backgroundColor: "transparent",
  },
}));

const NavAccordionSummary = styled(
  ({
    isActive,
    isAnyExpanded,
    ...props
  }: {
    isActive: boolean;
    isAnyExpanded: boolean;
  } & React.ComponentProps<typeof AccordionSummary>) => (
    <AccordionSummary {...props} />
  ),
)(({ isActive, isAnyExpanded }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  margin: 0,
  minHeight: 0,
  fontFamily: "Forum, serif",
  fontSize: "2.5rem",
  fontWeight: 400,
  color: !isAnyExpanded || isActive ? "white" : "gray",
  transition: "color 0.3s ease",
  "&.Mui-expanded": {
    textDecoration: "underline",
    textDecorationThickness: "1px",
    textUnderlineOffset: "5px",
    minHeight: 0,
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: 0,
    padding: 0,
  },
}));

const navItems = [
  { id: "panel1", label: "About", content: <NavAboutDetails /> },
  { id: "panel2", label: "Sections", content: <NavSectionDetails /> },
  { id: "panel3", label: "Staff directory", content: <NavStaffDetails /> },
  { id: "panel4", label: "Facilities", content: <NavFacilitiesDetails /> },
  { id: "panel5", label: "Notices", content: <NavNoticeDetails /> },
];

const NavDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  return (
    <>
      {/* AppBar with Menu Button */}
      <AppBar position="static" sx={{ background: "black" }}>
        <Toolbar>
          <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <Typography
              variant="heading"
              className="font-heading"
              sx={{ fontWeight: 400 }}
            >
              SPSC
            </Typography>
          </Stack>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Fullscreen Top Drawer */}
      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            height: "100vh",
            width: "100vw",
            backgroundColor: "#121212",
            color: "white",
          },
        }}
      >
        {/* Drawer Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 2, width: "100%" }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <Typography
              variant="heading"
              className="font-heading"
              sx={{ fontWeight: 400 }}
            >
              SPSC
            </Typography>
          </Stack>
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{
              color: "white",
              border: 1,
              borderRadius: 999,
              borderColor: "gray",
              p: 0.5,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Navigation Links */}
        <Box
          sx={{ p: 2, position: "relative", height: "100%", overflow: "auto" }}
        >
          <Stack
            direction={isSmallScreen ? "column" : "row"}
            spacing={2}
            sx={{ height: "100%" }}
          >
            <Stack
              spacing={0}
              pb={10}
              sx={{ width: isSmallScreen ? "100%" : "30%" }}
            >
              {navItems.map(({ id, label, content }) => (
                <NavAccordion
                  key={id}
                  expanded={expanded === id}
                  onChange={handleChange(id)}
                >
                  <NavAccordionSummary
                    isActive={expanded === id}
                    isAnyExpanded={Boolean(expanded)}
                  >
                    {label}
                  </NavAccordionSummary>
                  {isSmallScreen && expanded === id && (
                    <AccordionDetails>{content}</AccordionDetails>
                  )}
                </NavAccordion>
              ))}
            </Stack>
            {!isSmallScreen && (
              <Box sx={{ width: "70%", px: 3 }}>
                {navItems.find((item) => item.id === expanded)?.content || null}
              </Box>
            )}
          </Stack>
        </Box>

        {/* Quick Links */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #474747",
            px: 2,
            py: 1,
            bgcolor: "#121212",
            overflowX: "auto",
            display: "flex",
            gap: 4,
          }}
        >
          <Typography
            sx={{
              color: "#474747",
              whiteSpace: "nowrap",
              p: 1,
              fontSize: "1.2rem",
            }}
          >
            Quick Links
          </Typography>
          {["Events", "Alumni", "Admission", "Contact", "Address"].map(
            (item) => (
              <Typography
                key={item}
                sx={{
                  whiteSpace: "nowrap",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  py: 1,
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  "&:hover": { color: "gray" },
                }}
              >
                {item}
              </Typography>
            ),
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default NavDrawer;
