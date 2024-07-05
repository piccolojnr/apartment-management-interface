import { Helmet } from "react-helmet-async";
import ApartmentView from "@sections/apartments/view";
import ApartmentOverview from "@sections/apartments/apartment-overview";

const Apartments = () => {
  return (
    <>
      <Helmet>
        <title> Apartments | Minimal UI </title>
      </Helmet>
      <ApartmentOverview />
    </>
  );
};

export default Apartments;
