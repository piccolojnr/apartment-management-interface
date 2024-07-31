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
  AddUser,
  AddRole,
} from "../forms";
import { useAuthContext } from "@/context/auth-context";

const config = [
  {
    label: "User",
    element: <AddUser />,
    requiredRoles: ["admin", "administrator"],
  },
  {
    label: "Role",
    element: <AddRole />,
    requiredRoles: ["admin", "administrator"],
  },
  {
    label: "Tariff",
    element: <AddTariff />,
    requiredRoles: ["admin", "administrator"],
  },
  {
    label: "Network",
    element: <AddNetwork />,
    requiredRoles: ["admin", "administrator"],
  },
  {
    label: "Utility Type",
    element: <AddUtilityType />,
    requiredRoles: ["admin", "administrator"],
  },
  {
    label: "Apartment",
    element: <AddApartment />,
    requiredRoles: ["admin", "administrator"],
  },
  {
    label: "Contacts",
    element: <AddContactPerson />,
    requiredRoles: [],
  },
  {
    label: "Device",
    element: <AddDevice />,
    requiredRoles: ["admin", "administrator"],
  },
  {
    label: "Bill",
    element: <AddBill />,
    requiredRoles: ["admin", "administrator"],
  },
];

export default function SettingsView() {
  const [tab, setTab] = useState("1");
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredConfig, setFilteredConfig] = useState(config);
  const { user: account } = useAuthContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSearchParams({ tab: newValue });
  };
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setTab(tab);
  }, [searchParams]);

  useEffect(() => {
    setFilteredConfig(
      config.filter((item) => {
        if (
          item.requiredRoles &&
          item.requiredRoles.length > 0 &&
          !item.requiredRoles.some((role) =>
            account?.roles?.find((_role) => _role.name.toLowerCase() === role)
          )
        ) {
          return false;
        }
        return true;
      })
    );
  }, [account]);

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
          {filteredConfig.map((item, index) => {
            return (
              <Tab
                key={index}
                label={item.label}
                value={(index + 1).toString()}
              />
            );
          })}
        </Tabs>
        {filteredConfig.map((item, index) => {
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
