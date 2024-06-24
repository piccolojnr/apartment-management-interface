import { useState } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";

import Iconify from "../../components/iconify";
import AppModal from "../../components/app-modal";
import { LoadingButton } from "@mui/lab";
import { CustomTableRowProps, Data } from "../../types/table";

// ----------------------------------------------------------------------

export default function CustomTableRow({
  selected,
  data,
  handleClick,
  fetchData,
  UpdateModal,
  updateSingleData,
  onDelete,
  Cell,
}: CustomTableRowProps) {
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = async () => {
    setOpenModal(false);
    setOpen(null);
    fetchData();
  };

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = async () => {
    setOpen(null);
    fetchData();
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      onDelete(data);
    } catch (error) {
      console.error("Failed to delete ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {UpdateModal && (
        <AppModal handleClose={handleCloseModal} open={openModal}>
          <UpdateModal
            isUpdate={true}
            data={data}
            handleClose={handleCloseModal}
          />
        </AppModal>
      )}

      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <Cell data={data} updateSingleData={updateSingleData} />

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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
        {UpdateModal && (
          <LoadingButton
            onClick={handleOpenModal}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </LoadingButton>
        )}

        <LoadingButton
          onClick={handleDelete}
          sx={{
            color: "error.main",
            width: "100%",
            justifyContent: "flex-start",
          }}
          disabled={loading}
          loading={loading}
        >
          <Iconify
            icon={loading ? "eva:loader-2-outline" : "eva:trash-2-outline"}
            sx={{ mr: 2, color: loading ? "text.disabled" : "error.main" }}
          />
          Delete
        </LoadingButton>
      </Popover>
    </>
  );
}
