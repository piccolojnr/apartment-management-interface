import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

interface HistoryProps {
  sessions: {
    id: string;
    deviceType: string;
    duration: number;
    date: string;
  }[];
  payments: {
    id: string;
    amount: number;
    date: string;
  }[];
}

const History = ({ sessions, payments }: HistoryProps) => {
  const [tab, setTab] = useState("1");
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 3 }}>
      <CardContent>
        <TabContext value={tab}>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            <Tab label="Sessions" value="1" />
            <Tab label="Payments" value="2" />
          </Tabs>
          <TabPanel value="1">
            <List>
              {sessions.map((session) => (
                <ListItem key={session.id}>
                  <ListItemText
                    primary={`Device: ${session.deviceType}`}
                    secondary={`Duration: ${session.duration} mins, Date: ${session.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </TabPanel>
          <TabPanel value="2">
            <List>
              {payments.map((payment) => (
                <ListItem key={payment.id}>
                  <ListItemText
                    primary={`Amount: ${payment.amount}`}
                    secondary={`Date: ${payment.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </TabPanel>
        </TabContext>
        {/* <Typography variant="h6">History</Typography>
      <Typography variant="subtitle1">Sessions:</Typography>
      <List>
        {sessions.map((session) => (
          <ListItem key={session.id}>
            <ListItemText
              primary={`Device: ${session.deviceType}`}
              secondary={`Duration: ${session.duration} mins, Date: ${session.date}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1">Payments:</Typography>
      <List>
        {payments.map((payment) => (
          <ListItem key={payment.id}>
            <ListItemText
              primary={`Amount: ${payment.amount}`}
              secondary={`Date: ${payment.date}`}
            />
          </ListItem>
        ))}
      </List> */}
      </CardContent>
    </Card>
  );
};
export default History;
