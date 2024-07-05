import { LoadingButton } from "@mui/lab";
import { Box, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addDeviceType } from "./api";

export default function AddDeviceType({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    const submitData = {
      ...data,
      fixedRate: parseInt(data.fixedRate),
    };
    console.log("Device Type Data:", submitData);

    setLoading(true);
    try {
      const response = await addDeviceType(submitData);
      if (response) {
        console.log(response);
        reset();
        onClose && onClose();
      } else {
        throw new Error("Unable to add device type");
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
        Add Device Type
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            fullWidth
            label="Device Type Name"
            {...register("deviceType", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Fixed Rate"
            type="number"
            {...register("fixedRate", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Unit"
            {...register("unit", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={loading}
          >
            Add Device Type
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
