import PropTypes from "prop-types";

import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import Iconify from "../../components/iconify";
import { Data, TableToolbarProps } from "../../types/table";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import FiltersPopover from "./filters-popover";
import { capitalize } from "@mui/material";
import { deleteUser } from "../../utils/api";
import { set } from "lodash";

// ----------------------------------------------------------------------

export default function TableToolbar({
  numSelected,
  setFilter,
  onFilter,
  onDelete,
  selected,
  query,
  filters,
  title,
}: TableToolbarProps) {
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = (event: any) => setOpen(event.currentTarget);
  const handleClose = () => setOpen(null);

  const handleDelete = async (item: Data) => {
    onDelete(item);
  };
  const handleDeleteMultiple = async () => {
    try {
      setLoading(true);
      await Promise.all(selected.map(async (item) => await handleDelete(item)));
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Toolbar
      sx={{
        height: 96,
        display: "flex",
        justifyContent: "space-between",
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={query}
          fullWidth
          onChange={onFilter}
          placeholder={`Search ${title.toLowerCase()}`}
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <span>
            <LoadingButton loading={loading} onClick={handleDeleteMultiple}>
              <Iconify icon="eva:trash-2-fill" />
            </LoadingButton>
          </span>
        </Tooltip>
      ) : (
        filters && (
          <Tooltip title="Filter list">
            <IconButton onClick={handleOpen}>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>
        )
      )}
      {filters && (
        <FiltersPopover
          open={open}
          filters={filters}
          handleClose={handleClose}
          setFilter={setFilter}
        />
      )}
    </Toolbar>
  );
}

TableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  searchPlaceholder: PropTypes.string,
};
