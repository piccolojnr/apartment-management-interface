import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const utilitiesData = [
  { id: 1, utilityType: "Water", unit: "L", fixedRate: 1.5 },
  { id: 2, utilityType: "Electricity", unit: "kWh", fixedRate: 0.2 },
];

const Utilities = () => {
  return (
    <Grid container spacing={3}>
      {utilitiesData.map((utility) => (
        <Grid item xs={12} sm={6} key={utility.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{utility.utilityType}</Typography>
              <Typography color="textSecondary">
                Unit: {utility.unit}, Fixed Rate: {utility.fixedRate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Utilities;
