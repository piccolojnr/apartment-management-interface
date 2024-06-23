import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";
import ProtectedRoute from "./protected-route";
import AdminRoute from "./admin-route";
import { MqttProvider } from "../context/mqtt-context";
import exp from "constants";

export const IndexPage = lazy(() => import("../pages/dashboard"));
export const PowerPage = lazy(() => import("../pages/power"));
export const WaterPage = lazy(() => import("../pages/water"));
export const ApartmentsPage = lazy(() => import("../pages/apartments"));
export const ApartmentPage = lazy(
  () => import("../pages/apartments/apartment")
);
export const DevicesPage = lazy(() => import("../pages/devices"));
export const DevicePage = lazy(() => import("../pages/devices/device"));
export const SessionManagementPage = lazy(
  () => import("../pages/session-management")
);
export const UserPage = lazy(() => import("../pages/users"));
export const LoginPage = lazy(() => import("../pages/login"));
export const Page404 = lazy(() => import("../pages/page-not-found"));
export const PageNotAuthorized = lazy(
  () => import("../pages/page-not-authorized")
);
const protocol = "ws";
const host = "broker.emqx.io";
const port = "8083";
const path = "/mqtt";

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `${protocol}://${host}:${port}${path}`;

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute>
          <MqttProvider brokerUrl={connectUrl}>
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
