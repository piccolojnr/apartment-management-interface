import { Container } from "@mui/material";
import useSWR from "swr";
import ReusableTable from "@components/table/reusable-table";
import { Column } from "./types";
import { useParams } from "react-router-dom";
import { Device } from "@/types/table";
import { fetcher } from "@lib/api";

// const fetcher = async (url: string) => devices;

export default function DevicesView() {
  const params = useParams();
  const { data } = useSWR<Device[]>(
    params.id ? "/devices/type/" + params.id : "/all/devices",
    fetcher
  );

  const columns: Column[] = [
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
  ];

  return (
    <Container>
      <ReusableTable title="Devices" columns={columns} data={data || []} />
    </Container>
  );
}
