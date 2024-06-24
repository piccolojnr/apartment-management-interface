import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddBillType({ onClose }: { onClose?: () => void }) {
  const {
    register: registerBillType,
    handleSubmit: submitBillType,
    reset: resetBillType,
  } = useForm();
  const [loadingBillType, setLoadingBillType] = useState(false);
  const onSubmitBillType = async (data: any) => {
    console.log("Bill Type Data:", data);
    setLoadingBillType(true);
    try {
      const response = await fetch("http://192.168.1.73:8080/apt/bill/type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      const result = await response.json();

      console.log(result);
      resetBillType();
      onClose && onClose();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoadingBillType(false);
    }
  };
  return (
    <CardContent>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Add Bill Type
      </Typography>
      <Box component="form" onSubmit={submitBillType(onSubmitBillType)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            fullWidth
            label="Bill Type"
            {...registerBillType("billType", { required: true })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Unit"
            {...registerBillType("unit")}
            sx={{ mb: 2 }}
          />
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={loadingBillType}
          >
            Add Bill Type
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
