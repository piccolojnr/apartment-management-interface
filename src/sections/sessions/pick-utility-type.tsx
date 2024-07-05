import { UtilityType } from "../../types/table";
import useSWR from "swr";
import ReusableTable from "../../components/table/reusable-table";
import { fetcher } from "../../lib/api";

function PickUtilityType({
  handleSetUtilityType,
}: {
  handleSetUtilityType: (utilityType: UtilityType) => void;
}) {
  const { data } = useSWR<UtilityType[]>("/apt/utility/types", fetcher);

  return (
    <ReusableTable
      data={data || []}
      columns={[
        { field: "id", headerName: "ID" },
        { field: "utilityType", headerName: "Utility Type" },

        { field: "fixedRate", headerName: "Fixed Rate" },
        { field: "unit", headerName: "Unit" },
      ]}
      onClickRow={handleSetUtilityType}
    />
  );
}

export default PickUtilityType;
