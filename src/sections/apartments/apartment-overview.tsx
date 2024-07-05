import React, { useState, useEffect } from "react";
import { Container, Typography, Stack, Tabs, Tab, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { Person } from "@/types/apartment";
import ApartmentInfo from "./apartment-info";
import DevicesList from "./device-list";
import PeopleList from "./people-list";
import History from "./history";
import { TabContext, TabPanel } from "@mui/lab";

// Mock data - replace with actual data fetching logic
const mockData = {
  apartment: {
    id: "1",
    name: "Apartment 1",
    created_at: "2024-01-12T04:40:22.036Z",
    updated_at: "2024-06-21T13:57:48.504Z",
  },
  devices: [],
  people: [
    { id: "1", name: "John Doe", primary: true },
    { id: "2", name: "Jane Smith" },
  ],
  sessions: [
    {
      id: "1",
      deviceType: "Electric",
      duration: 120,
      date: "2024-06-01",
    },
  ],
  payments: [
    {
      id: "1",
      amount: 100,
      date: "2024-06-10",
    },
  ],
};

const ApartmentOverview = () => {
  const { id } = useParams();
  const [data, setData] = useState(mockData);
  const [tab, setTab] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  // Fetch data based on apartment ID
  useEffect(() => {
    // Replace with actual data fetching logic
    setData(mockData);
  }, [id]);

  const addPerson = (person: Person) => {
    setData((prevData) => ({
      ...prevData,
      people: [
        ...prevData.people,
        { ...person, id: `${prevData.people.length + 1}` },
      ],
    }));
  };

  const updateSession = (deviceId: string) => {
    // Logic to update the session duration of a device
    // setData((prevData) => ({
    //   ...prevData,
    //   devices: prevData.devices.map((device) =>
    //     device.id === deviceId
    //       ? { ...device, sessionDuration: device.sessionDuration + 10 }
    //       : device
    //   ),
    // }));
  };

  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="column" spacing={3} sx={{ mt: 3 }}>
          <Typography variant="h4">Apartment Overview</Typography>
          {/* <ApartmentInfo apartment={data.apartment} /> */}
          {/* <DevicesList devices={data.devices} /> */}
        </Stack>
      </Container>
      <TabContext value={tab}>
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
        >
          <Tab label="People" value="1" />
          <Tab label="History" value="2" />
        </Tabs>
        <TabPanel value="1" tabIndex={0}>
          <PeopleList people={data.people} />
        </TabPanel>
        <TabPanel value="2" tabIndex={1}>
          <History sessions={data.sessions} payments={data.payments} />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default ApartmentOverview;
