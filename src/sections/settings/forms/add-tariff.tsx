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
import { UtilityType } from "@/types/table";
import useSWR from "swr";
import { addTariff } from "@lib/api/devices";
import { fetcher } from "@lib/api";

export default function AddTariff({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const { data: utilityTypes, isLoading: loadingBT } = useSWR<UtilityType[]>(
    "/apt/utility/types",
    fetcher
  );
  const [loading, setLoading] = useState(false);

  const onSubmitTariff = async (data: any) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
      per: parseFloat(data.per),
      utilityType: { id: data.utilityType },
    };
    console.log("Tariff Data:", formData);

    setLoading(true);
    try {
      const res = await addTariff(formData);
      if (res) {
        reset();
        onClose && onClose();
      } else {
        throw new Error("could not add tariff");
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
        Add Tariff
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmitTariff)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
          gap={2}
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
            label="Utility type"
            select
            {...register("utilityType", { required: true })}
            disabled={loadingBT}
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
            Add Tariff
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
