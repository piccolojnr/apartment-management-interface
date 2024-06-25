import { Helmet } from "react-helmet-async";
import DevicesView from "../../sections/settings/views/devices-view";

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
