import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const Overview = () => {
  const metrics = [
    { title: "Total Apartments", value: 50 },
    { title: "Active Bills", value: 12 },
    { title: "Water Consumption", value: "1200L" },
    { title: "Power Consumption", value: "3500kWh" },
  ];

  return (
    <Grid container spacing={3}>
      {metrics.map((metric) => (
        <Grid item xs={12} sm={6} md={3} key={metric.title}>
          <Card>
            <CardContent>
              <Typography variant="h5">{metric.value}</Typography>
              <Typography color="textSecondary">{metric.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Overview;
