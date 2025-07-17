"use client";

import React, { useEffect, useState } from "react";
import { Snackbar, Alert, IconButton, Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function InfoSnackBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Automatically open on page load after 5s
    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
    setOpen(true);
  }, []);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={20000} // Auto-dismiss after 20s
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        severity="info"
        variant="filled"
        onClose={handleClose}
        action={
          <IconButton
            size="large"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{ width: { sm: "100%", md: "40%" }, bgcolor: "#4662f0" }}
      >
        This site is not an official representation of SPSC nor affiliated with
        the institution. It is a student project for educational purposes only.
        For official information please visit{" "}
        <Link
          href="https://spscdnj.edu.bd/"
          target="_blank"
          underline="always"
          color="inherit"
        >
          www.spscdnj.edu.bd
        </Link>
      </Alert>
    </Snackbar>
  );
}
