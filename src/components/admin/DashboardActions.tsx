import React from "react";
import {
  Box,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  CircularProgress,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

interface DashboardActionsProps {
  selectMode: boolean;
  selectedCount: number;
  deleting?: boolean;
  onAdd: () => void;
  onSelect: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

const DashboardActions = ({
  selectMode,
  selectedCount,
  deleting = false,
  onAdd,
  onSelect,
  onDelete,
  onCancel,
}: DashboardActionsProps) => (
  <Box
    sx={{
      position: "fixed",
      bottom: 16,
      right: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 2,
      zIndex: 9999,
    }}
  >
    {!selectMode ? (
      <SpeedDial
        ariaLabel="Dashboard actions"
        icon={
          <SpeedDialIcon icon={<MoreHorizIcon />} openIcon={<CloseIcon />} />
        }
        direction="up"
        FabProps={{ sx: { bgcolor: "#0090FF" } }}
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Create"
          onClick={onAdd}
        />
        <SpeedDialAction
          icon={<ChecklistRtlIcon />}
          tooltipTitle="Select"
          onClick={onSelect}
        />
      </SpeedDial>
    ) : (
      <>
        {selectedCount > 0 && (
          <Fab
            color="error"
            onClick={onDelete}
            aria-label="delete"
            sx={{ bgcolor: "error.main", "&:hover": { bgcolor: "error.dark" } }}
          >
            {deleting ? (
              <CircularProgress
                size={24}
                color="inherit"
                sx={{ position: "absolute" }}
              />
            ) : (
              <DeleteIcon />
            )}
          </Fab>
        )}
        <Fab
          color="primary"
          onClick={onCancel}
          aria-label="cancel-selection"
          disabled={deleting}
          sx={{
            "&.Mui-disabled": {
              bgcolor: "#5e5e5e",
              color: "#cccccc",
            },
          }}
        >
          <CloseIcon />
        </Fab>
      </>
    )}
  </Box>
);

export default React.memo(DashboardActions);
