import { Button, TableCell, Typography } from "@mui/material";
import { BillType, Data, Network } from "../../../types/table";
import { useSearchParams } from "react-router-dom";

export default function NetWorkCell({
  data,
  updateSingleData,
}: {
  data: Data<Network>;
  updateSingleData: (data: any) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleView = () => {
    setSearchParams({ tab: "3", billType: data.id });
  };
  return (
    <>
      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {data.network}
        </Typography>
      </TableCell>
    </>
  );
}
