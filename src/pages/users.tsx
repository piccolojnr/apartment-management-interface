import DashboardLayout from "@layouts/dashboard";
import UserView from "@sections/user/view";
import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------

export default function UsersPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      <DashboardLayout>
        <UserView />
      </DashboardLayout>
    </>
  );
}
