import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { RouterLink } from "../../routes/components";
import Iconify from "../../components/iconify";

export default function NotAuthorizedView() {
  const theme = useTheme();

  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: "fixed",
        p: (theme) => ({
          xs: theme.spacing(3, 3, 0),
          sm: theme.spacing(5, 5, 0),
        }),
      }}
    >
      <IconButton
        href="/"
        component={RouterLink}
        sx={{ color: theme.palette.primary.main }}
      >
        <Iconify
          icon="fluent:home-20-filled"
          sx={{
            color: theme.palette.primary.main,
            fontSize: 32,
            cursor: "pointer",
          }}
        />
      </IconButton>
    </Box>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: "auto",
            display: "flex",
            minHeight: "100vh",
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Not Authorized
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, you are not authorized to view this page.
          </Typography>

          <Box
            component="img"
            src={"/assets/illustrations/illustration_401.svg"}
            sx={{
              mx: "auto",
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button
            href="/"
            size="large"
            variant="contained"
            component={RouterLink}
          >
            Go to Home
          </Button>
        </Box>
      </Container>
    </>
  );
}
