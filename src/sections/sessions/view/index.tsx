import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Fade,
  Grid,
  Slide,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AddBillSession } from "../../settings/forms";
import Iconify from "../../../components/iconify";
import { useState } from "react";
import { palette } from "../../../theme/palette";

import { BillSession, BillType } from "../../../types/table";
import { billTypesColumns, deviceTypesColumns } from "./config";
import { billTypes } from "../../../_mock/billType";
import { devices } from "../../../_mock/device";
import { fDate } from "../../../utils/format-time";

export default function SessionsView() {
  const [session, setSession] = useState<BillSession | null>(null);
  const [billType, setBillType] = useState<BillType | null>(null);
  const [page, setPage] = useState(0);

  const breadcrumbs = [
    { label: "Sessions" },
    { label: "Bill Types" },
    { label: "Devices" },
  ];

  const handleChangePage = (index: number) => {
    setPage(index);
  };

  const handleSubmitSession = (session: BillSession) => {
    setSession(session);
    handleChangePage(1);
  };

  const handleSetBillType = (billType: BillType) => {
    setBillType(billType);
    handleChangePage(2);
  };

  return (
    <Container>
      <Stack spacing={2}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h6">Session</Typography>
          {session && (
            <Stack
              spacing={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: 400,
              }}
            >
              <SessionInfo label="Start" value={fDate(session.startDate)} />
              <SessionInfo label="End" value={fDate(session.endDate)} />
              <SessionInfo label="Year" value={session.year.toString()} />
              {billType && (
                <SessionInfo label="Bill Type" value={billType.billType} />
              )}
            </Stack>
          )}
        </Grid>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <CustomSeparator
            page={page}
            breadcrumbs={breadcrumbs}
            changePage={handleChangePage}
          />
        </Grid>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2, width: "100%" }}
        >
          {[0, 1, 2, 3].map((index) => (
            <Fade
              in={page === index}
              key={index}
              timeout={{ enter: 500, exit: 500 }}
            >
              <Box
                display={page === index ? "block" : "none"}
                sx={{ width: "100%" }}
              >
                <Slide in={page === index} direction="left">
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 && (
                      <Card
                        sx={{
                          boxShadow: 3,
                          borderRadius: 2,
                          p: 4,
                          maxWidth: 400,
                        }}
                      >
                        <AddBillSession onClose={handleSubmitSession} />
                      </Card>
                    )}
                    {index === 1 && (
                      <>
                        <Grid
                          container
                          direction="row"
                          justifyContent="start"
                          alignItems="center"
                          spacing={2}
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            justifyItems: "space-between",
                            my: 2,
                            ml: 2,
                          }}
                          gap={4}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                          >
                            Back
                          </Button>
                        </Grid>
                        <PickBillType handleSetBillType={handleSetBillType} />
                      </>
                    )}
                    {index === 2 && <PickDevice />}
                  </Box>
                </Slide>
              </Box>
            </Fade>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}

function SessionInfo({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        justifyItems: "space-between",
      }}
    >
      <Typography
        variant="body1"
        sx={{ fontSize: 14, color: "text.secondary" }}
      >
        {label}:{" "}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: 12, color: "text.secondary" }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function PickBillType({
  handleSetBillType,
}: {
  handleSetBillType: (billType: BillType) => void;
}) {
  return (
    <CustomTable
      data={billTypes}
      columns={billTypesColumns}
      handleClick={handleSetBillType}
    />
  );
}

function PickDevice() {
  return <CustomTable data={devices} columns={deviceTypesColumns} />;
}

function CustomTable({
  data,
  columns,
  handleClick,
}: {
  data: any[];
  handleClick?: (item: any) => void;
  columns: {
    field: string;
    headerName: string;
    render?: (value: any) => JSX.Element | string;
  }[];
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: 3, borderRadius: 2, p: 4 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} sx={{ p: 1 }}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow
              hover
              key={item.id}
              onClick={() => handleClick && handleClick(item)}
              sx={{ cursor: "pointer" }}
            >
              {columns.map((column) => (
                <TableCell key={column.field} sx={{ p: 1 }}>
                  {column.render
                    ? column.render(item[column.field])
                    : item[column.field as never]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function CustomSeparator({
  breadcrumbs,
  changePage,
  page,
}: {
  page: number;
  breadcrumbs: {
    label: string;
  }[];
  changePage: (index: number) => void;
}): JSX.Element {
  const Breadcrumb = ({ index, label }: { index: number; label: string }) => (
    <Button
      color="inherit"
      sx={{ textTransform: "capitalize" }}
      onClick={() => changePage(index)}
    >
      {label}
    </Button>
  );

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<Iconify icon="ic:baseline-navigate-next" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <Typography
            key={index}
            variant="body2"
            component="span"
            color={
              page <= index
                ? page === index
                  ? palette.primary.main
                  : "text.disabled"
                : "inherit"
            }
          >
            {page <= index ? (
              breadcrumb.label
            ) : (
              <Breadcrumb index={index} label={breadcrumb.label} />
            )}
          </Typography>
        ))}
      </Breadcrumbs>
    </Stack>
  );
}
