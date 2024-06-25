import { Container } from "@mui/material";
import useSWR from "swr";
import ReusableTable from "./reusable-table";
import RowPopoverMenu from "../../../components/table/row-popover-menu";
import { networks } from "../../../_mock/networks";
import { Column } from "./types";
import { Network } from "../../../types/table";
import { fetcher } from "../forms/api";

// const fetcher = async (url: string) => networks;

export default function NetworksView() {
  const { data, mutate } = useSWR<Network[]>("/apt/networks", fetcher);

  const handleDelete = (id: number) => {
    // Implement the deletion logic here
    console.log(`Deleting network with id ${id}`);
    // Update the data state by removing the deleted network
    const updatedData = data?.filter((network) => network.id !== id);
    mutate(updatedData, false);
  };

  const handleOpenModal = (id: number) => {
    // Implement the logic to open a modal for editing
    console.log(`Editing network with id ${id}`);
  };

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "network", headerName: "Network" },
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
      <ReusableTable title="Networks" columns={columns} data={data || []} />
    </Container>
  );
}
