import { Stack, TableCell, Typography } from "@mui/material";
import { Apartament, Data } from "../../../types/table";
import { fDate } from "../../../utils/format-time";
import Label from "../../label";
import { useEffect, useState } from "react";
import AppModal from "../../app-modal";
import { LoadingButton } from "@mui/lab";
import { useMqtt } from "../../../context/mqtt-context";
import { RouterLink } from "../../../routes/components";

export default function ApartmentCell({
  data,
  updateSingleData,
}: {
  data: Data<Apartament>;
  updateSingleData: (data: any) => void;
}) {
  const { isConnected, publish, loading } = useMqtt();
  const [open, setOpen] = useState<"water" | "electric" | "status" | null>(
    null
  );

  const handleChangeStatus = async () => {
    if (open == "water") {
      publish(`cmnd/apt/water/${data.id}`, data.water_meter ? "OFF" : "ON");
      updateSingleData({
        ...data,
        water_meter: !data.water_meter,
      });
    } else {
      publish(
        `cmnd/apt/electric/${data.id}`,
        data.electricity_meter ? "OFF" : "ON"
      );
      updateSingleData({
        ...data,
        electricity_meter: !data.electricity_meter,
      });
    }
  };

  return (
    <>
      <AppModal open={open === "water"} handleClose={() => setOpen(null)}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h6">{data.name} water meter status</Typography>
          <Typography variant="body2">
            {data.water_meter ? "Water meter is on" : "Water meter is off"}
          </Typography>
          <LoadingButton
            variant="contained"
            color={data.water_meter ? "error" : "success"}
            onClick={handleChangeStatus}
            loading={loading}
          >
            {data.water_meter ? "Turn Off" : "Turn On"}
          </LoadingButton>
        </Stack>
      </AppModal>
      <AppModal open={open === "electric"} handleClose={() => setOpen(null)}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h6">
            {data.name} electricity meter status
          </Typography>
          <Typography variant="body2">
            {data.electricity_meter
              ? "Electricity meter is on"
              : "Electricity meter is off"}
          </Typography>
          <LoadingButton
            variant="contained"
            color={data.electricity_meter ? "error" : "success"}
            onClick={handleChangeStatus}
            loading={loading}
          >
            {data.electricity_meter ? "Turn Off" : "Turn On"}
          </LoadingButton>
        </Stack>
      </AppModal>
      <TableCell component="th" scope="row" padding="none">
        <Typography variant="subtitle2" noWrap>
          {data.name}
        </Typography>
      </TableCell>

      <TableCell align="left">
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
      </TableCell>

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
