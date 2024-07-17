import { Container, Typography } from "@mui/material";
import useSWR from "swr";
import { Column } from "./types";
import ReusableTable from "@components/table/reusable-table";
import { RouterLink } from "@routes/components";
import { UtilityType } from "@/types/table";
import { fetcher_api } from "@lib/api";

export default function UtilityTypesView() {
  const { data } = useSWR<UtilityType[]>("/utility/types", fetcher_api);

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
