import { Helmet } from "react-helmet-async";
import SessionsView from "../../sections/sessions/view";

export default function SessionsPage() {
  return (
    <>
      <Helmet>
        <title>Sessions | Minimal UI</title>
      </Helmet>
      <SessionsView />
    </>
  );
}
