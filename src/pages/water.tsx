import { Helmet } from "react-helmet-async";
import { WaterView } from "@sections/water/view";

const Water = () => {
  return (
    <>
      <Helmet>
        <title> Water | Minimal UI </title>
      </Helmet>
      <WaterView />
    </>
  );
};

export default Water;
