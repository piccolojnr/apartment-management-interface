import { Helmet } from "react-helmet-async";
import PowerView from "../sections/power/view";

const SessionManagement = () => {
  return (
    <>
      <Helmet>
        <title> SessionManagement | Minimal UI </title>
      </Helmet>
      <PowerView />
    </>
  );
};

export default SessionManagement;
