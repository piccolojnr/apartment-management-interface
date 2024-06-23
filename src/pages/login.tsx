import LoginView from "../sections/login";
import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>
      <LoginView />
    </>
  );
}
