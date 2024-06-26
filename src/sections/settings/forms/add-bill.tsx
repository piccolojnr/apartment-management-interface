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
import { addBillType, fetcher } from "./api";
import { Apartment, BillSession, BillType } from "../../../types/table";
import useSWR from "swr";
import { fDate } from "../../../utils/format-time";

export default function AddBill({ onClose }: { onClose?: () => void }) {
  const { data: billTypes, isLoading: loadingBT } = useSWR<BillType[]>(
    "/apt/bill/types",
    fetcher
  );
  const { data: billSession, isLoading: loadingBS } = useSWR<BillSession[]>(
    "/apt/bill/sessions",
    fetcher
  );
  const { data: apartments, isLoading: loadingAPT } = useSWR<Apartment[]>(
    "/apt/all/apt",
    fetcher
  );
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmitBillType = async (data: any) => {
    console.log("Bill Data:", data);
    setLoading(true);
    try {
      // const response = await addBillType(data);
      // console.log("Bill Added:", response);
      // reset();
      // onClose && onClose();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CardContent>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Add Bill
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
          <TextField
            label="Bill Type"
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
          <TextField
            label="Bill Session"
            select
            {...register("billSession", { required: true })}
            disabled={loadingBS}
            defaultValue={""}
          >
            {billSession?.map((session) => (
              <MenuItem key={session.id} value={session.id}>
                {fDate(session.startDate)}-{fDate(session.endDate)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Apartment"
            select
            {...register("apartment", { required: true })}
            disabled={loadingAPT}
            defaultValue={""}
          >
            {apartments?.map((apt) => (
              <MenuItem key={apt.id} value={apt.id}>
                {apt.name}
              </MenuItem>
            ))}
          </TextField>
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
