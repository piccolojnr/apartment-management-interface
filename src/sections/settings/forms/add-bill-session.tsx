import { LoadingButton } from "@mui/lab";
import {
  Box,
  CardContent,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { addBillSession } from "./api";
import { th } from "@faker-js/faker";

export default function AddBillSession({
  onClose,
}: {
  onClose?: (v?: any) => void;
}) {
  const { register, handleSubmit, reset, control } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmitBillType = async (data: any) => {
    console.log("Bill Session Data:", { ...data });
    setLoading(true);
    try {
      const response = await addBillSession({ ...data });
      console.log("Bill Session Added:", response);
      if (response) {
        reset();
        onClose && onClose(response);
      } else {
        throw new Error("Error adding bill session");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CardContent>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Bill Session
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmitBillType)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
          gap={2}
        >
          <Controller
            name="startDate"
            rules={{ required: true }}
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Start Date"
                onChange={(date) => {
                  return field.onChange(date);
                }}
              />
            )}
          />
          <Controller
            name="endDate"
            rules={{ required: true }}
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="End Date"
                onChange={(date) => field.onChange(date)}
              />
            )}
          />

          <TextField
            fullWidth
            label="Year"
            type="number"
            {...register("year", { required: true })}
            sx={{ mb: 2 }}
          />

          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={loading}
          >
            Add Session
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
