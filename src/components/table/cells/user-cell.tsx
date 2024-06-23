import { Avatar, Stack, TableCell, Typography } from "@mui/material";
import { User } from "../../../types/user";
import { fullName } from "../../../utils/functions";
import Label from "../../label";

export default function UserCell({
  data: user,
}: {
  data: User;
  updateSingleData: (data: User) => void;
}) {
  return (
    <>
      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={fullName(user)} src={user.profile.avatar} />
          <Typography variant="subtitle2" noWrap>
            {fullName(user)}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>{user.role.toLowerCase()}</TableCell>

      <TableCell align="center">
        {user.profile.is_verified ? "Yes" : "No"}
      </TableCell>

      <TableCell>
        <Label color="success">{/* {user.status.toLowerCase()} */}active</Label>
      </TableCell>
    </>
  );
}
