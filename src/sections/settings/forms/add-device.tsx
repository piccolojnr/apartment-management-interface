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
import { Apartment, UtilityType } from "@/types/table";
import { addDevice } from "@lib/api/devices";
import useSWR from "swr";
import { fetcher } from "@lib/api";

export default function AddDevice({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const { data: apartments, isLoading: loadingApt } = useSWR<Apartment[]>(
    "/apt/all/apt",
    fetcher
  );
  const { data: utilityTypes, isLoading: loadingNt } = useSWR<UtilityType[]>(
    "/apt/utility/types",
    fetcher
  );
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    const nData = {
      ...data,
      utilityType: { id: parseInt(data.utilityType) },
      apartment: { id: parseInt(data.apartment) },
    };
    console.log("Device Data:", nData);

    setLoading(true);
    try {
      const res = await addDevice(nData);
      if (res) {
        console.log(res);
        reset();
        onClose && onClose();
      } else {
        throw new Error("could not add device");
      }
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
            <MenuItem value={""}>Select Apartment</MenuItem>
            {apartments?.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Utility Type"
            select
            {...register("utilityType", { required: true })}
            disabled={loadingNt}
            defaultValue={""}
          >
            <MenuItem value={""}>Select Utility Type</MenuItem>
            {utilityTypes?.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.utilityType}
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
