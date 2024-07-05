import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Iconify from "@components/iconify";
import AppModal from "@components/app-modal";
import AddDeviceType from "./forms/add-utility-type";

export default function DeviceTypeView({}) {
  const [open, setOpen] = useState<"add-bill" | null>(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(false);
    setError(null);
    try {
      const response = await fetch("http://192.168.1.73:8080/apt/device/types");
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }
      const result = await response.json();
      console.log(result);
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
    <></>
    // <CustomTable
    //   Cells={DeviceTypeCells}
    //   data={data}
    //   headLabel={[{ label: "Device Type", id: "deviceType" }, { id: "" }]}
    //   searchPlaceholder={"Search device types..."}
    //   title="Device Type"
    //   error={error}
    //   loading={loading}
    //   setPage={() => {}}
    //   page={0}
    //   total={0}
    //   query={query}
    //   setQuery={setQuery}
    //   order={order}
    //   orderBy={orderBy as any}
    //   setOrder={setOrder}
    //   setOrderBy={setOrderBy}
    //   head={
    //     <Stack
    //       direction="row"
    //       alignItems="center"
    //       justifyContent="space-between"
    //       mb={5}
    //     >
    //       <Typography variant="h4">Device Types</Typography>
    //       <Stack
    //         direction="row"
    //         alignItems="center"
    //         justifyContent="space-between"
    //         gap={2}
    //       >
    //         <Button
    //           variant="contained"
    //           color="inherit"
    //           startIcon={<Iconify icon="eva:plus-fill" />}
    //           onClick={() => setOpen("add-bill")}
    //         >
    //           New Device Type
    //         </Button>
    //         <AppModal
    //           open={open === "add-bill"}
    //           handleClose={() => setOpen(null)}
    //         >
    //           <AddDeviceType
    //             onClose={() => {
    //               fetchData();
    //               setOpen(null);
    //             }}
    //           />
    //         </AppModal>
    //       </Stack>
    //     </Stack>
    //   }
    // />
  );
}
