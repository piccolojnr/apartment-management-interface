import { Typography, Container, Box } from "@mui/material";
import { DevicesListProps } from "@/types/apartment";
import DeviceCard from "../devices/device-card";

const DevicesList = ({ devices }: DevicesListProps) => (
  <Container maxWidth="xl">
    <Typography variant="h6">Devices</Typography>
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap={2}
    >
      {devices.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </Box>
  </Container>
);

export default DevicesList;
