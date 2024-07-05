import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import Iconify from "../../components/iconify";
import { LoadingButton } from "@mui/lab";
import { validateEmail, validatePassword, validateAvatarUrl } from "./utils";
import { Role, RoleOptions, UserModalProps } from "../../types/user";
import { useUser } from "../../context/user-context";
import useForm from "../../hooks/use-form";
import { createUser, updateUser } from "../../lib/api/user";

export function UserForm({ data, handleClose }: UserModalProps) {
  const [page, setPage] = useState(0);
  const { user: currentUser } = useUser();
  const isUpdate = Boolean(data);

  const id = data?.id || "";

  const initialFormState = {
    email: data?.email || "",
    first_name: data?.profile.first_name || "",
    last_name: data?.profile.last_name || "",
    phone: data?.profile.phone || "",
    role: (data?.role.toLowerCase() || "") as Role,
    avatar: data?.profile.avatar || "",
    password: "",
    submit: "",
  };
  const { formState, errors, setErrors, handleChange, setFormState } =
    useForm(initialFormState);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (data) {
      setFormState({
        email: data.email,
        first_name: data.profile.first_name,
        last_name: data.profile.last_name,
        phone: data.profile.phone,
        role: data.role.toLowerCase() as Role,
        avatar: data.profile.avatar,
        password: "",
        submit: "",
      });
    }
  }, [data, setFormState]);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({
      email: null,
      first_name: null,
      last_name: null,
      phone: null,
      role: null,
      avatar: null,
      password: null,
    });

    const { email, first_name, last_name, role, avatar, password } = formState;
    const emailError = validateEmail(email);
    const passwordError = isUpdate
      ? validatePassword(password, false)
      : validatePassword(password);
    const firstNameError = first_name ? null : "First Name is required";
    const lastNameError = last_name ? null : "Last Name is required";
    const roleError = role ? null : "Role is required";
    const avatarError = avatar
      ? avatar === "default.jpg"
        ? null
        : validateAvatarUrl(avatar)
      : null;

    setErrors({
      email: emailError,
      first_name: firstNameError,
      last_name: lastNameError,
      role: roleError,
      avatar: avatarError,
      password: passwordError,
    });

    if (
      emailError ||
      passwordError ||
      firstNameError ||
      lastNameError ||
      roleError ||
      avatarError
    ) {
      setLoading(false);
      return;
    }
    await handleSubmit();
  };

  const handleSubmit = async () => {
    const { email, first_name, last_name, phone, role, avatar, password } =
      formState;
    try {
      let data;
      if (!isUpdate) {
        data = await createUser({
          email,
          first_name,
          last_name,
          phone,
          role,
          password,
        });
      } else {
        data = await updateUser({
          id,
          email,
          first_name,
          last_name,
          phone,
          role,
          password,
          avatar,
        });
      }
      console.log(data);
      handleReset();
      if (handleClose) handleClose();
    } catch (err: any) {
      console.error(err);
      setErrors({ ...errors, submit: "Failed to submit user" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormState(initialFormState);
    setShowPassword(false);
    setLoading(false);
    setErrors({
      email: null,
      first_name: null,
      last_name: null,
      role: null,
      password: null,
      submit: null,
    });
  };

  const renderFirstPage = () => {
    return (
      <Stack spacing={3}>
        <TextField
          onFocus={() => setErrors({ ...errors, email: null })}
          value={formState.email}
          onChange={handleChange("email")}
          name="email"
          label="Email address"
          error={Boolean(errors.email)}
          helperText={errors.email}
          disabled={isUpdate}
        />
        <TextField
          onFocus={() => setErrors({ ...errors, first_name: null })}
          value={formState.first_name}
          onChange={handleChange("first_name")}
          name="first_name"
          label="First Name"
          error={Boolean(errors.first_name)}
          helperText={errors.first_name}
        />
        <TextField
          onFocus={() => setErrors({ ...errors, last_name: null })}
          name="last_name"
          label="Last Name"
          value={formState.last_name}
          onChange={handleChange("last_name")}
          error={Boolean(errors.last_name)}
          helperText={errors.last_name}
        />
        <TextField
          onFocus={() => setErrors({ ...errors, phone: null })}
          name="phone"
          label="Phone"
          value={formState.phone}
          onChange={handleChange("phone")}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
        />
      </Stack>
    );
  };

  const renderSecondPage = () => {
    return (
      <Stack spacing={3}>
        {isUpdate && (
          <TextField
            onFocus={() => setErrors({ ...errors, avatar: null })}
            name="avatar"
            label="Avatar"
            type="url"
            value={formState.avatar}
            onChange={handleChange("avatar")}
            error={Boolean(errors.avatar)}
            helperText={errors.avatar}
          />
        )}
        <TextField
          onFocus={() => setErrors({ ...errors, role: null })}
          name="role"
          label="Role"
          value={formState.role}
          onChange={handleChange("role")}
          error={Boolean(errors.role)}
          helperText={errors.role}
          select
          disabled={isUpdate && currentUser?.role.toLowerCase() !== "admin"}
        >
          {RoleOptions.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          onFocus={() => setErrors({ ...errors, password: null })}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formState.password}
          onChange={handleChange("password")}
          error={Boolean(errors.password)}
          helperText={errors.password}
          disabled={isUpdate && currentUser?.id === data.id}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    );
  };

  return (
    <>
      <Typography variant="h5">
        {isUpdate ? "Update user" : "Add user"}
      </Typography>
      <Divider sx={{ my: 3 }} />
      <form>
        {page === 0 ? renderFirstPage() : renderSecondPage()}
        {page === 0 ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 3, width: "100%" }}
          >
            <Button
              fullWidth
              size="large"
              type="button"
              variant="contained"
              color="inherit"
              onClick={() => setPage(1)}
            >
              Next
            </Button>
          </Stack>
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-between"
            sx={{ my: 3, width: "100%", justifyContent: "space-between" }}
          >
            <IconButton sx={{ mr: 2 }} onClick={() => setPage(0)} edge="end">
              <Iconify icon={"eva:arrow-back-fill"} />
            </IconButton>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={handleClick}
              disabled={loading}
              loading={loading}
            >
              {isUpdate ? "Update" : "Add"}
            </LoadingButton>
          </Stack>
        )}
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography variant="subtitle2" color="error" sx={{ mt: 2 }}>
            {errors.submit}
          </Typography>
        </Stack>
      </form>
    </>
  );
}
