import { Button, TableCell, Typography } from "@mui/material";
import { BillType, Data, DeviceType, Network } from "../../../types/table";
import { useSearchParams } from "react-router-dom";

export default function DeviceTypeCell({
  data,
  updateSingleData,
}: {
  data: Data<DeviceType>;
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
          {data.deviceType}
        </Typography>
      </TableCell>
    </>
  );
}
