import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";
import ProtectedRoute from "./protected-route";
import AdminRoute from "./admin-route";
import { MqttProvider } from "../context/mqtt-context";

export const IndexPage = lazy(() => import("../pages/dashboard"));
export const SettingsPage = lazy(() => import("../pages/settings"));
export const PowerPage = lazy(() => import("../pages/power"));
export const WaterPage = lazy(() => import("../pages/water"));
export const ApartmentsPage = lazy(() => import("../pages/apartments"));
export const ApartmentPage = lazy(
  () => import("../pages/apartments/apartment")
);
export const ContactsPage = lazy(() => import("../pages/contacts"));

export const UtilityTypesPage = lazy(() => import("../pages/utility-types"));
export const UtilityPage = lazy(
  () => import("../pages/utility-types/utility-type")
);

export const BillTypesPage = lazy(() => import("../pages/bill-types"));
export const BillTypePage = lazy(() => import("../pages/bill-types/bill-type"));
export const TariffsPage = lazy(() => import("../pages/tariffs"));

export const NetworksPage = lazy(() => import("../pages/networks"));

export const DevicesPage = lazy(() => import("../pages/devices"));
export const DevicePage = lazy(() => import("../pages/devices/device"));

export const SessionsPage = lazy(() => import("../pages/sessions"));

export const UserPage = lazy(() => import("../pages/users"));

export const LoginPage = lazy(() => import("../pages/login"));
export const Page404 = lazy(() => import("../pages/page-not-found"));
export const PageNotAuthorized = lazy(
  () => import("../pages/page-not-authorized")
);

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute>
          <MqttProvider>
            <DashboardLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          </MqttProvider>
        </ProtectedRoute>
      ),
      children: [
        {
          element: <IndexPage />,
          index: true,
        },
        {
          path: "settings",
          element: <SettingsPage />,
        },

        {
          path: "devices",
          element: (
            // <AdminRoute>
            <DevicesPage />
            // </AdminRoute>
          ),
        },
        {
          path: "devices/:id",
          element: (
            // <AdminRoute>
            <DevicePage />
            // </AdminRoute>
          ),
        },
        {
          path: "power",
          element: (
            // <AdminRoute>
            <PowerPage />
            // </AdminRoute>
          ),
        },
        {
          path: "water",
          element: (
            // <AdminRoute>
            <WaterPage />
            // </AdminRoute>
          ),
        },
        {
          path: "apartments",
          element: (
            // <AdminRoute>
            <ApartmentsPage />
            // </AdminRoute>
          ),
        },
        {
          path: "apartments/:id",
          element: (
            // <AdminRoute>
            <ApartmentPage />
            // </AdminRoute>
          ),
        },
        {
          path: "apartments/:id/contacts",
          element: (
            // <AdminRoute>
            <ContactsPage />
            // </AdminRoute>
          ),
        },
        {
          path: "contacts",
          element: (
            // <AdminRoute>
            <ContactsPage />
            // </AdminRoute>
          ),
        },
        {
          path: "utility-types",
          element: (
            // <AdminRoute>
            <UtilityTypesPage />
            // </AdminRoute>
          ),
        },
        {
          path: "utility-types/:id",
          element: (
            // <AdminRoute>
            <UtilityPage />
            // </AdminRoute>
          ),
        },
        {
          path: "utility-types/:id/devices",
          element: (
            // <AdminRoute>
            <DevicesPage />
            // </AdminRoute>
          ),
        },
        {
          path: "bill-types",
          element: (
            // <AdminRoute>
            <BillTypesPage />
            // </AdminRoute>
          ),
        },
        {
          path: "bill-types/:id",
          element: (
            // <AdminRoute>
            <BillTypePage />
            // </AdminRoute>
          ),
        },
        {
          path: "utility-types/:id/tariffs",
          element: (
            // <AdminRoute>
            <TariffsPage />
            // </AdminRoute>
          ),
        },
        {
          path: "networks",
          element: (
            // <AdminRoute>
            <NetworksPage />
            // </AdminRoute>
          ),
        },
        {
          path: "sessions",
          element: (
            // <AdminRoute>
            <SessionsPage />
            // </AdminRoute>
          ),
        },
        {
          path: "users",
          element: (
            <AdminRoute>
              <UserPage />
            </AdminRoute>
          ),
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "not-authorized",
      element: <PageNotAuthorized />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
