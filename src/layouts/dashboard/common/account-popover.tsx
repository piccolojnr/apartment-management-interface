import { useState } from "react";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { fullName } from "@utils/functions";
import { useRouter } from "@routes/hooks";
import { account } from "../../../_mock/user";
import { logout } from "@lib/api/user";
import { useUser } from "@/context/user-context";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
    path: "/",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    path: "#",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    path: "settings",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const router = useRouter();
  const { user } = useUser();

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (e: any, path?: string) => {
    if (path && MENU_OPTIONS.find((option) => option.path === path)) {
      router.push(path);
    }
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      router.push("/login");

      logout()
        .then(() => {
          router.push("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open
            ? {
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              }
            : {}),
        }}
      >
        <Avatar
          src={""}
          alt={account ? fullName(account) : ""}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account ? fullName(account).charAt(0).toUpperCase() : ""}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {account ? fullName(account) : ""}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account?.roles?.length > 0 ? account?.roles[0].name : "No role"}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            onClick={(e) => handleClose(e, option.path)}
          >
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={async () => await handleLogout()}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
