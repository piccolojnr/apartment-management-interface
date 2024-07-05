import { TableCell, Typography } from "@mui/material";
import { Data, Tariff } from "../../../types/table";
import { fDate } from "../../../utils/format-time";

export default function TariffCells({
  data,
}: {
  data: Data<Tariff>;
  updateSingleData: (data: any) => void;
}) {
  return (
    <>
      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {data.amount}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{data.per}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{fDate(data.dateAdded)}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{data.utilityType.utilityType}</Typography>
      </TableCell>
    </>
  );
}
