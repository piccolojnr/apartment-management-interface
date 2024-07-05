import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Device } from "../../types/table";
import { useState } from "react";
import AppModal from "../../components/app-modal";
import { DateTimePicker } from "@mui/x-date-pickers";

const DeviceCard = ({ device }: { device: Device }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppModal open={open} handleClose={() => setOpen(false)}>
        <form action="">
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Typography variant="h6">Update Session</Typography>

            <TextField
              label="Device Type"
              value={device.utilityType}
              fullWidth
              disabled
              sx={{ mt: 2 }}
            />
            <DateTimePicker
              label="Start Time"
              onChange={() => {}}
              sx={{ mt: 2, width: "100%" }}
            />
            <DateTimePicker
              label="End Time"
              onChange={() => {}}
              sx={{ mt: 2, width: "100%" }}
            />
            <Button variant="contained" color="primary" fullWidth>
              Update Session
            </Button>
          </Stack>
        </form>
      </AppModal>

      <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 2, p: 2 }}>
        <CardContent>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">
                {device.utilityType.utilityType}
              </Typography>
            </Grid>
            <Grid item>
              {/* <DeviceStatusLabel status={device.status} type={device.type} /> */}
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: "text.secondary",
            }}
          >
            Session Period
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                }}
              >
                {/* Start: {fDate(device.session_period.start)} */}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                  textAlign: "right",
                }}
              >
                {/* End: {fDate(device.session_period.end)} */}
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => setOpen(true)}
            fullWidth
          >
            Update Session
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default DeviceCard;
