import { useEffect, useState } from "react";
import CustomTable from "../../components/table";
import useTableView from "../../hooks/use-table-view";
import { Button, Stack, Typography } from "@mui/material";
import Iconify from "../../components/iconify";
import AppModal from "../../components/app-modal";
import AddNetwork from "./forms/add-network";
import NetworkCells from "../../components/table/cells/network-cells";

export default function NetworksView() {
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
  } = useTableView(data, setData, "network", ["network"], []);

  const fetchData = async () => {
    setLoading(false);
    setError(null);
    try {
      const response = await fetch("http://192.168.1.73:8080/apt/networks");
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
      Cells={NetworkCells}
      data={data}
      headLabel={[{ label: "Network", id: "network" }, { id: "" }]}
      searchPlaceholder={"Search networks..."}
      title="Network"
      error={error}
      loading={loading}
      query={query}
      setQuery={setQuery}
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
          <Typography variant="h4">Networks</Typography>
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
              New Network
            </Button>
            <AppModal
              open={open === "add-bill"}
              handleClose={() => setOpen(null)}
            >
              <AddNetwork
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
