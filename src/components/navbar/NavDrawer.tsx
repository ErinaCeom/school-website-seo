// https://github.com/MrTeraByte/Harvard-nav-bar-in-MUI

"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  useScrollTrigger,
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
  backgroundColor: "#000000",
  boxShadow: "none",
  border: "none",
  "&.Mui-expanded": {
    backgroundColor: "transparent",
  },
}));

// Styled AccordionSummary with responsive typography and active-state styles
// the items in the navbar
const NavAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: (prop: string) =>
    !["isActive", "isAnyExpanded", "isSmallScreen"].includes(prop),
})<{
  isActive: boolean;
  isAnyExpanded: boolean;
  isSmallScreen: boolean;
}>(({ isActive, isAnyExpanded, isSmallScreen }) => ({
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
  "&:active": {
    textDecoration: "underline",
    textDecorationThickness: "1px",
    textUnderlineOffset: "5px",
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

// Centralized nav data object with custom href mappings
const navDetailsItems = {
  about: [
    { label: "About SPSC", href: "/about" },
    { label: "History of SPSC", href: "/about/history" },
    { label: "Message from principal", href: "/about/principal-message" },
    { label: "Alumni", href: "/alumni" },
    { label: "Charity section", href: "/charity" },
  ],
  sections: [
    { label: "Pre-Primary", href: "/sections/pre-primary" },
    { label: "Primary", href: "/sections/primary" },
    { label: "Highschool", href: "/sections/highschool" },
    { label: "College", href: "/sections/college" },
    { label: "Charity", href: "/charity" },
  ],
  staffs: [
    { label: "Administration", href: "/staff/administration" },
    { label: "Academics", href: "/staff/academics" },
    { label: "Office Staff", href: "/staff/office" },
  ],
  facilities: [
    { label: "Language club", href: "/facilities/language-club" },
    { label: "Debate club", href: "/facilities/debate-club" },
    { label: "Ecology club", href: "/facilities/ecology-club" },
    { label: "Sports club", href: "/facilities/sports-club" },
    { label: "Scouts", href: "/facilities/scouts" },
  ],
  notices: [
    { label: "Recent notices", href: "/notice?sort=newest" },
    { label: "All notices", href: "/notice" },
  ],
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

// Props for NavDrawer component
interface NavDrawerProps {
  logoSrc?: string;
  titleName?: string;
  quickLinks?: string[];
}

// Main navigation drawer component
const NavDrawer: React.FC<NavDrawerProps> = ({
  logoSrc = "/logo.png",
  titleName = "SPSC",
  quickLinks = ["Events", "Alumni", "Admission", "Contact", "Address"],
}) => {
  const [open, setOpen] = React.useState(false); // Drawer open/close state
  const [expanded, setExpanded] = React.useState<string | false>(false); // Tracks currently expanded panel
  const theme = useTheme();
  const isHomePage = usePathname() === "/";
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const scrolledEnough = useScrollTrigger({
    disableHysteresis: true,
    threshold: 400,
  });

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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <AppBar
          elevation={0}
          position="fixed"
          sx={{
            background: `${isHomePage ? (scrolledEnough ? "black" : "transparent") : "linear-gradient(to bottom,rgba(0,0,0,1), rgba(0,0,0,0.1))"}`,
            p: { sm: 0, md: 1, lg: 1 },
            transition: "background 0.4s ease-in",
          }}
        >
          <Toolbar>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexGrow={1}
              component="a"
              href="/"
            >
              <Image
                src={logoSrc}
                alt="Logo"
                width={60}
                height={60}
                style={{
                  width: isSmallScreen ? 40 : 60,
                  height: isSmallScreen ? 40 : 60,
                }}
              />
              <Typography
                sx={{
                  fontSize: {
                    xs: "larger",
                    sm: "larger",
                    md: "2rem",
                    lg: "2rem",
                  },
                  fontFamily: "Forum, serif",
                  fontWeight: 400,
                }}
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
              <MenuIcon fontSize={isSmallScreen ? "medium" : "large"} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </motion.div>

      {/* Fullscreen Navigation Drawer */}
      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            height: "100vh",
            width: "100vw",
            backgroundColor: "#000000",
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
            <Image
              src={logoSrc}
              alt="Logo"
              width={50}
              height={50}
              style={{
                width: isSmallScreen ? 40 : 50,
                height: isSmallScreen ? 40 : 50,
              }}
            />
            <Typography
              variant="h5"
              sx={{ fontSize: { lg: "2rem" }, fontFamily: "Forum,serif" }}
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
              mr: { xs: 0, sm: 0, md: 2, lg: 2, xl: 2 },
            }}
          >
            <CloseIcon fontSize={isSmallScreen ? "medium" : "large"} />
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
            bgcolor: "#000000",
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
