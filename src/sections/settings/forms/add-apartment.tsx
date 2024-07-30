import { LoadingButton } from "@mui/lab";
import { Box, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addApartment } from "@lib/api/devices";

export default function AddApartment({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("Apartment Data:", data);

    setLoading(true);
    try {
      await addApartment(data);
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
        Add Apartment
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            fullWidth
            label="Apartment Name"
            {...register("name", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Floor"
            {...register("floor", {
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
            Add Apartment
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
