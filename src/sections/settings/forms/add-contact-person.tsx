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
import { Apartment, Network } from "@/types/table";
import { addContactPerson } from "@lib/api/devices";
import useSWR from "swr";
import { fetcher } from "@lib/api";

export default function AddContactPerson({
  onClose,
}: {
  onClose?: () => void;
}) {
  const { register, handleSubmit, reset } = useForm();
  const { data: apartments, isLoading: loadingApt } = useSWR<Apartment[]>(
    "/apt/all/apt",
    fetcher
  );
  const { data: networks, isLoading: loadingNt } = useSWR<Network[]>(
    "/apt/networks",
    fetcher
  );

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("Contact Person Data:", data);

    setLoading(true);
    try {
      await addContactPerson({
        ...data,
        network: { id: parseInt(data.network) },
        apartment: { id: parseInt(data.apartment) },
      });
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
        Add Contact Person
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          gap={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            fullWidth
            label="Name"
            {...register("name", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Phone"
            {...register("telephoneNumber", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            {...register("email", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Apartment"
            select
            {...register("apartment", { required: true })}
            disabled={loadingApt}
            defaultValue={""}
          >
            <MenuItem value={""}>Select Apartment</MenuItem>
            {apartments?.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Network"
            select
            {...register("network", { required: true })}
            disabled={loadingNt}
            defaultValue={""}
          >
            <MenuItem value={""}>Select Network</MenuItem>
            {networks?.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.network}
              </MenuItem>
            ))}
          </TextField>

          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={loading}
          >
            Add Contact Person
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
