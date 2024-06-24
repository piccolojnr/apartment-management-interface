import { Helmet } from "react-helmet-async";
import SettingsView from "../sections/settings/view";

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title>Settings | Minimal UI</title>
      </Helmet>
      <SettingsView />
    </>
  );
}
