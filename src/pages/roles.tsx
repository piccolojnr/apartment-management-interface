import RolesView from "@/sections/views/roles-view";
import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------

export default function UsersPage() {
  return (
    <>
      <Helmet>
        <title> User Roles | Minimal UI </title>
      </Helmet>
      <RolesView />
    </>
  );
}
