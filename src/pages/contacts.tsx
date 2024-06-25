import { Helmet } from "react-helmet-async";
import { ContactsView } from "../sections/settings/views";

export default function ContactsPage() {
  return (
    <>
      <Helmet>
        <title> Contacts | Minimal UI </title>
      </Helmet>
      <ContactsView />
    </>
  );
}
