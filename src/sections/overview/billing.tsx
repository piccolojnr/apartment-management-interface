import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const billsData = [
  {
    id: 1,
    apartment: { id: 1, name: "Apartment 1" },
    billSession: {
      id: 1,
      startDate: "2023-01-01",
      endDate: "2023-01-31",
      year: 2023,
    },
    billType: { id: 1, billType: "Water", unit: "L" },
    consumption: 500,
    dateAdded: "2023-01-31",
    reading: 1000,
  },
  {
    id: 2,
    apartment: { id: 2, name: "Apartment 2" },
    billSession: {
      id: 1,
      startDate: "2023-01-01",
      endDate: "2023-01-31",
      year: 2023,
    },
    billType: { id: 2, billType: "Electricity", unit: "kWh" },
    consumption: 200,
    dateAdded: "2023-01-31",
    reading: 500,
  },
];

const Billing = () => {
  return (
    <Grid container spacing={3}>
      {billsData.map((bill) => (
        <Grid item xs={12} sm={6} key={bill.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{bill.apartment.name}</Typography>
              <Typography color="textSecondary">
                {bill.billType.billType} Consumption: {bill.consumption}{" "}
                {bill.billType.unit}
              </Typography>
              <Typography color="textSecondary">
                Date: {bill.dateAdded}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Billing;
