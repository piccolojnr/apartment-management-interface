import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import AppWidgetGauge from "../../../components/app-widgets/app-widget-guage";
import AppWidgetSummary from "../../../components/app-widgets/app-widget-summary";
import Iconify from "../../../components/iconify";

const dailyUsage = 50; // Replace with actual data
const weeklyUsage = 300; // Replace with actual data
const monthlyUsage = 1200; // Replace with actual data
const totalWUsage = dailyUsage + weeklyUsage + monthlyUsage;

const daily = {
  title: "Daily",
  usage: dailyUsage,
  subheader: `${dailyUsage}% of water consumption`,
  colors: ["#1E90FF", "#ADD8E6", "#00BFFF"],
};

const weekly = {
  title: "Weekly",
  usage: weeklyUsage,
  subheader: `${weeklyUsage}% of water consumption`,
  colors: ["#1E90FF", "#ADD8E6", "#00BFFF"],
};

const monthly = {
  title: "Monthly",
  usage: monthlyUsage,
  subheader: `${monthlyUsage}% of water consumption`,
  colors: ["#1E90FF", "#ADD8E6", "#00BFFF"],
};

const totalW = {
  title: "Total",
  usage: totalWUsage,
  subheader: `${totalWUsage}% of total water consumption`,
  colors: ["#1E90FF", "#ADD8E6", "#00BFFF"],
};

// Example data for summaries
const outstandingWPayments = 100; // Replace with actual data
const currentWBilling = 60; // Replace with actual data
const overdueWPayments = 40; // Replace with actual data

const guageData = [totalW, daily, weekly, monthly];

const paymentSummary = [
  {
    title: "Outstanding Payments",
    total: `$${outstandingWPayments}`,
    color: "#1E90FF",
    icon: "bi:credit-card-fill",
  },
  {
    title: "Current Billing",
    total: `$${currentWBilling}`,
    color: "#1E90FF",
    icon: "bi:credit-card-fill",
  },
  {
    title: "Overdue Payments",
    total: `$${overdueWPayments}`,
    color: "#1E90FF",
    icon: "bi:credit-card-fill",
  },
];

export function WaterView() {
  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={2} sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 0 }}>
          Water Consumption
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
                  icon={<Iconify icon={data.icon} width={64} height={64} />}
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
