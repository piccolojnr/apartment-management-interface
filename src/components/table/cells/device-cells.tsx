import { TableCell, Typography } from "@mui/material";
import { Device, Data } from "../../../types/table";
import { fDate } from "../../../utils/format-time";
import { RouterLink } from "../../../routes/components";
import DeviceStatusLabel from "../../../sections/devices/device-status-label";

export default function DeviceCell({
  data,
}: {
  data: Data<Device>;
  updateSingleData: (data: any) => void;
}) {
  return (
    <>
      <TableCell align="left">
        <Typography
          sx={{
            fontSize: 12,
          }}
          noWrap
        >
          {data.id}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography
          sx={{
            fontSize: 12,
          }}
          noWrap
        >
          {data.deviceType.deviceType}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography
          sx={{
            fontSize: 12,
          }}
          noWrap
        >
          {/* {data.apartment?.name} */}
        </Typography>
      </TableCell>

      <TableCell align="left">
        {/* <DeviceStatusLabel status={data.status} type={data.type} /> */}
      </TableCell>

      <TableCell align="left">
        <Typography
          sx={{
            fontSize: 12,
          }}
          noWrap
        >
          {/* {fDate(data.created_at)} */}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Typography
          sx={{
            fontSize: 12,
          }}
          noWrap
        >
          {/* {fDate(data.updated_at)} */}
        </Typography>
      </TableCell>
      <TableCell>
        <RouterLink to={`/devices/${data.id}`}>
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
