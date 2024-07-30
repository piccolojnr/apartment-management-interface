import { useEffect } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";

import { RouterLink } from "@routes/components";

import { useResponsive } from "@hooks/use-responsive";

import Scrollbar from "@components/scrollbar";

import { NAV } from "./config-layout";
import navConfig from "./config-navigation";
import Iconify from "@components/iconify";
import { fullName } from "@utils/functions";
import { usePathname, useRouter } from "@routes/hooks";
import { account } from "../../_mock/user";
import { useLocation } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { logout } from "@/lib/api/user";

// ----------------------------------------------------------------------
interface NavProps {
  openNav: boolean;
  onCloseNav: () => void;
}
export default function Nav({ openNav, onCloseNav }: NavProps) {
  const pathname = usePathname();
  const upLg = useResponsive("up", "lg");
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
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
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">
          {account && fullName(account)}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {account?.roles?.length > 0 ? account?.roles[0].name : "No role"}
        </Typography>
      </Box>
    </Box>
  );
  const renderMenu = (
    <Stack component="nav" spacing={2} sx={{ px: 2 }}>
      {navConfig.map((category) => (
        <Accordion key={category.category}>
          <AccordionSummary
            expandIcon={<Iconify icon="akar-icons:chevron-down" width={14} />}
            sx={{
              m: 0,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", textTransform: "uppercase" }}
            >
              {category.category}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={0.5}>
              {category.items.map((item) => {
                if (
                  item.title === "users" &&
                  !account?.roles?.find((role) => role.name === "admin")
                ) {
                  return null;
                }
                return <NavItem key={item.title} item={item} />;
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          mt: 3,
          ml: 4,
        }}
        onClick={() => router.push("/")}
      >
        <Iconify
          icon="fluent:home-20-filled"
          sx={{
            color: theme.palette.primary.main,
            fontSize: 32,
            cursor: "pointer",
          }}
        />
      </Box>
      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------
function NavItem({ item, sx }: any) {
  const location = useLocation();
  const pathname = location.pathname;

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={
        item.title == "logout"
          ? "button"
          : item.path.startsWith("http")
          ? "a"
          : RouterLink
      }
      to={item.path}
      target={item.path.startsWith("http") ? "_blank" : undefined}
      onClick={item.title === "logout" ? logout : undefined}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
        ...sx,
      }}
    >
      <Box component="span" sx={{ width: 20, height: 20, mr: 2 }}>
        <Iconify
          icon={item.icon}
          width={20}
          height={20}
          sx={{ opacity: 0.7 }}
        />
      </Box>
      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}
