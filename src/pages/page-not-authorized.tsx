"use client";
import { Helmet } from "react-helmet-async";
import ThemeProvider from "../theme";

import { Suspense } from "react";
import { NotAuthorized } from "../sections/error";

// ----------------------------------------------------------------------

export default function NotAuthorizedPage() {
  return (
    <ThemeProvider>
      <Suspense>
        <Helmet>
          <title> 401 Not Authorized </title>
        </Helmet>

        <NotAuthorized />
      </Suspense>
    </ThemeProvider>
  );
}
