import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { ApartmentInfoProps } from "../../types/apartment";
import { fDate } from "../../utils/format-time";

const ApartmentInfo = ({ apartment }: ApartmentInfoProps) => (
  <Box
    display="grid"
    gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
    gap={2}
  >
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardHeader title="Apartment Information" />
      <CardContent>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          height="100%"
        >
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Typography variant="body1">{apartment.name}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction={"column"}
            alignItems="flex-end"
            justifyContent="center"
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              Created At: {apartment.created_at && fDate(apartment.created_at)}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              Updated At: {apartment.updated_at && fDate(apartment.updated_at)}
            </Typography>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

export default ApartmentInfo;
