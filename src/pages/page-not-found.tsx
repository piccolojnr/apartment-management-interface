import { Helmet } from "react-helmet-async";
import ThemeProvider from "../theme";

import { Suspense } from "react";
import NotFoundView from "@sections/error/not-found";

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <ThemeProvider>
      <Suspense>
        <Helmet>
          <title> 404 Page Not Found </title>
        </Helmet>

        <NotFoundView />
      </Suspense>
    </ThemeProvider>
  );
}
