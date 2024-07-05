import { Helmet } from "react-helmet-async";
import { ContactsView } from "@sections/views";

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
