import { title } from "process";
import SvgColor from "../../components/svg-color";
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
      },
    ],
  },
  {
    category: "Utilities",
    items: [
      {
        title: "power",
        path: "/power",
        icon: "ic:round-electric-bolt",
      },
      {
        title: "water",
        path: "/water",
        icon: "ic:round-water",
      },
    ],
  },
  {
    category: "Management",
    items: [
      {
        title: "apartments",
        path: "/apartments",
        icon: "ic:round-apartment",
      },
      {
        title: "networks",
        path: "/networks",
        icon: "ic:round-network-check",
      },
      {
        title: "devices",
        path: "/devices",
        icon: "ic:round-devices",
      },
      {
        title: "utility types",
        path: "/utility-types",
        icon: "ic:round-devices-other",
      },
    ],
  },
  {
    category: "User",
    items: [
      {
        title: "contacts",
        path: "/contacts",
        icon: "ic:round-contacts",
      },
      {
        title: "sessions",
        path: "/sessions",
        icon: "arcticons:session",
      },
    ],
  },
  {
    category: "Authentication",
    items: [
      {
        title: "login",
        path: "/login",
        icon: "ic:round-login",
      },
    ],
  },
];

export default navConfig;
