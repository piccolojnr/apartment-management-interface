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
import useSWR from "swr";
import { addUser } from "@/lib/api/user";
import { Role } from "@/types/user";
import { fetcher_api } from "@/lib/api";
import CustomMultiSelect from "@/components/multi-select";
import { set } from "lodash";

export default function AddUser({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset, getValues, setValue, getFieldState } =
    useForm({
      defaultValues: {
        username: "",
        password: "",
        roles: [] as number[],
      },
    });
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const { data: roles, isLoading: loadingR } = useSWR<Role[]>(
    "/user/roles",
    fetcher_api
  );

  const [loading, setLoading] = useState(false);

  const handleSetRoles = (roles: number[]) => {
    setSelectedRoles(roles);
    setValue("roles", roles);
  };

  const onSubmit = async (data: any) => {
    const nData = {
      ...data,
      roles: selectedRoles.map((id) => ({ id })),
    };
    console.log("User Data:", nData);

    setLoading(true);
    try {
      const res = await addUser(nData);
      if (res) {
        console.log(res);
        reset();
        onClose && onClose();
      } else {
        throw new Error("could not add user");
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
        Add User
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
            label="Username"
            {...register("username", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: true,
            })}
            sx={{ mb: 2 }}
          />

          <CustomMultiSelect
            label="Roles"
            roles={roles || []}
            selectedRoles={selectedRoles}
            setSelectedRoles={handleSetRoles}
            error={getFieldState("roles")?.error?.message}
            className="mb-2 w-full"
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
