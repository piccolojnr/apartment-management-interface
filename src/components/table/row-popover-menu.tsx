import { Button, IconButton, Popover, TableCell } from "@mui/material";
import { useState } from "react";
import Iconify from "../iconify";

interface RowPopoverMenuProps {
  handleDelete?: () => void;
  handleOpenModal?: () => void;
  handleSendSms?: () => void;
  modal?: any;
}
export default function RowPopoverMenu({
  handleDelete,
  handleOpenModal,
  handleSendSms,
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
        {handleSendSms && (
          <Button
            onClick={handleSendSms}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <Iconify icon="eva:phone-fill" sx={{ mr: 2 }} />
            Send SMS
          </Button>
        )}
        {handleOpenModal && (
          <Button
            onClick={handleOpenModal}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </Button>
        )}

        {handleDelete && (
          <Button
            onClick={handleDelete}
            sx={{
              color: "error.main",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
            Delete
          </Button>
        )}
      </Popover>
      <IconButton onClick={handleOpenMenu}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </>
  );
}
