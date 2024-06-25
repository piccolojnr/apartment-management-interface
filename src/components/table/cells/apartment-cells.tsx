import { TableCell, Typography } from "@mui/material";
import { Apartment, Data } from "../../../types/table";
import { RouterLink } from "../../../routes/components";

export default function ApartmentCell({
  data,
}: {
  data: Data<Apartment>;
  updateSingleData: (data: any) => void;
}) {
  return (
    <>
      <TableCell component="th" scope="row" padding="none">
        <Typography variant="subtitle2" noWrap>
          {data.name}
        </Typography>
      </TableCell>

      {/* <TableCell align="left">
        {
          <Label
            onClick={() => setOpen("water")}
            color={data.water_meter ? "success" : "error"}
            sx={{ textTransform: "capitalize", cursor: "pointer" }}
          >
            {data.water_meter ? "On" : "Off"}
          </Label>
        }
      </TableCell>

      <TableCell align="left">
        {
          <Label
            onClick={() => setOpen("electric")}
            color={data.electricity_meter ? "success" : "error"}
            sx={{ textTransform: "capitalize", cursor: "pointer" }}
          >
            {data.electricity_meter ? "On" : "Off"}
          </Label>
        }
      </TableCell>

      <TableCell align="left">
        <Typography
          sx={{
            fontSize: 12,
          }}
          noWrap
        >
          {data.created_at && fDate(data.created_at)}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography
          sx={{
            fontSize: 12,
          }}
          noWrap
        >
          {data.updated_at && fDate(data.updated_at)}
        </Typography>
      </TableCell> */}

      <TableCell>
        <RouterLink to={`/apartments/${data.id}`}>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{
              color: "primary.main",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            View
          </Typography>
        </RouterLink>
      </TableCell>
    </>
  );
}
