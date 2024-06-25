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
import { BillType } from "../../../types/table";
import useSWR from "swr";
import { addTariff, fetcher } from "./api";

export default function AddTariff({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const { data: billTypes, isLoading: loadingBT } = useSWR<BillType[]>(
    "/apt/bill/types",
    fetcher
  );
  const [loading, setLoading] = useState(false);

  const onSubmitTariff = async (data: any) => {
    console.log("Tariff Data:", data);

    setLoading(true);
    try {
      await addTariff(data);
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
        Add Tariff
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmitTariff)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            fullWidth
            type="number"
            label="Amount"
            {...register("amount", { required: true })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Messure"
            {...register("per")}
            sx={{ mb: 2 }}
          />
          <TextField
            label="BillType"
            select
            {...register("billType", { required: true })}
            disabled={loadingBT}
            defaultValue={""}
          >
            {billTypes?.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.billType}
              </MenuItem>
            ))}
          </TextField>

          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={loading}
          >
            Add Tariff
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
