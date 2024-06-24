import { useEffect, useState } from "react";
import CustomTable from "../../components/table";
import BillCell from "../../components/table/cells/bill-cell";
import useTableView from "../../hooks/use-table-view";
import AddPersonForm from "../apartments/add-person-form";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "../../components/iconify";
import AppModal from "../../components/app-modal";
import AddBillType from "./add-bill-type";
import { BillType } from "../../types/table";
import TariffCell from "../../components/table/cells/tariff-cell";
import { useSearchParams } from "react-router-dom";
import { set } from "lodash";
import AddTariff from "./add-tariff";

export default function TariffView() {
  const [billTypes, setBillTypes] = useState<BillType[]>([]);
  const [loadingBT, setLoadingBT] = useState(false);
  const [open, setOpen] = useState<"add-bill" | null>(null);
  const [billType, setBillType] = useState("");
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
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async (billType?: string) => {
    setLoading(false);
    setError(null);
    if (!billType) {
      setData([]);
      return;
    }
    try {
      const response = await fetch(
        "http://192.168.1.73:8080/apt/tariff/bill/type/" + billType
      );
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
    const _billType = searchParams.get("billType");
    if (_billType) {
      setBillType(_billType);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData(billType);
  }, [billType]);

  useEffect(() => {
    const getBillTypes = async () => {
      setLoadingBT(true);
      try {
        const response = await fetch("http://192.168.1.73:8080/apt/bill/types");
        if (!response.ok) {
          const err = await response.text();
          throw new Error(err);
        }
        const result = await response.json();
        setBillTypes(result);
        if (result.length > 0) {
          const _billType = searchParams.get("billType");
          if (!_billType) setSearchParams({ billType: result[0].id });
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoadingBT(false);
      }
    };
    getBillTypes();
  }, []);
  return (
    <CustomTable
      Cell={TariffCell}
      AddModal={AddPersonForm}
      UpdateModal={AddPersonForm}
      data={data}
      headLabel={[
        { label: "Amount", id: "amount" },
        { id: "per", label: "Messure" },
        { id: "dateAdded", label: "Date Added" },
        { id: "billType", label: "Bill Type" },
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
              onSubmit={(e) => fetchData(billType)}
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
                defaultValue={""}
                sx={{
                  width: "100%",
                }}
                onChange={(e) => fetchData(e.target.value)}
                value={billType}
              >
                {billTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id} itemID={type.id}>
                    {type.billType}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => setOpen("add-bill")}
              sx={{
                width: "100%",
              }}
            >
              New Bill Type
            </Button>
            <AppModal
              open={open === "add-bill"}
              handleClose={() => setOpen(null)}
            >
              <AddTariff
                onClose={() => {
                  fetchData(billType);
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
