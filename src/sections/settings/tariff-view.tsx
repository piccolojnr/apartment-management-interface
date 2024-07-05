import { useEffect, useState } from "react";
import useSWR from "swr";
import useTableView from "@hooks/use-table-view";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "@components/iconify";
import AppModal from "@components/app-modal";
import { useSearchParams } from "react-router-dom";
import { BillType } from "@/types/table";
import AddTariff from "./forms/add-tariff";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TariffView() {
  const [billType, setBillType] = useState("");
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: billTypes, error: billTypesError } = useSWR(
    "http://192.168.1.73:8080/apt/bill/types",
    fetcher
  );

  const { data, error, mutate } = useSWR(
    billType
      ? `http://192.168.1.73:8080/apt/tariff/bill/type/${billType}`
      : null,
    fetcher
  );

  const { query, setOrder, setOrderBy, setQuery } = useTableView(
    data,
    (data) => mutate(data),
    "billType",
    ["billType"],
    []
  );

  useEffect(() => {
    const _billType = searchParams.get("billType");
    if (_billType) {
      setBillType(_billType);
    }
  }, [searchParams]);

  useEffect(() => {
    if (billTypes && billTypes.length > 0 && !billType) {
      setSearchParams({ billType: billTypes[0].id });
    }
  }, [billTypes, billType]);

  const handleFetchData = (billType: any) => {
    setBillType(billType);
    setSearchParams({ billType });
    mutate();
  };

  if (billTypesError) return <div>Failed to load bill types</div>;
  if (!billTypes) return <div>Loading bill types...</div>;

  return (
    <></>
    // <CustomTable
    //   Cells={TariffCells}
    //   data={data || []}
    //   headLabel={[
    //     { label: "Amount", id: "amount" },
    //     { id: "per", label: "Measure" },
    //     { id: "dateAdded", label: "Date Added" },
    //     { id: "billType", label: "Bill Type" },
    //     { id: "" },
    //   ]}
    //   searchPlaceholder={"Search tariffs..."}
    //   title="Bill Type"
    //   error={error}
    //   loading={!data && !error}
    //   setPage={() => {}}
    //   page={0}
    //   total={0}
    //   query={query}
    //   setQuery={setQuery}
    //   setOrder={setOrder}
    //   setOrderBy={setOrderBy}
    //   head={
    //     <TableHead
    //       fetchData={handleFetchData}
    //       billType={billType}
    //       billTypes={billTypes}
    //       loadingBT={!billTypes && !billTypesError}
    //       open={open}
    //       setOpen={setOpen}
    //     />
    //   }
    // />
  );
}
interface TableHeadProps {
  fetchData: (billType: string) => void;
  billType: string;
  billTypes: BillType[];
  loadingBT: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
}

function TableHead({
  fetchData,
  billType,
  billTypes,
  loadingBT,
  open,
  setOpen,
}: TableHeadProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
    >
      <Typography
        variant="h4"
        sx={{
          width: "100%",
        }}
      >
        Tariffs
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        sx={{
          width: "100%",
        }}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            fetchData(billType);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            label="BillType"
            select
            disabled={loadingBT}
            value={billType}
            onChange={(e) => fetchData(e.target.value)}
            sx={{
              width: "100%",
            }}
          >
            {billTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.billType}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpen(true)}
          sx={{
            width: "100%",
          }}
        >
          New Tariff
        </Button>
        <AppModal open={open} handleClose={() => setOpen(false)}>
          <AddTariff
            onClose={() => {
              fetchData(billType);
              setOpen(false);
            }}
          />
        </AppModal>
      </Stack>
    </Stack>
  );
}
