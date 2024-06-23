import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import { bgBlur } from "../../theme/css";

import { NAV, HEADER } from "./config-layout";
import { useResponsive } from "../../hooks/use-responsive";
import Iconify from "../../components/iconify";
import AccountPopover from "./common/account-popover";
import NotificationsPopover from "./common/notifications-popover";
import Label from "../../components/label";
import { useMqtt } from "../../context/mqtt-context";

// ----------------------------------------------------------------------

interface HeaderProps {
  onOpenNav: VoidFunction;
}

export default function Header({ onOpenNav }: HeaderProps) {
  const theme = useTheme();
  const { isConnected } = useMqtt();

  const lgUp = useResponsive("up", "lg");

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}
      <Box sx={{ flexGrow: 1 }} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <Label color={isConnected ? "success" : "error"}>
          <Iconify
            icon={
              isConnected
                ? "eva:checkmark-circle-2-fill"
                : "eva:alert-circle-fill"
            }
            width={16}
            height={16}
          />
        </Label>

        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...(bgBlur({
          color: theme.palette.background.default,
        }) as any),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp
          ? {
              width: `calc(100% - ${NAV.WIDTH + 1}px)`,
              height: HEADER.H_DESKTOP,
            }
          : {}),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
