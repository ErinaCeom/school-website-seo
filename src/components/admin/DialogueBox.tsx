import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

interface DialogueBoxProps {
  open: boolean;
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  confirmColor?:
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "info"
    | "warning";
  confirmDisabled?: boolean;
  confirmProgress?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DialogueBox = React.memo(
  ({
    open,
    title,
    content,
    confirmText,
    cancelText,
    confirmColor = "primary",
    confirmDisabled = true,
    confirmProgress = true,
    onClose,
    onConfirm,
  }: DialogueBoxProps) => (
    <Dialog
      open={open}
      onClose={confirmProgress ? undefined : onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          bgcolor: "#1b1d21",
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description" color="white">
          {content}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          color="inherit"
          disabled={confirmProgress}
          sx={{
            "&.Mui-disabled": {
              backgroundColor: "#3b3b3b",
              color: "gray",
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
          autoFocus
          disabled={confirmDisabled || confirmProgress}
          startIcon={
            confirmProgress ? (
              <CircularProgress size={16} color="inherit" />
            ) : null
          }
          sx={{
            "&.Mui-disabled": {
              backgroundColor: "#cccccc",
              color: "gray",
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  ),
);

DialogueBox.displayName = "DialogueBox";

export default DialogueBox;
