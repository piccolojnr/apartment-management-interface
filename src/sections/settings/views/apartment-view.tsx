import { Container, Typography } from "@mui/material";
import useSWR from "swr";
import ReusableTable from "./reusable-table";
import RowPopoverMenu from "../../../components/table/row-popover-menu";
import { apartments } from "../../../_mock/apartments";
import { Column } from "./types";
import { RouterLink } from "../../../routes/components";

const fetcher = async (url: string) => apartments;

export default function ApartmentView() {
  const { data, mutate } = useSWR("/apartments", fetcher);

  const handleDelete = (id: number) => {
    // Implement the deletion logic here
    console.log(`Deleting apartment with id ${id}`);
    // Update the data state by removing the deleted apartment
    const updatedData = data?.filter((apartment) => apartment.id !== id);
    mutate(updatedData, false);
  };

  const handleOpenModal = (id: number) => {
    // Implement the logic to open a modal for editing
    console.log(`Editing apartment with id ${id}`);
  };

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "floor", headerName: "Floor" },
    {
      field: "contacts",
      headerName: "Contacts",
      align: "right",
      renderCell: (value: any, row: any) => (
        <RouterLink
          to={`/apartments/${row.id}/contacts`}
          sx={{ color: "primary.main" }}
        >
          <Typography
            variant="body2"
            sx={{ color: "primary.main", cursor: "pointer" }}
          >
            View contacts
          </Typography>
        </RouterLink>
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
      <ReusableTable title="Apartments" columns={columns} data={data || []} />
    </Container>
  );
}
