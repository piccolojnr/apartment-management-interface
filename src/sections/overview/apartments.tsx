import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const apartmentsData = [
  { id: 1, name: "Apartment 1", floor: 1 },
  { id: 2, name: "Apartment 2", floor: 2 },
];

const Apartments = () => {
  return (
    <Grid container spacing={3}>
      {apartmentsData.map((apartment) => (
        <Grid item xs={12} sm={6} key={apartment.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{apartment.name}</Typography>
              <Typography color="textSecondary">
                Floor: {apartment.floor}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Apartments;
