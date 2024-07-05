import { Container } from "@mui/material";
import useSWR from "swr";
import ReusableTable from "@components/table/reusable-table";
import { Column } from "./types";
import { Network } from "@/types/table";
import { fetcher } from "@lib/api";

export default function NetworksView() {
  const { data } = useSWR<Network[]>("/apt/networks", fetcher);

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "network", headerName: "Network" },
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
      <ReusableTable title="Networks" columns={columns} data={data || []} />
    </Container>
  );
}
