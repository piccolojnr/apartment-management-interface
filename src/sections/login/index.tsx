import { useState } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import { bgGradient } from "../../theme/css";

import Iconify from "../../components/iconify";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useUser } from "../../context/user-context";
import { validateEmail, validatePassword } from "../user/utils";
import { useRouter } from "../../routes/hooks";
import { get_user, login } from "../../lib/api/user";

// ----------------------------------------------------------------------

export default function LoginView() {
  const { loggedIn, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<{
    email: string | null;
    password: string | null;
    submit: string | null;
  }>({
    email: null,
    password: null,
    submit: null,
  });
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (e: any) => {
    e.preventDefault();
    setError({
      email: null,
      password: null,
      submit: null,
    });
    setLoading(true);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setError({
      email: emailError,
      password: passwordError,
      submit: null,
    });

    if (emailError || passwordError) {
      setLoading(false);
      return;
    }
    await handleSubmit();
  };

  const handleUpdateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUpdatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      login(email, password, rememberMe ? "true" : "false")
        .then(() => {
          get_user()
            .then((user) => {
              setUser(user);
              router.push("/");
            })
            .catch((err) => {
              console.error("Failed to get user", err);
              setError({
                ...error,
                submit:
                  err.response?.data?.message ||
                  err?.message ||
                  "An error occurred",
              });
            });
        })
        .catch((err) => {
          console.error("Failed to login", err);
          setError({
            ...error,
            submit:
              err.response?.data?.message ||
              err?.message ||
              "An error occurred",
          });
        });
    } catch (err: any) {
      console.error("Failed to login", err);
      setError({
        ...error,
        submit:
          err.response?.data?.message || err?.message || "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <form>
      <Stack spacing={3}>
        <TextField
          onFocus={() => setError({ ...error, email: null })}
          value={email}
          onChange={handleUpdateEmail}
          name="email"
          label="Email address"
          error={Boolean(error.email)}
          helperText={error.email}
        />

        <TextField
          onFocus={() => setError({ ...error, password: null })}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleUpdatePassword}
          error={Boolean(error.password)}
          helperText={error.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-between"
        sx={{ my: 3, width: "100%", justifyContent: "space-between" }}
      >
        <FormControlLabel
          label="remember me"
          control={
            <Checkbox
              value={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
        />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={async (e) => await handleClick(e)}
        disabled={loading}
        loading={loading}
      >
        Login
      </LoadingButton>

      <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography
          variant="subtitle2"
          color="error"
          sx={{
            mt: 2,
          }}
        >
          {error.submit}
        </Typography>
      </Stack>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* home button */}
      {loggedIn && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            m: 3,
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
      )}

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in</Typography>

          <Divider sx={{ my: 3 }}></Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
