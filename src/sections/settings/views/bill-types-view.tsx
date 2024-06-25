import { Container, Typography } from "@mui/material";
import useSWR from "swr";
import ReusableTable from "./reusable-table";
import RowPopoverMenu from "../../../components/table/row-popover-menu";
import { billTypes } from "../../../_mock/billType";
import { Column } from "./types";
import { RouterLink } from "../../../routes/components";
const fetcher = async (url: string) => billTypes;

export default function BillTypesView() {
  const { data, mutate } = useSWR("/billType", fetcher);

  const handleDelete = (id: number) => {
    // Implement the deletion logic here
    console.log(`Deleting billType with id ${id}`);
    // Update the data state by removing the deleted billType
    const updatedData = data?.filter((billType) => billType.id !== id);
    mutate(updatedData, false);
  };

  const handleOpenModal = (id: number) => {
    // Implement the logic to open a modal for editing
    console.log(`Editing billType with id ${id}`);
  };

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "billType", headerName: "Bill Type" },
    { field: "unit", headerName: "Unit" },
    {
      field: "view",
      headerName: "",
      renderCell: (value: any, row: any) => (
        <RouterLink to={`/bill-types/${row.id}/tariffs`}>
          <Typography
            variant="body2"
            sx={{ color: "primary.main", cursor: "pointer" }}
          >
            View Tariffs
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
      <ReusableTable title="Bill Types" columns={columns} data={data || []} />
    </Container>
  );
}
