import { TableCell, Typography } from "@mui/material";
import { Data } from "../../../types/table";
import { RouterLink } from "../../../routes/components";
import { Person } from "../../../types/apartment";
import Label from "../../label";
import AppModal from "../../app-modal";
import { useState } from "react";

export default function PeopleCell({
  data,
  updateSingleData,
}: {
  data: Data<Person>;
  updateSingleData: (data: any) => void;
}) {
  const [open, setOpen] = useState<"primary" | null>(null);

  const handleChangePrimary = async () => {
    updateSingleData({
      ...data,
      primary: !data.primary,
    });
  };
  return (
    <>
      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {data.name}
        </Typography>
      </TableCell>

      <TableCell>
        <Label
          onClick={() => setOpen("primary")}
          color={data.primary ? "success" : "secondary"}
          sx={{ textTransform: "capitalize" }}
        >
          {data.primary ? "Yes" : "No"}
        </Label>
      </TableCell>
    </>
  );
}
