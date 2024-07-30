import { title } from "process";
import SvgColor from "@components/svg-color";
import path from "path";
import { icon } from "leaflet";

// ----------------------------------------------------------------------

const navConfig = [
  {
    category: "Dashboard",
    items: [
      {
        title: "dashboard",
        path: "/",
        icon: "ic:round-dashboard",
        requiredRoles: [],
      },
    ],
    requiredRoles: [],
  },
  {
    category: "Utilities",
    items: [
      {
        title: "power",
        path: "/power",
        icon: "ic:round-electric-bolt",
        reuiredRoles: ["user"],
      },
      {
        title: "water",
        path: "/water",
        icon: "ic:round-water",
        requiredRoles: ["user"],
      },
    ],
    requiredRoles: ["user"],
  },
  {
    category: "Management",
    items: [
      {
        title: "apartments",
        path: "/apartments",
        icon: "ic:round-apartment",
        requiredRoles: ["admin"],
      },
      {
        title: "networks",
        path: "/networks",
        icon: "ic:round-network-check",
        requiredRoles: ["admin"],
      },
      {
        title: "devices",
        path: "/devices",
        icon: "ic:round-devices",
        requiredRoles: ["admin"],
      },
      {
        title: "utility types",
        path: "/utility-types",
        icon: "ic:round-devices-other",
        requiredRoles: ["admin"],
      },
    ],
    requiredRoles: ["admin"],
  },
  {
    category: "User",
    items: [
      {
        title: "contacts",
        path: "/contacts",
        icon: "ic:round-contacts",
        requiredRoles: ["admin"],
      },
      {
        title: "sessions",
        path: "/sessions",
        icon: "arcticons:session",
        requiredRoles: ["admin"],
      },
    ],
    requiredRoles: ["admin"],
  },
  {
    category: "Authentication",
    items: [
      {
        title: "logout",
        path: "/login",
        icon: "ic:round-logout",
        requiredRoles: ["admin"],
      },
    ],
    requiredRoles: ["admin"],
  },
];

export default navConfig;
