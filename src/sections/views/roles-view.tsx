import ReusableTable from "@components/table/reusable-table";
import { Column } from "./types";
import useSWR from "swr";
import { Container } from "@mui/material";
import { fetcher } from "@lib/api";
import { Role } from "@/types/user";

// const fetcher = async (url: string) => contacts;

export default function RolesView() {
  const { data } = useSWR<Role[]>("user/roles", fetcher);

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    {
      field: "actions",
      headerName: "Actions",
      align: "right",
      renderCell: (value: any, row: any) => (
        <></>
        // <RowPopoverMenu
        //   handleDelete={() => handleDelete(row.id)}
        //   handleOpenModal={() => handleOpenModal(row.id)}
        //   handleSendSms={() => onSendSms([row.id])}
        // />
      ),
    },
  ];
  return (
    <>
      <Container>
        <ReusableTable
          title="Roles"
          columns={columns}
          data={data || []}
          CustomTollbarIcons={[]}
        />
      </Container>
    </>
  );
}
