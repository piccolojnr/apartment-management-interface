import { Helmet } from "react-helmet-async";
import { ApartmentView } from "../../sections/settings/views";

const Apartments = () => {
  return (
    <>
      <Helmet>
        <title> Apartments | Minimal UI </title>
      </Helmet>
      <ApartmentView />
    </>
  );
};

export default Apartments;
