import { Helmet } from "react-helmet-async";
import { UtilityTypesView } from "@sections/views";

export default function UtilityTypesPage() {
  return (
    <>
      <Helmet>
        <title> Utility Types | Minimal UI </title>
      </Helmet>
      <UtilityTypesView />
    </>
  );
}
