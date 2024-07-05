import useSWR from "swr";
import { BillSession } from "../../types/table";
import { fetcher } from "../../lib/api";
import ReusableTable from "../../components/table/reusable-table";
import { fDate } from "../../utils/format-time";

function PickSession({
  handleSetSession,
}: {
  handleSetSession: (session: BillSession) => void;
}) {
  const { data } = useSWR<BillSession[]>("/apt/bill/sessions", fetcher);

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
