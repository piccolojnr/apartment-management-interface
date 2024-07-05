import { Helmet } from "react-helmet-async";
import { NetworksView } from "@sections/views";

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
