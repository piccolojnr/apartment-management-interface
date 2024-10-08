import UsersView from "@/sections/views/users-view";
import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------

export default function UsersPage() {
  return (
    <>
      <Helmet>
        <title> Users | Minimal UI </title>
      </Helmet>
      <UsersView />
    </>
  );
}
