import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity: "success" | "error";
  onClose: () => void;
}

const SnackbarAlert = ({
  open,
  message,
  severity,
  onClose,
}: SnackbarAlertProps) => (
  <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{ width: "100%" }}
      variant="filled"
    >
      {message}
    </Alert>
  </Snackbar>
);

export default React.memo(SnackbarAlert);
