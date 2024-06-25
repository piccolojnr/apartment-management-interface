import { Container, Typography } from "@mui/material";
import useSWR from "swr";
import ReusableTable from "./reusable-table";
import RowPopoverMenu from "../../../components/table/row-popover-menu";
import { deviceTypes } from "../../../_mock/deviceType";
import { Column } from "./types";
import { RouterLink } from "../../../routes/components";
import { fetcher } from "../forms/api";
import { DeviceType } from "../../../types/table";
// const fetcher = async (url: string) => deviceTypes;

export default function DeviceTypesView() {
  const { data, mutate } = useSWR<DeviceType[]>("/apt/device/types", fetcher);

  const handleDelete = (id: number) => {
    // Implement the deletion logic here
    console.log(`Deleting deviceType with id ${id}`);
    // Update the data state by removing the deleted deviceType
    const updatedData = data?.filter((deviceType) => deviceType.id !== id);
    mutate(updatedData, false);
  };

  const handleOpenModal = (id: number) => {
    // Implement the logic to open a modal for editing
    console.log(`Editing deviceType with id ${id}`);
  };

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "deviceType", headerName: "Device Type" },
    {
      field: "view",
      headerName: "",
      renderCell: (value: any, row: any) => (
        <RouterLink to={`/device-types/${row.id}/devices`}>
          <Typography
            variant="body2"
            sx={{ color: "primary.main", cursor: "pointer" }}
          >
            View devices
          </Typography>
        </RouterLink>
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
      <ReusableTable title="Device Types" columns={columns} data={data || []} />
    </Container>
  );
}
