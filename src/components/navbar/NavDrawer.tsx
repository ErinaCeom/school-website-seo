"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
import NavDetails from "./NavDetails";

// Styled MUI Accordion with custom dark theme and no box shadow
const NavAccordion = styled((props: React.ComponentProps<typeof Accordion>) => (
  <Accordion disableGutters {...props} />
))(() => ({
  color: "white",
  backgroundColor: "#121212",
  boxShadow: "none",
  border: "none",
  "&.Mui-expanded": {
    backgroundColor: "transparent",
  },
}));

// Styled AccordionSummary with responsive typography and active-state styles
const NavAccordionSummary = styled(
  ({
    isActive,
    isAnyExpanded,
    isSmallScreen,
    ...props
  }: {
    isActive: boolean;
    isAnyExpanded: boolean;
    isSmallScreen: boolean;
  } & React.ComponentProps<typeof AccordionSummary>) => (
    <AccordionSummary {...props} />
  ),
)(({ isActive, isAnyExpanded, isSmallScreen }) => ({
  paddingTop: 0,
  paddingBottom: 0,
  margin: 0,
  minHeight: 0,
  fontFamily: "Forum, serif",
  fontSize: isSmallScreen ? "2.5rem" : "4rem",
  fontWeight: 400,
  color: !isAnyExpanded || isActive ? "white" : "gray",
  transition: "color 0.3s ease",
  "&.Mui-expanded": {
    textDecoration: "underline",
    textDecorationThickness: "1px",
    textUnderlineOffset: "5px",
    minHeight: 0,
  },
  "&:hover": {
    color: "white",
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: 0,
    padding: 0,
  },
}));

// Props for NavDrawer component
interface NavDrawerProps {
  logoSrc?: string;
  titleName?: string;
  quickLinks?: string[];
}

// Centralized nav data object
const navDetailsItems = {
  about: [
    "About SPSC",
    "History of SPSC",
    "Message from principal",
    "Alumni",
    "Charity section",
  ],
  sections: ["Pre-Primary", "Primary", "Highschool", "College", "Charity"],
  staffs: ["Administration", "Academics", "Office Staff"],
  facilities: [
    "Language club",
    "Debate club",
    "Ecology club",
    "Sports club",
    "Scouts",
  ],
  notices: ["Recent notices", "All notices"],
};

// NavItem type for the navItems array
type NavItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

// List of navigable sections, each with pre-rendered NavDetails component
const navItems: NavItem[] = [
  {
    id: "panel1",
    label: "About",
    content: <NavDetails items={navDetailsItems.about} />,
  },
  {
    id: "panel2",
    label: "Sections",
    content: <NavDetails items={navDetailsItems.sections} />,
  },
  {
    id: "panel3",
    label: "Staff directory",
    content: <NavDetails items={navDetailsItems.staffs} />,
  },
  {
    id: "panel4",
    label: "Facilities",
    content: <NavDetails items={navDetailsItems.facilities} />,
  },
  {
    id: "panel5",
    label: "Notices",
    content: <NavDetails items={navDetailsItems.notices} />,
  },
];

// Framer Motion animation variants for staggered fade-in
const fadeVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// Main navigation drawer component
const NavDrawer: React.FC<NavDrawerProps> = ({
  logoSrc = "/logo.png",
  titleName = "SPSC",
  quickLinks = ["Events", "Alumni", "Admission", "Contact", "Address"],
}) => {
  const [open, setOpen] = React.useState(false); // Drawer open/close state
  const [expanded, setExpanded] = React.useState<string | false>(false); // Tracks currently expanded panel
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Toggles which accordion panel is expanded
  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // Opens or closes the drawer
  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  return (
    <>
      {/* Top AppBar with Logo and Menu Icon */}
      <AppBar position="static" sx={{ background: "black" }}>
        <Toolbar>
          <Stack direction="row" spacing={1} alignItems="center" flexGrow={1}>
            <Image src={logoSrc} alt="Logo" width={40} height={40} />
            <Typography
              variant="heading"
              className="font-heading"
              sx={{ fontWeight: 400 }}
            >
              {titleName}
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

      {/* Fullscreen Navigation Drawer */}
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
        {/* Drawer Header with Logo and Close Button */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 3, width: "100%" }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Image src={logoSrc} alt="Logo" width={50} height={50} />
            <Typography
              variant="heading"
              className="font-heading"
              sx={{ fontSize: "2rem" }}
            >
              {titleName}
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

        {/* Navigation Area: Accordions (Left) + Details Panel */}
        <Box
          sx={{ p: 2, position: "relative", height: "100%", overflow: "auto" }}
        >
          <Stack
            direction={isSmallScreen ? "column" : "row"}
            spacing={2}
            sx={{ height: "100%" }}
          >
            {/* Accordion List */}
            <Stack
              spacing={0}
              pb={10}
              sx={{ width: isSmallScreen ? "100%" : "30%" }}
            >
              {navItems.map(({ id, label, content }, i) => (
                <NavAccordion
                  key={id}
                  expanded={expanded === id}
                  onChange={handleChange(id)}
                >
                  {/* Accordion Title with animation */}
                  <motion.div
                    variants={fadeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <NavAccordionSummary
                      isActive={expanded === id}
                      isAnyExpanded={Boolean(expanded)}
                      isSmallScreen={isSmallScreen}
                    >
                      {label}
                    </NavAccordionSummary>
                  </motion.div>

                  {/* On mobile: show accordion content below title */}
                  {isSmallScreen && expanded === id && (
                    <AccordionDetails sx={{ fontSize: "1rem" }}>
                      {content}
                    </AccordionDetails>
                  )}
                </NavAccordion>
              ))}
            </Stack>

            {/* On desktop: show accordion content on the right side */}
            {!isSmallScreen && (
              <Box sx={{ width: "70%", px: 1, fontSize: "1.5rem" }}>
                <AnimatePresence mode="wait">
                  {expanded && (
                    <motion.div
                      key={expanded}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      {navItems.find((item) => item.id === expanded)?.content ||
                        null}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            )}
          </Stack>
        </Box>

        {/* Footer Quick Links section */}
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
          {quickLinks.map((item) => (
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
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default NavDrawer;
