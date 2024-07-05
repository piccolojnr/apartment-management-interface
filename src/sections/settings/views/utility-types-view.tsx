import { Container, Typography } from "@mui/material";
import useSWR from "swr";
import ReusableTable from "./reusable-table";
import RowPopoverMenu from "../../../components/table/row-popover-menu";
import { Column } from "./types";
import { RouterLink } from "../../../routes/components";
import { fetcher } from "../forms/api";
import { UtilityType } from "../../../types/table";

export default function UtilityTypesView() {
  const { data, mutate } = useSWR<UtilityType[]>("/apt/utility/types", fetcher);

  const handleDelete = (id: number) => {
    // Implement the deletion logic here
    console.log(`Deleting utilityType with id ${id}`);
    // Update the data state by removing the deleted utilityType
    const updatedData = data?.filter((utilityType) => utilityType.id !== id);
    mutate(updatedData, false);
  };

  const handleOpenModal = (id: number) => {
    // Implement the logic to open a modal for editing
    console.log(`Editing utilityType with id ${id}`);
  };

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "utilityType", headerName: "Device Type" },

    { field: "fixedRate", headerName: "Fixed Rate" },
    { field: "unit", headerName: "Unit" },
    {
      field: "view",
      headerName: "",
      renderCell: (value: any, row: any) => (
        <RouterLink to={`/utility-types/${row.id}/tariffs`}>
          <Typography
            variant="body2"
            sx={{ color: "primary.main", cursor: "pointer" }}
          >
            View tariff
          </Typography>
        </RouterLink>
      ),
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
      <ReusableTable
        title="Utility Types"
        columns={columns}
        data={data || []}
      />
    </Container>
  );
}
