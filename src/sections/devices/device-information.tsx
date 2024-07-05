import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import Label from "@components/label";
import { fDate } from "@utils/format-time";

function DeviceInfo(deviceData: any) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap={2}
    >
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardHeader title="Device Information" />
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            height="100%"
          >
            <Grid container alignItems="center" spacing={3}>
              <Grid item>
                <Typography variant="body1">
                  <Label
                    variant="filled"
                    color="info"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {deviceData.type}
                  </Label>
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Label
                    variant="filled"
                    color={deviceData.status === 0 ? "success" : "error"}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {deviceData.status === 0 ? "Active" : "Disabled"}
                  </Label>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction={"column"}
              alignItems="flex-end"
              justifyContent="center"
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                }}
              >
                Created At: {fDate(deviceData.created_at)}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                }}
              >
                Updated At: {fDate(deviceData.updated_at)}
              </Typography>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DeviceInfo;
