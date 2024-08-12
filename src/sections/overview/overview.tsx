import { fetcher } from "@/lib/api";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import useSWR from "swr";
interface Dash {
  outstandingBills: number;
  unResolvedRequests: number;
  outstandingAmount: number;
  apartments: number;
}
const Overview = ({ dash }: { dash: Dash }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">{dash.apartments}</Typography>
            <Typography color="textSecondary">Total Apartments</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">{dash.outstandingBills}</Typography>
            <Typography color="textSecondary">Outstanding Bills</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">{dash.unResolvedRequests}</Typography>
            <Typography color="textSecondary">Unresolved Requests</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">{dash.outstandingAmount}</Typography>
            <Typography color="textSecondary">Outstanding Amount</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Overview;
