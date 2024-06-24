import { LoadingButton } from "@mui/lab";
import {
  Box,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BillType } from "../../types/table";

export default function AddTariff({ onClose }: { onClose?: () => void }) {
  const {
    register: registerTariff,
    handleSubmit: submitTariff,
    reset: resetTariff,
  } = useForm();
  const [billTypes, setBillTypes] = useState<BillType[]>([]);
  const [loadingBT, setLoadingBT] = useState(false);
  const [loadingTariff, setLoadingTariff] = useState(false);
  const onSubmitTariff = async (data: any) => {
    const billType = billTypes.find((b) => b.id === data.billType);
    if (!billType) {
      console.log("BillType not found: ", data);
      return;
    }
    const FData = {
      amount: parseFloat(data.amount),
      per: parseFloat(data.per),
      billType: { id: parseInt(billType.id) },
    };
    console.log("Tariff Data:", FData);

    setLoadingTariff(true);
    try {
      const response = await fetch("http://192.168.1.73:8080/apt/tariff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FData),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      const result = await response.json();
      console.log(result);

      resetTariff();
      onClose && onClose();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoadingTariff(false);
    }
  };

  useEffect(() => {
    const getBillTypes = async () => {
      setLoadingBT(true);
      try {
        const response = await fetch("http://192.168.1.73:8080/apt/bill/types");
        if (!response.ok) {
          const err = await response.text();
          throw new Error(err);
        }
        const result = await response.json();
        setBillTypes(result);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoadingBT(false);
      }
    };
    getBillTypes();
  }, []);
  return (
    <CardContent>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Add Tariff
      </Typography>
      <Box component="form" onSubmit={submitTariff(onSubmitTariff)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            fullWidth
            type="number"
            label="Amount"
            {...registerTariff("amount", { required: true })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Messure"
            {...registerTariff("per")}
            sx={{ mb: 2 }}
          />
          <TextField
            label="BillType"
            select
            {...registerTariff("billType", { required: true })}
            disabled={loadingBT}
            defaultValue={""}
          >
            {billTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.billType}
              </MenuItem>
            ))}
          </TextField>

          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
            loading={loadingTariff}
          >
            Add Tariff
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
