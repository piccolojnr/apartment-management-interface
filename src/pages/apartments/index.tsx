import { Helmet } from "react-helmet-async";
import ApartmentView from "../../sections/apartments/view";

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
