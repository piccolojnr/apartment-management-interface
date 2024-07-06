import { Box, Container, Grid } from "@mui/material";
import Overview from "../overview";
import Utilities from "../utilities";
import Notifications from "../notifications";
import Apartments from "../apartments";
import Billing from "../billing";
import UtilityConsumptionChart from "../utility-consumption-chart";
import UtilityDistributionChart from "../utility-distribution-chart";
import MonthlyConsumptionTrends from "../monthly-consumption-trends";
import UtilityCostDistribution from "../utility-cost-consumption";

export default function AppView() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={3}>
          {/* Overview Section */}
          <Grid item xs={12}>
            <Overview />
          </Grid>

          {/* Utility Charts */}
          <Grid item xs={12} md={6}>
            <UtilityConsumptionChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <UtilityDistributionChart />
          </Grid>

          {/* Monthly Consumption Trends */}
          <Grid item xs={12} md={6}>
            <MonthlyConsumptionTrends />
          </Grid>
          <Grid item xs={12} md={6}>
            <UtilityCostDistribution />
          </Grid>

          {/* Utilities and Apartments */}
          <Grid item xs={12} md={6}>
            <Utilities />
          </Grid>
          <Grid item xs={12} md={6}>
            <Apartments />
          </Grid>

          {/* Billing and Notifications */}
          <Grid item xs={12}>
            <Billing />
          </Grid>
          <Grid item xs={12}>
            <Notifications />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
