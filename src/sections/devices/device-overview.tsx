import React from "react";
import {
  Container,
  Typography,
  Stack,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import AppWidgetGauge from "../../components/app-widgets/app-widget-guage";
import AppWidgetSummary from "../../components/app-widgets/app-widget-summary";
import { Data } from "../../types/table";
import { fDate } from "../../utils/format-time";
import Label from "../../components/label";
import DeviceInfo from "./device-information";
import DeviceCard from "./device-card";

interface DeviceOverviewProps {
  deviceData: Data<any>;
  guageData: {
    title: string;
    usage: number;
    subheader: string;
    colors: string[];
  }[];
  paymentSummary: {
    title: string;
    total: string;
    color: string;
    icon: React.ReactNode;
  }[];
  title: string;
}

const DeviceOverview = ({
  deviceData,
  guageData,
  paymentSummary,
  title,
}: DeviceOverviewProps) => {
  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={2} sx={{ mt: 3, mb: 3 }}>
        {/* Render Device Data */}
        <DeviceCard device={deviceData} />
        {/* Render Gauge Data */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap={2}
        >
          {guageData.map((data, index) => (
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
          ))}
        </Box>

        {/* Render Payment Summary */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          mt={5}
          gap={2}
        >
          {paymentSummary.map((data, index) => (
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
          ))}
        </Box>
      </Stack>
    </Container>
  );
};

export default DeviceOverview;
