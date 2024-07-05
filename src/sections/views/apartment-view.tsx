import { Container, Typography } from "@mui/material";
import useSWR from "swr";
import ReusableTable from "../../components/table/reusable-table";
import { Column } from "./types";
import { RouterLink } from "../../routes/components";
import { Apartment } from "../../types/table";
import { fetcher } from "../../lib/api";

export default function ApartmentView() {
  const { data } = useSWR<Apartment[]>("/apt/all/apt", fetcher);

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
        <></>
        // <RowPopoverMenu
        //   handleDelete={() => handleDelete(row.id)}
        //   handleOpenModal={() => handleOpenModal(row.id)}
        // />
      ),
    },
  ];

  return (
    <Container>
      <ReusableTable title="Apartments" columns={columns} data={data || []} />
    </Container>
  );
}
