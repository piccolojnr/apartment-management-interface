import { TabContext, TabPanel } from "@mui/lab";
import { Container, Typography, Grid, Card, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import BillsView from "../bills-view";
import AddBillType from "../add-bill-type";
import AddTariff from "../add-tariff";
import AddApartment from "../add-apartment";
import AddNetwork from "../add-network";
import TariffView from "../tariff-view";
import { useSearchParams } from "react-router-dom";
import NetworksView from "../networks-view";
import AddDeviceType from "../add-device-type";
import DeviceTypeView from "../device-type-view";
import AddContactPerson from "../add-contact-person";
import ApartmentView from "../apartment-view";

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
    <TabContext value={tab}>
      <Tabs
        value={tab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Settings" value="1" />
        <Tab label="Bill Type" value="2" />
        <Tab label="Tariff" value="3" />
        <Tab label="Network" value="4" />
        <Tab label="Device Type" value="5" />
        <Tab label="Apartment" value="6" />
      </Tabs>
      <TabPanel value="1">
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Settings
          </Typography>
          <Grid container spacing={3}>
            {/* Add Apartment Section */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
                <AddApartment />
              </Card>
            </Grid>

            {/* Add Bill Type Section */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
                <AddBillType />
              </Card>
            </Grid>

            {/*add tariff*/}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
                <AddTariff />
              </Card>
            </Grid>

            {/* add network */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
                <AddNetwork />
              </Card>
            </Grid>

            {/* add device type */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
                <AddDeviceType />
              </Card>
            </Grid>

            {/* add contact person section */}
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}>
                <AddContactPerson />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel value="2">
        <BillsView />
      </TabPanel>
      <TabPanel value="3">
        <TariffView />
      </TabPanel>
      <TabPanel value="4">
        <NetworksView />
      </TabPanel>
      <TabPanel value="5">
        <DeviceTypeView />
      </TabPanel>
      <TabPanel value="6">
        <ApartmentView />
      </TabPanel>
    </TabContext>
  );
}
