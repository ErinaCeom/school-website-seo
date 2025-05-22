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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NavSectionDetails from "@/components/NavSectionDetails";

const NavAccordion = styled((props: React.ComponentProps<typeof Accordion>) => (
  <Accordion disableGutters {...props} />
))(({}) => ({
  backgroundColor: "#121212",
  color: "white",
  boxShadow: "none",
  border: "none",
  "&.Mui-expanded": {
    backgroundColor: "transparent",
  },
}));

const NavAccordionSummary = styled(AccordionSummary)(({}) => ({
  paddingTop: 0,
  paddingBottom: 0,
  margin: 0,
  minHeight: 0,
  fontFamily: "Forum, serif",
  fontSize: "2.5rem",
  fontWeight: 400,
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

const NavDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);

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
          <Stack direction="row" spacing={1} alignItems="center" flexGrow="1">
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
        {/* Drawer top */}
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
          sx={{
            p: 2,
            position: "relative",
            height: "100%",
            overflow: "scroll",
          }}
        >
          <Stack spacing={0} pb={5}>
            <NavAccordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <NavAccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
              >
                About
              </NavAccordionSummary>
              <AccordionDetails sx={{ fontSize: "2.2rem" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </NavAccordion>

            <NavAccordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <NavAccordionSummary
                aria-controls="panel2-content"
                id="panel2-header"
              >
                Sections
              </NavAccordionSummary>
              <AccordionDetails>
                <NavSectionDetails />
              </AccordionDetails>
            </NavAccordion>

            <NavAccordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
              disableGutters
            >
              <NavAccordionSummary
                aria-controls="panel3-content"
                id="panel3-header"
              >
                Faculty
              </NavAccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </NavAccordion>

            <NavAccordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
              disableGutters
            >
              <NavAccordionSummary
                aria-controls="panel3-content"
                id="panel3-header"
              >
                Facilities
              </NavAccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </NavAccordion>

            <NavAccordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
              disableGutters
            >
              <NavAccordionSummary
                aria-controls="panel3-content"
                id="panel3-header"
              >
                Notices
              </NavAccordionSummary>
              <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </AccordionDetails>
            </NavAccordion>
          </Stack>
        </Box>

        {/* Quick Links */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            borderTop: "1px solid white",
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
              color: "gray",
              whiteSpace: "nowrap",
              p: 1,
              pl: 1,
              fontSize: "1.2rem",
            }}
          >
            Quick Links
          </Typography>
          {["Events", "Alumni", "Admission", "Contact", "Address"].map(
            (item, index) => (
              <Typography
                key={index}
                sx={{
                  whiteSpace: "nowrap",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  pt: 1,
                  pb: 1,
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
