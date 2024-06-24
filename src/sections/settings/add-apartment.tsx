import { LoadingButton } from "@mui/lab";
import {
  Box,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { floor } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddApartment({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("Apartment Data:", data);

    setLoading(true);
    try {
      const response = await fetch("http://192.168.1.73:8080/apt/apt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, floor: parseInt(data.floor) }),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      const result = await response.json();

      console.log(result);
      reset();
      onClose && onClose();
    } catch (error: any) {
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
