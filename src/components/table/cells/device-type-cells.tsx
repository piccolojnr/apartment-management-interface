import { TableCell, Typography } from "@mui/material";
import { Data, DeviceType } from "../../../types/table";
import { useSearchParams } from "react-router-dom";

export default function DeviceTypeCells({
  data,
}: {
  data: Data<DeviceType>;
  updateSingleData: (data: any) => void;
}) {
  const [_, setSearchParams] = useSearchParams();

  const handleView = () => {
    setSearchParams({ tab: "3", billType: data.id.toString() });
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
