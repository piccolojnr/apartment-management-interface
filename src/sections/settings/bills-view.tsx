import { useEffect, useState } from "react";
import CustomTable from "../../components/table";
import BillCell from "../../components/table/cells/bill-cell";
import useTableView from "../../hooks/use-table-view";
import AddPersonForm from "../apartments/add-person-form";
import { Button, Select, Stack, Typography } from "@mui/material";
import Iconify from "../../components/iconify";
import AppModal from "../../components/app-modal";
import AddBillType from "./add-bill-type";

export default function BillsView() {
  const [open, setOpen] = useState<"add-bill" | null>(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    filter,
    setFilter,
    order,
    orderBy,
    query,
    setOrder,
    setOrderBy,
    setQuery,
  } = useTableView(data, setData, "billType", ["billType"], []);

  const fetchData = async () => {
    setLoading(false);
    setError(null);
    try {
      const response = await fetch("http://192.168.1.73:8080/apt/bill/types");
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      const result = await response.json();
      setData(result);
    } catch (error: any) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CustomTable
      Cell={BillCell}
      data={data}
      headLabel={[
        { label: "Bill Type", id: "billType" },
        { id: "unit", label: "Unit" },
        { id: "" },
        { id: "" },
      ]}
      searchPlaceholder={"Search billtypes..."}
      title="Bill Type"
      fetchData={fetchData}
      error={error}
      loading={loading}
      setPage={() => {}}
      page={0}
      total={0}
      query={query}
      setQuery={setQuery}
      filter={filter}
      setFilter={setFilter}
      order={order}
      orderBy={orderBy as any}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      head={
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Bill Types</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => setOpen("add-bill")}
            >
              New Bill Type
            </Button>
            <AppModal
              open={open === "add-bill"}
              handleClose={() => setOpen(null)}
            >
              <AddBillType
                onClose={() => {
                  fetchData();
                  setOpen(null);
                }}
              />
            </AppModal>
          </Stack>
        </Stack>
      }
    />
  );
}
