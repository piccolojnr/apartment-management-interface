import { Helmet } from "react-helmet-async";
import { TariffsView } from "../sections/views";

export default function TariffsPage() {
  return (
    <>
      <Helmet>
        <title> Tariffs | Minimal UI </title>
      </Helmet>
      <TariffsView />
    </>
  );
}
