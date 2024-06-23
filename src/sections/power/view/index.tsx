import {
  Box,
  Container,
  Grid,
  Icon,
  Stack,
  Typography,
  colors,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import { palette } from "../../../theme/palette";
import AppWidgetSummary from "../../../components/app-widgets/app-widget-summary";
import AppWidgetGauge from "../../../components/app-widgets/app-widget-guage";
const phase1Usage = 30; // Replace with actual data
const phase2Usage = 25; // Replace with actual data
const phase3Usage = 20; // Replace with actual data
const totalUsage = phase1Usage + phase2Usage + phase3Usage;
const phase1 = {
  title: "Phase 1",
  usage: phase1Usage,
  subheader: `${phase1Usage}% of power consumption`,
  colors: [palette.grey[700], palette.grey[300]],
};

const phase2 = {
  title: "Phase 2",
  usage: phase2Usage,
  subheader: `${phase2Usage}% of power consumption`,
  colors: [palette.grey[700], palette.grey[300]],
};

const phase3 = {
  title: "Phase 3",
  usage: phase3Usage,
  subheader: `${phase3Usage}% of power consumption`,
  colors: [palette.grey[700], palette.grey[300]],
};

const total = {
  title: "Total",
  usage: totalUsage,
  subheader: `${totalUsage}% of total power consumption`,
  colors: [palette.grey[700], palette.grey[300]],
};

const guageData = [total, phase1, phase2, phase3];
// Example data for summaries
const outstandingPayments = 150; // Replace with actual data
const currentBilling = 75; // Replace with actual data
const overduePayments = 50; // Replace with actual data

const paymentSummary = [
  {
    title: "Outstanding Payments",
    total: `$${outstandingPayments}`,
    color: palette.grey[600],
    icon: <Iconify icon="bi:credit-card-fill" width={64} height={64} />,
  },
  {
    title: "Current Billing",
    total: `$${currentBilling}`,
    color: palette.grey[600],
    icon: <Iconify icon="bi:credit-card-fill" width={64} height={64} />,
  },
  {
    title: "Overdue Payments",
    total: `$${overduePayments}`,
    color: palette.grey[600],
    icon: <Iconify icon="bi:credit-card-fill" width={64} height={64} />,
  },
];
export default function PowerView() {
  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={2} sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 0 }}>
          Power Consumption
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns="
        repeat(auto-fit, minmax(300px, 1fr))
      "
          gap={2}
        >
          {guageData.map((data, index) => {
            return (
              <Grid item key={index}>
                <AppWidgetGauge
                  key={index}
                  usage={data.usage}
                  title={data.title}
                  subheader={data.subheader}
                  colors={data.colors}
                  sx={{ mb: 5, width: "100%" }}
                />
              </Grid>
            );
          })}
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="
        repeat(auto-fit, minmax(200px, 1fr))
        "
          mt={5}
          gap={2}
        >
          {paymentSummary.map((data, index) => {
            return (
              <Grid item key={index}>
                <AppWidgetSummary
                  title={data.title}
                  total={data.total}
                  color={data.color}
                  icon={data.icon}
                  sx={{
                    mb: 5,
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Grid>
            );
          })}
        </Box>
      </Stack>
    </Container>
  );
}
