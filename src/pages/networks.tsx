import { Helmet } from "react-helmet-async";
import { NetworksView } from "../sections/settings/views";

export default function NetworksPage() {
  return (
    <>
      <Helmet>
        <title> Networks | Minimal UI </title>
      </Helmet>
      <NetworksView />
    </>
  );
}
