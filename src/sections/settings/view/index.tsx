import { TabContext, TabPanel } from "@mui/lab";
import { Container, Typography, Tabs, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AddApartment,
  AddBill,
  AddContactPerson,
  AddDevice,
  AddUtilityType,
  AddNetwork,
  AddTariff,
} from "../forms";

const config = [
  {
    label: "Tariff",
    element: <AddTariff />,
  },
  {
    label: "Network",
    element: <AddNetwork />,
  },
  {
    label: "Utility Type",
    element: <AddUtilityType />,
  },
  {
    label: "Apartment",
    element: <AddApartment />,
  },
  {
    label: "Contacts",
    element: <AddContactPerson />,
  },
  {
    label: "Device",
    element: <AddDevice />,
  },
  {
    label: "Bill",
    element: <AddBill />,
  },
];

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
          {config.map((item, index) => {
            return (
              <Tab
                key={index}
                label={item.label}
                value={(index + 1).toString()}
              />
            );
          })}
        </Tabs>
        {config.map((item, index) => {
          return (
            <TabPanel key={index} value={(index + 1).toString()}>
              {item.element}
            </TabPanel>
          );
        })}
      </TabContext>
    </Container>
  );
}
