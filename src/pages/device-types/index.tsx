import { Helmet } from "react-helmet-async";
import { DeviceTypesView } from "../../sections/settings/views";

export default function DeviceTypesPage() {
  return (
    <>
      <Helmet>
        <title> Device Types | Minimal UI </title>
      </Helmet>
      <DeviceTypesView />
    </>
  );
}
