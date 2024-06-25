import ReusableTable from "./reusable-table";
import RowPopoverMenu from "../../../components/table/row-popover-menu";
import { Column } from "./types";
import useSWR from "swr";
import { Container } from "@mui/material";
import { contacts } from "../../../_mock/contacts";
const fetcher = async (url: string) => contacts;

export default function ContactsView() {
  const { data, mutate } = useSWR("/contacts", fetcher);

  const handleDelete = (id: number) => {
    // Implement the deletion logic here
    console.log(`Deleting contacts with id ${id}`);
    // Update the data state by removing the deleted contacts
    const updatedData = data?.filter((contacts) => contacts.id !== id);
    mutate(updatedData, false);
  };

  const handleOpenModal = (id: number) => {
    // Implement the logic to open a modal for editing
    console.log(`Editing contacts with id ${id}`);
  };

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "phoneNumber", headerName: "Phone Number" },
    { field: "email", headerName: "Email" },
    {
      field: "network",
      headerName: "Network",
      renderCell(value, row) {
        return row.network.network;
      },
    },
    {
      field: "apartment",
      headerName: "Apartment",
      renderCell(value, row) {
        return row.apartment.name;
      },
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
      <ReusableTable title="Contacts" columns={columns} data={data || []} />
    </Container>
  );
}
