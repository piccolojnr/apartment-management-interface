import { IconButton, Popover, TableCell } from "@mui/material";
import { useState } from "react";
import Iconify from "../iconify";
import { LoadingButton } from "@mui/lab";

interface RowPopoverMenuProps {
  handleDelete?: () => void;
  loadingDelete?: boolean;
  loadingUpdate?: boolean;
  handleOpenModal?: () => void;
  modal?: any;
}
export default function RowPopoverMenu({
  handleDelete,
  handleOpenModal,
  loadingDelete,
  loadingUpdate,
}: RowPopoverMenuProps) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = async () => {
    setOpen(null);
  };

  return (
    <>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {handleOpenModal && (
          <LoadingButton
            onClick={handleOpenModal}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
            }}
            loading={loadingUpdate}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </LoadingButton>
        )}

        {handleDelete && (
          <LoadingButton
            onClick={handleDelete}
            sx={{
              color: "error.main",
              width: "100%",
              justifyContent: "flex-start",
            }}
            loading={loadingDelete}
          >
            <Iconify
              icon={
                loadingDelete ? "eva:loader-2-outline" : "eva:trash-2-outline"
              }
              sx={{
                mr: 2,
                color: loadingDelete ? "text.disabled" : "error.main",
              }}
            />
            Delete
          </LoadingButton>
        )}
      </Popover>
      <IconButton onClick={handleOpenMenu}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </>
  );
}
