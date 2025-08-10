"use client";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ViewListIcon from "@mui/icons-material/ViewList";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Notices", icon: <ViewListIcon />, path: "/admin/dashboard" },
  { label: "Create", icon: <EditIcon />, path: "/admin/dashboard/create" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const index = navItems.findIndex((item) => item.path === pathname);
    if (index !== -1) setValue(index);
  }, [pathname]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.push(navItems[newValue].path);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{ bgcolor: "#000", borderTop: 1, borderColor: "gray" }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            sx={{ color: "#fff" }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
