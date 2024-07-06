import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const notificationsData = [
  {
    id: 1,
    title: "Water leak detected",
    message: "Water leak detected in apartment 12",
    created_at: "2023-01-31",
    is_unread: true,
  },
  {
    id: 2,
    title: "Maintenance scheduled",
    message: "Scheduled maintenance for power supply on 10th July",
    created_at: "2023-01-31",
    is_unread: true,
  },
];

const Notifications = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Notifications</Typography>
        <List>
          {notificationsData.map((notification) => (
            <ListItem key={notification.id}>
              <ListItemText
                primary={notification.title}
                secondary={notification.message}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Notifications;
