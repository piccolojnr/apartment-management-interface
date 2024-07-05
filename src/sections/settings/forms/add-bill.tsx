import { LoadingButton } from "@mui/lab";
import { Box, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addBill } from "@lib/api/devices";

export default function AddBill({
  onClose,
  data,
}: {
  onClose?: () => void;
  data?: any;
}) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmitBillType = async (newData: any) => {
    const nData = {
      ...data,
      ...newData,
      billSession: { id: data.billSession.id },
      apartment: { id: data.apartment.id },
      device: {
        id: data.device.id,
        utilityType: { id: data.utilityType.id },
      },
      reading: parseInt(newData.reading),
      consumption: parseInt(newData.consumption),
      amount: parseInt(newData.amount),
    };
    console.log("Bill Data:", nData);
    setLoading(true);
    try {
      const response = await addBill(nData);
      console.log("Bill Added:", response);
      if (response) {
        console.log(response);
        reset();
        onClose && onClose();
      } else {
        throw new Error("Unable to add bill");
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
        Add {data?.apartment?.name} bill
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmitBillType)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
          gap={2}
        >
          <TextField
            fullWidth
            label="Amount"
            type="number"
            {...register("amount", { required: true })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Consumption"
            type="number"
            {...register("consumption")}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Reading"
            type="number"
            {...register("reading")}
            sx={{ mb: 2 }}
          />
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={loading}
          >
            Add Bill
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
