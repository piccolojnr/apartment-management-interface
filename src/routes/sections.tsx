import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "@layouts/dashboard";
import ProtectedRoute from "./protected-route";
import AdminRoute from "./admin-route";
import { MqttProvider } from "@context/mqtt-context";

export const IndexPage = lazy(() => import("@pages/dashboard"));
export const SettingsPage = lazy(() => import("@pages/settings"));
export const PowerPage = lazy(() => import("@pages/power"));
export const WaterPage = lazy(() => import("@pages/water"));
export const ApartmentsPage = lazy(() => import("@pages/apartments"));
export const ApartmentPage = lazy(() => import("@pages/apartments/apartment"));
export const ContactsPage = lazy(() => import("@pages/contacts"));

export const UtilityTypesPage = lazy(() => import("@pages/utility-types"));
export const UtilityPage = lazy(
  () => import("@pages/utility-types/utility-type")
);

export const TariffsPage = lazy(() => import("@pages/tariffs"));

export const NetworksPage = lazy(() => import("@pages/networks"));

export const DevicesPage = lazy(() => import("@pages/devices"));
export const DevicePage = lazy(() => import("@pages/devices/device"));

export const SessionsPage = lazy(() => import("@pages/sessions"));

export const UserPage = lazy(() => import("@pages/users"));
export const RolePage = lazy(() => import("@pages/roles"));

export const LoginPage = lazy(() => import("@pages/login"));
export const Page404 = lazy(() => import("@pages/page-not-found"));
export const PageNotAuthorized = lazy(
  () => import("@pages/page-not-authorized")
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
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <DevicesPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "devices/:id",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <DevicePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "power",
          element: (
            <ProtectedRoute requiredRoles={["tenant"]}>
              <PowerPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "water",
          element: (
            <ProtectedRoute requiredRoles={["tenant"]}>
              <WaterPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "apartments",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <ApartmentsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "apartments/:id",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <ApartmentPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "apartments/:id/contacts",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <ContactsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "contacts",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <ContactsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "utility-types",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <UtilityTypesPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "utility-types/:id",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <UtilityPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "utility-types/:id/devices",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <DevicesPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "utility-types/:id/tariffs",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <TariffsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "networks",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <NetworksPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "sessions",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <SessionsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "users",
          element: <UserPage />,
        },
        {
          path: "roles",
          element: (
            <ProtectedRoute requiredRoles={["admin", "administrator"]}>
              <RolePage />
            </ProtectedRoute>
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
