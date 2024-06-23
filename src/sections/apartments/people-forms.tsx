import { useState } from "react";
import { TextField, Typography, Grid, Divider, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useForm from "../../hooks/use-form";
import { DeviceValidator } from "./utils";

export default function PeopleForm({ data, isUpdate, handleClose }: any) {
  const initialFormState = {
    name: data?.name || "",
    primary: data?.primary || false,
    submit: "",
  };

  const { formState, errors, setErrors, handleChange } =
    useForm(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = DeviceValidator.safeParse(formState);
    try {
      if (!result.success) {
        setErrors({
          name: (result.error.formErrors.fieldErrors.name as any) || "",
        });
        return;
      }
      const formData = {
        ...formState,
      };

      setLoading(true);
      setErrors({ ...errors, submit: "" });
      // if (isUpdate && data?.id) await updateDevice(formData, data.id);
      // else await createDevice(formData);
      handleClose();
    } catch (error) {
      console.error("Failed to submit device", error);
      setErrors({ ...errors, submit: "Failed to submit device" });
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={formState.name}
            onChange={handleChange("name")}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <Checkbox
            checked={formState.primary}
            onChange={handleChange("primary")}
            color="primary"
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            disabled={loading}
            loading={loading}
          >
            {data?.id ? "Update Person" : "Add Person"}
          </LoadingButton>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            color="error"
            sx={{
              textAlign: "center",
            }}
          >
            {errors.submit}
          </Typography>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <>
      <Typography variant="h5">
        {data?.id ? "Update Person" : "Add New Person"}
      </Typography>
      <Divider sx={{ my: 3 }}></Divider>
      {renderForm}
    </>
  );
}
