import { Button, TableCell, Typography } from "@mui/material";
import { BillType, Data } from "../../../types/table";
import { useSearchParams } from "react-router-dom";

export default function BillCell({
  data,
  updateSingleData,
}: {
  data: Data<BillType>;
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
          {data.billType}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{data.unit}</Typography>
      </TableCell>
      <TableCell>
        <Button onClick={handleView}>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{
              color: "primary.main",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
              textAlign: "flex-end",
            }}
          >
            View
          </Typography>
        </Button>
      </TableCell>
    </>
  );
}
