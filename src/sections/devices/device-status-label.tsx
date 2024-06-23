import { useState } from "react";
import { useMqtt } from "../../context/mqtt-context";
import AppModal from "../../components/app-modal";
import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Label from "../../components/label";

function DeviceStatusLabel({ status, type }: { status: number; type: string }) {
  const { publish, loading } = useMqtt();
  const [open, setOpen] = useState(false);

  const handleChangeStatus = async () => {
    publish(
      `cmnd/apt/${type.toLowerCase()}/${type === "ELECTRIC" ? 1 : 2}`,
      status === 0 ? "OFF" : "ON"
    );
    setOpen(false);
  };
  return (
    <>
      <AppModal open={open} handleClose={() => setOpen(false)}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h6">{type} status</Typography>
          <Typography variant="body2">
            {status === 0
              ? "Device is active"
              : status === 1
              ? "Device is pending"
              : "Device is disabled"}
          </Typography>
          <LoadingButton
            variant="contained"
            color={
              status === 0 ? "error" : status === 1 ? "success" : "success"
            }
            onClick={handleChangeStatus}
            loading={loading}
          >
            {status === 0 ? "Disable" : "Enable"}
          </LoadingButton>
        </Stack>
      </AppModal>
      <Label
        onClick={() => setOpen(true)}
        variant="filled"
        color={status === 0 ? "success" : "error"}
        sx={{ textTransform: "capitalize", cursor: "pointer" }}
      >
        {status === 0 ? "Active" : status === 1 ? "Pending" : "Disabled"}{" "}
      </Label>
    </>
  );
}

export default DeviceStatusLabel;
