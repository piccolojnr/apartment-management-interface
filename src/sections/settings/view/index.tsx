import { TabContext, TabPanel } from "@mui/lab";
import { Container, Typography, Grid, Card, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AddApartment,
  AddBill,
  AddBillSession,
  AddBillType,
  AddContactPerson,
  AddDevice,
  AddUtilityType,
  AddNetwork,
  AddTariff,
} from "../forms";

export default function SettingsView() {
  const [tab, setTab] = useState("1");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSearchParams({ tab: newValue });
  };
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setTab(tab);
  }, [searchParams]);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Settings
      </Typography>
      <TabContext value={tab}>
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Bill Type" value="1" />
          <Tab label="Tariff" value="2" />
          <Tab label="Network" value="3" />
          <Tab label="Utiity Type" value="4" />
          <Tab label="Apartment" value="5" />
          <Tab label="Contacts" value="6" />
          <Tab label="Device" value="7" />
          <Tab label="Bill" value="8" />
          <Tab label="Bill Session" value="9" />
        </Tabs>

        <TabPanel value="1">
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
              <AddBillType />
            </Card>
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
              <AddTariff />
            </Card>
          </Grid>
        </TabPanel>
        <TabPanel value="3">
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
              <AddNetwork />
            </Card>
          </Grid>
        </TabPanel>
        <TabPanel value="4">
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
              <AddUtilityType />
            </Card>
          </Grid>
        </TabPanel>
        <TabPanel value="5">
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
              <AddApartment />
            </Card>
          </Grid>
        </TabPanel>
        <TabPanel value="6">
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
              <AddContactPerson />
            </Card>
          </Grid>
        </TabPanel>
        <TabPanel value="7">
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
              <AddDevice />
            </Card>
          </Grid>
        </TabPanel>
        <TabPanel value="8">
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
              <AddBill />
            </Card>
          </Grid>
        </TabPanel>
        <TabPanel value="9">
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
              <AddBillSession />
            </Card>
          </Grid>
        </TabPanel>
      </TabContext>
    </Container>
  );
}
