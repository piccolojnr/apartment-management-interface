import React from "react";
import { Helmet } from "react-helmet-async";
import { BillTypesView } from "../sections/settings/views";

export default function BillTypesPage() {
  return (
    <>
      <Helmet>
        <title> Bill Types | Minimal UI </title>
      </Helmet>
      <BillTypesView />
    </>
  );
}
