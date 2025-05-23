import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const sectionItems = [
  "Recent notices",
  "All notices",
];

export default function NavNoticeDetails() {
  return (
    <List disablePadding>
      {sectionItems.map((label, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            disableRipple
            component="a"
            href={`/${label.toLowerCase().replace(/\s+/g, "-")}`}
            sx={{
              px: 1.5,
              py: 1,
              color: "white",
              "&:hover .MuiListItemIcon-root": {
                color: "white",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontSize: "1rem" }}
              />
              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  color: "gray",
                  transition: "color 0.3s ease",
                }}
              >
                <ArrowOutwardIcon fontSize="small" />
              </ListItemIcon>
            </Box>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
