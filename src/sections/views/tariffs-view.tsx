import { Container } from "@mui/material";
import useSWR from "swr";
import ReusableTable from "../../components/table/reusable-table";
import { Column } from "./types";
import { fDate } from "../../utils/format-time";
import { Tariff } from "../../types/table";
import { useParams } from "react-router-dom";
import { fetcher } from "../../lib/api";

// const fetcher = async (url: string) => tariffs;

export default function TariffsView() {
  const params = useParams();
  const { data } = useSWR<Tariff[]>(
    "/apt/tariff/utility/type/" + params.id,
    fetcher
  );

  // const handleDelete = (id: number) => {
  //   // Implement the deletion logic here
  //   console.log(`Deleting tariff with id ${id}`);
  //   // Update the data state by removing the deleted tariff
  //   const updatedData = data?.filter((tariff) => tariff.id !== id);
  //   mutate(updatedData, false);
  // };

  // const handleOpenModal = (id: number) => {
  //   // Implement the logic to open a modal for editing
  //   console.log(`Editing tariff with id ${id}`);
  // };

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "amount", headerName: "Amount" },
    { field: "per", headerName: "Messure" },
    {
      field: "utilityType",
      headerName: "Utility Type",
      renderCell: (value, row) => row.utilityType.utilityType,
    },
    {
      field: "dateAdded",
      headerName: "Date Added",
      renderCell(value: any) {
        return fDate(value);
      },
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   align: "right",
    //   renderCell: (value: any, row: any) => (
    //     <RowPopoverMenu
    //       handleDelete={() => handleDelete(row.id)}
    //       handleOpenModal={() => handleOpenModal(row.id)}
    //     />
    //   ),
    // },
  ];

  return (
    <Container>
      <ReusableTable title="Tariffs" columns={columns} data={data || []} />
    </Container>
  );
}
