import { TableCell, Typography } from "@mui/material";
import { Data, Network } from "../../../types/table";

export default function NetworkCells({
  data,
}: {
  data: Data<Network>;
  updateSingleData: (data: any) => void;
}) {
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
