import { Helmet } from "react-helmet-async";
import DeviceView from "../../sections/devices/view";

const Devices = () => {
  return (
    <>
      <Helmet>
        <title> Devices | Minimal UI </title>
      </Helmet>
      <DeviceView />
    </>
  );
};

export default Devices;
