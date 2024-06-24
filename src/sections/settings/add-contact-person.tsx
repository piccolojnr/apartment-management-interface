import { LoadingButton } from "@mui/lab";
import {
  Box,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Apartament, Network } from "../../types/table";

export default function AddContactPerson({
  onClose,
}: {
  onClose?: () => void;
}) {
  const { register, handleSubmit, reset } = useForm();
  const [apartments, setApartments] = useState<Apartament[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [loadingApt, setLoadingApt] = useState(false);
  const [loadingNt, setLoadingNt] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("Contact Person Data:", data);

    setLoading(true);
    try {
      const response = await fetch("http://192.168.1.73:8080/apt/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          network: { id: parseInt(data.network) },
          apartment: { id: parseInt(data.apartment) },
        }),
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
  useEffect(() => {
    const getBillTypes = async () => {
      setLoadingApt(true);
      try {
        const response = await fetch("http://192.168.1.73:8080/apt/all/apt");
        if (!response.ok) {
          const err = await response.text();
          throw new Error(err);
        }
        const result = await response.json();
        setApartments(result);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoadingApt(false);
      }
    };
    getBillTypes();
  }, []);
  useEffect(() => {
    const getBillTypes = async () => {
      setLoadingNt(true);
      try {
        const response = await fetch("http://192.168.1.73:8080/apt/networks");
        if (!response.ok) {
          const err = await response.text();
          throw new Error(err);
        }
        const result = await response.json();
        setNetworks(result);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoadingNt(false);
      }
    };
    getBillTypes();
  }, []);
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
            {apartments.map((type) => (
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
            {networks.map((type) => (
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
