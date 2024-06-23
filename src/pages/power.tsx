import { Helmet } from "react-helmet-async";
import PowerView from "../sections/power/view";

const Power = () => {
  return (
    <>
      <Helmet>
        <title> Power | Minimal UI </title>
      </Helmet>
      <PowerView />
    </>
  );
};

export default Power;
