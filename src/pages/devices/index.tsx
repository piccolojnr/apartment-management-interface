import { Helmet } from "react-helmet-async";
import { DevicesView } from "../../sections/views";

const Devices = () => {
  return (
    <>
      <Helmet>
        <title> Devices | Minimal UI </title>
      </Helmet>
      <DevicesView />
    </>
  );
};

export default Devices;
