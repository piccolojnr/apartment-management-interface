import PropTypes from "prop-types";

import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

// ----------------------------------------------------------------------

export function TableError() {
  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography variant="h6" paragraph>
            Something went wrong!
          </Typography>

          <Typography variant="body2">
            There was an error while fetching data. Please try again.
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}

export function TableNoData({ query }: any) {
  return (
    <TableRow>
      <TableCell
        align="center"
        colSpan={6}
        sx={{
          py: 3,
        }}
      >
        <Paper
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography variant="h6" paragraph>
            Not found
          </Typography>

          <Typography variant="body2">
            No results found for &nbsp;
            <strong>&quot;{query}&quot;</strong>.
            <br /> Try checking for typos or using complete words.
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}

export function TableLoading() {
  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
}

TableNoData.propTypes = {
  query: PropTypes.string,
};
