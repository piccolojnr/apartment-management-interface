import ReusableTable from "@components/table/reusable-table";
import { Column } from "./types";
import useSWR from "swr";
import { Container } from "@mui/material";
import { fetcher } from "@lib/api";
import { User } from "@/types/user";

export default function UsersView() {
  const { data } = useSWR<User[]>("users", fetcher);

  const columns: Column[] = [
    { field: "id", headerName: "ID" },
    { field: "username", headerName: "Name" },
    {
      field: "roles",
      headerName: "Roles",
      renderCell: (value: any, row: any) => (
        <div>
          {row.roles.map((role: any, index: number) => (
            <span key={role.id}>
              {role.name}
              {index !== row.roles.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
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
