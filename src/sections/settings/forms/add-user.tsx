import { LoadingButton } from "@mui/lab";
import { Box, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MultiSelect from "@/components/multiselect";
import useSWR from "swr";
import { Role } from "@/types/table";
import { fetcher_api } from "@/lib/api";
import { addUser } from "@/lib/api/devices";

export default function AddUser({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset } = useForm();
  const { data: roles, isLoading: loadingR } = useSWR<Role[]>(
    "/user/roles",
    fetcher_api
  );
  const [loading, setLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const onSubmit = async (data: any) => {
    if (selectedRoles.length === 0) {
      console.log("Please select a role");
      return;
    }
    data.roles = selectedRoles.map((id) => ({ id }));
    setLoading(true);
    try {
      console.log("User Data:", data);
      await addUser(data);
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
        Add User
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            fullWidth
            label="User Name"
            {...register("username", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />
          {/* password */}
          <TextField
            fullWidth
            label="Password"
            {...register("password", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />

          {/* roles */}
          <MultiSelect
            label="Roles"
            options={roles || []}
            sx={{ mb: 2 }}
            disabled={loadingR}
            selected={selectedRoles}
            setSelected={setSelectedRoles}
          />

          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={loading}
          >
            Add User
          </LoadingButton>
        </Grid>
      </Box>
    </CardContent>
  );
}
