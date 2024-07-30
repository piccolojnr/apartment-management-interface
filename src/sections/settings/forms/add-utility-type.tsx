import { addUtilityType } from "@/lib/api/devices";
import { LoadingButton } from "@mui/lab";
import { Box, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddUtilityType({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    const submitData = {
      ...data,
      fixedRate: parseInt(data.fixedRate),
    };
    console.log("Utility Type Data:", submitData);

    setLoading(true);
    try {
      const response = await addUtilityType(submitData);
      if (response) {
        console.log(response);
        reset();
        onClose && onClose();
      } else {
        throw new Error("Unable to add Utility type");
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
        Add Utility Type
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            fullWidth
            label="Utility Type Name"
            {...register("utilityType", {
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
            Add Utility Type
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
