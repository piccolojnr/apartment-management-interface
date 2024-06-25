import { LoadingButton } from "@mui/lab";
import {
  Box,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Apartment, DeviceType } from "../../../types/table";
import { addDevice, fetcher } from "./api";
import useSWR from "swr";

export default function AddDevice({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const { data: apartments, isLoading: loadingApt } = useSWR<Apartment[]>(
    "/apt/all/apt",
    fetcher
  );
  const { data: deviceTypes, isLoading: loadingNt } = useSWR<DeviceType[]>(
    "/apt/device/types",
    fetcher
  );

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("Device Data:", data);

    setLoading(true);
    try {
      await addDevice({
        ...data,
        deviceType: { id: parseInt(data.deviceType) },
        apartment: { id: parseInt(data.apartment) },
      });
      reset();
      onClose && onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Add Device
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          gap={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            fullWidth
            label="Name"
            {...register("deviceName", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Apartment"
            select
            {...register("apartment", { required: true })}
            disabled={loadingApt}
            defaultValue={""}
          >
            {apartments?.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Device Type"
            select
            {...register("deviceType", { required: true })}
            disabled={loadingNt}
            defaultValue={""}
          >
            {deviceTypes?.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.deviceType}
              </MenuItem>
            ))}
          </TextField>

          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={loading}
          >
            Add Device
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
