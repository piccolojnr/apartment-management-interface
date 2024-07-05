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
  IconButton,
} from "@mui/material";
import { AddBill, AddBillSession } from "../../settings/forms";
import Iconify from "../../../components/iconify";
import { useEffect, useState } from "react";
import { palette } from "../../../theme/palette";

import {
  Bill,
  BillSession,
  Device,
  FilterProps,
  UtilityType,
} from "../../../types/table";
import { fDate } from "../../../utils/format-time";
import useSWR from "swr";
import ReusableTable from "../../settings/views/reusable-table";
import AppModal from "../../../components/app-modal";
import { baseUrl, fetcher } from "../../settings/forms/api";

export default function SessionsView() {
  const [session, setSession] = useState<BillSession>();
  const [utilityType, setUtilityType] = useState<UtilityType>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const savedSession = localStorage.getItem("session");
    const savedUtilityType = localStorage.getItem("utilityType");
    const savedPage = localStorage.getItem("page");

    if (savedSession) setSession(JSON.parse(savedSession));
    if (savedUtilityType) setUtilityType(JSON.parse(savedUtilityType));
    if (savedPage) setPage(parseInt(savedPage));
  }, []);

  useEffect(() => {
    if (session) localStorage.setItem("session", JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    if (utilityType)
      localStorage.setItem("utilityType", JSON.stringify(utilityType));
  }, [utilityType]);

  const breadcrumbs = [
    { label: "Add Sessions" },
    { label: "Pick Session" },
    { label: "Utility Types" },
    { label: "Devices" },
  ];

  const handleChangePage = (index: number) => {
    setPage(index);
    localStorage.setItem("page", index.toString());
  };

  const handleSubmitSession = (session: BillSession) => {
    setSession(session);
    handleChangePage(1);
  };

  const handleSetUtilityType = (utilityType: UtilityType) => {
    setUtilityType(utilityType);
    handleChangePage(3);
  };

  const handleSetSession = (session: BillSession) => {
    setSession(session);
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
                            flexDirection: "row-reverse",
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
                            onClick={() => handleChangePage(1)}
                          >
                            Pick Session
                          </Button>
                        </Grid>
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
                      </>
                    )}
                    {index === 1 && (
                      <PickSession handleSetSession={handleSetSession} />
                    )}
                    {index === 2 && (
                      <PickUtilityType
                        handleSetUtilityType={handleSetUtilityType}
                      />
                    )}
                    {index === 3 && (
                      <PickDevice
                        utilityType={utilityType}
                        billSession={session}
                      />
                    )}
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

function PickSession({
  handleSetSession,
}: {
  handleSetSession: (session: BillSession) => void;
}) {
  const { data, mutate } = useSWR<BillSession[]>("/apt/bill/sessions", fetcher);

  return (
    <ReusableTable
      data={data || []}
      columns={[
        {
          headerName: "ID",
          field: "id",
        },
        {
          headerName: "Start Date",
          field: "startDate",
          renderCell: (date: string) => fDate(date),
        },
        {
          headerName: "End Date",
          field: "endDate",
          renderCell: (date: string) => fDate(date),
        },
        {
          headerName: "Year",
          field: "year",
        },
        {
          headerName: "Date Created",
          field: "dateCreated",
          renderCell: (date: string) => fDate(date),
        },
      ]}
      onClickRow={handleSetSession}
    />
  );
}

function PickUtilityType({
  handleSetUtilityType,
}: {
  handleSetUtilityType: (utilityType: UtilityType) => void;
}) {
  const { data, mutate } = useSWR<UtilityType[]>("/apt/utility/types", fetcher);

  return (
    <ReusableTable
      data={data || []}
      columns={[
        { field: "id", headerName: "ID" },
        { field: "utilityType", headerName: "Utility Type" },

        { field: "fixedRate", headerName: "Fixed Rate" },
        { field: "unit", headerName: "Unit" },
      ]}
      onClickRow={handleSetUtilityType}
    />
  );
}
const filters: FilterProps<any>[] = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "1",
    name: "power devices",
    field: "deviceType.deviceType",
    value: "power",
  },
  {
    id: "2",
    name: "water devices",
    field: "deviceType.deviceType",
    value: "water",
  },
];
function PickDevice({
  utilityType,
  billSession,
}: {
  utilityType?: UtilityType;
  billSession?: BillSession;
}) {
  const [currentDevice, setCurrentDevice] = useState<Device>();
  const { data, mutate } = useSWR<Device[]>(
    `/apt/bill/session/${billSession?.id}/utility/type/${utilityType?.id}/unbilled/devices/`,
    utilityType ? fetcher : () => []
  );
  const [open, setOpen] = useState(false);
  const [bill, setBill] = useState<any>({
    apartment: {
      floor: 0,
      id: 0,
      name: "",
    },
    billSession,
    utilityType,
    consumption: null,
    reading: null,
  });

  useEffect(() => {
    if (utilityType && billSession) {
      mutate();
      setBill({
        ...bill,
        billSession,
        utilityType,
      });
    }
  }, [utilityType, billSession]);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
  };
  const deleteDevice = async () => {
    if (currentDevice && data) {
      mutate(data.filter((x) => x.id !== currentDevice.id));
      setCurrentDevice(undefined);
      handleCloseModal();
    }
  };

  const handleClickRow = (device: Device) => {
    setCurrentDevice(device);
    setBill({
      ...bill,
      device: { id: device.id },
      apartment: device.apartment,
    });
    handleOpenModal();
  };
  return (
    <>
      <AppModal open={open} handleClose={handleCloseModal}>
        <AddBill data={bill} onClose={deleteDevice} />
      </AppModal>
      <ReusableTable
        columns={[
          { field: "id", headerName: "ID" },
          { field: "deviceName", headerName: "Name" },
          {
            field: "apartment",
            headerName: "Apartment",
            renderCell: (value, row) => row.apartment.name,
          },
          {
            field: "utilityType",
            headerName: "Utility Type",
            renderCell: (value, row) => row.utilityType.utilityType,
          },
        ]}
        data={data || []}
        onClickRow={handleClickRow}
        filters={filters}
      />
    </>
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
