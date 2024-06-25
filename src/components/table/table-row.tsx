import { useState } from "react";

import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";

import Iconify from "../../components/iconify";
import { LoadingButton } from "@mui/lab";
import { CustomTableRowProps, Data } from "../../types/table";

// ----------------------------------------------------------------------

export default function CustomTableRow({
  selected,
  data,
  handleClick,
  updateSingleData,
  Cells,
}: CustomTableRowProps) {
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <Cells data={data} updateSingleData={updateSingleData} />
      </TableRow>
    </>
  );
}
