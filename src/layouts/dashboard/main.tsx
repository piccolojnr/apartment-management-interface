import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import { useResponsive } from "@hooks/use-responsive";

import { NAV, HEADER } from "./config-layout";
import Breadcrumbs from "@components/breadcrumbs";

// ----------------------------------------------------------------------

const SPACING = 8;

interface MainProps {
  children: React.ReactNode;
  sx?: object;
}
export default function Main({ children, sx, ...other }: MainProps) {
  const lgUp = useResponsive("up", "lg");

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          px: 2,
          pb: 2,
          flexShrink: 0,
          bgcolor: "background.default",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Breadcrumbs />
      </Box>
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
