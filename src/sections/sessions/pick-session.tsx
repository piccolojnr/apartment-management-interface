import useSWR from "swr";
import { BillSession } from "@/types/table";
import ReusableTable from "@components/table/reusable-table";
import { fDate } from "@utils/format-time";
import { fetcher_bill } from "@/lib/api";

function PickSession({
  handleSetSession,
}: {
  handleSetSession: (session: BillSession) => void;
}) {
  const { data } = useSWR<BillSession[]>("/bill/sessions", fetcher_bill);

  return (
    <ReusableTable
      data={data || []}
      columns={[
        {
          headerName: "ID",
          field: "id",
        },
        {
          headerName: "Start Date",
          field: "startDate",
          renderCell: (date: string) => fDate(date),
        },
        {
          headerName: "End Date",
          field: "endDate",
          renderCell: (date: string) => fDate(date),
        },
        {
          headerName: "Year",
          field: "year",
        },
        {
          headerName: "Date Created",
          field: "dateCreated",
          renderCell: (date: string) => fDate(date),
        },
      ]}
      onClickRow={handleSetSession}
    />
  );
}

export default PickSession;
