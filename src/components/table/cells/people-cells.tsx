import { TableCell, Typography } from "@mui/material";
import { Data } from "../../../types/table";
import { RouterLink } from "../../../routes/components";
import { Person } from "../../../types/apartment";
import Label from "../../label";
import AppModal from "../../app-modal";
import { useState } from "react";

export default function PeopleCells({
  data,
  updateSingleData,
}: {
  data: Data<Person>;
  updateSingleData: (data: any) => void;
}) {
  return (
    <>
      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {data.name}
        </Typography>
      </TableCell>
    </>
  );
}
