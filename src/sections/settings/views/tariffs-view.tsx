import { Container } from "@mui/material";
import useSWR from "swr";
import ReusableTable from "./reusable-table";
import RowPopoverMenu from "../../../components/table/row-popover-menu";
import { tariffs } from "../../../_mock/tariffs";
import { Column } from "./types";
import { fDate } from "../../../utils/format-time";

const fetcher = async (url: string) => tariffs;

export default function TariffsView() {
  const { data, mutate } = useSWR("/tariffs", fetcher);

  const handleDelete = (id: number) => {
    // Implement the deletion logic here
    console.log(`Deleting tariff with id ${id}`);
    // Update the data state by removing the deleted tariff
    const updatedData = data?.filter((tariff) => tariff.id !== id);
    mutate(updatedData, false);
  };

  const handleOpenModal = (id: number) => {
    // Implement the logic to open a modal for editing
    console.log(`Editing tariff with id ${id}`);
  };

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "amount", headerName: "Amount" },
    {
      field: "billType",
      headerName: "Bill Type",
      renderCell(value, row) {
        return (
          <div>
            {row.billType.billType} ({row.billType.unit})
          </div>
        );
      },
    },
    {
      field: "dateAdded",
      headerName: "Date Added",
      renderCell(value: any) {
        return fDate(value);
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
      <ReusableTable title="Tariffs" columns={columns} data={data || []} />
    </Container>
  );
}
