import { Container, Typography } from "@mui/material";
import useSWR from "swr";
import ReusableTable from "./reusable-table";
import RowPopoverMenu from "../../../components/table/row-popover-menu";
import { Column } from "./types";
import { devices } from "../../../_mock/device";
import { useParams } from "react-router-dom";
import { Device } from "../../../types/table";
import { fetcher } from "../forms/api";
import { useEffect } from "react";

// const fetcher = async (url: string) => devices;

export default function DevicesView() {
  const params = useParams();
  const { data, mutate } = useSWR<Device[]>(
    params.id ? "/apt/devices/type/" + params.id : "/apt/all/devices",
    fetcher
  );

  const handleDelete = (id: number) => {
    // Implement the deletion logic here
    console.log(`Deleting device with id ${id}`);
    // Update the data state by removing the deleted device
    const updatedData = data?.filter((device) => device.id !== id);
    mutate(updatedData, false);
  };

  const handleOpenModal = (id: number) => {
    // Implement the logic to open a modal for editing
    console.log(`Editing device with id ${id}`);
  };

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "deviceName", headerName: "Name" },
    {
      field: "type",
      headerName: "Type",
      renderCell: (value: any, row: any) => (
        <Typography variant="body2">{row.deviceType.deviceType}</Typography>
      ),
    },

    {
      field: "view",
      headerName: "",
      align: "right",
      renderCell: (value: any, row: any) => (
        <Typography
          variant="body2"
          sx={{ color: "primary.main", cursor: "pointer" }}
        >
          View details
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "right",
      renderCell: (value: any, row: any) => (
        <RowPopoverMenu
          handleDelete={() => handleDelete(row.id)}
          handleOpenModal={() => handleOpenModal(row.id)}
        />
      ),
    },
  ];

  return (
    <Container>
      <ReusableTable title="Devices" columns={columns} data={data || []} />
    </Container>
  );
}
