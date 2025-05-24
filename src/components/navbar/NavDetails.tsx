import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

interface AnimatedNavListProps {
  items: string[];
}

export default function NavDetails({ items }: AnimatedNavListProps) {
  return (
    <List
      component={motion.ul}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      disablePadding
    >
      {items.map((label, index) => (
        <ListItem
          key={index}
          component={motion.li}
          variants={itemVariants}
          disablePadding
        >
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
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