import { title } from "process";
import SvgColor from "../../components/svg-color";
import path from "path";
import { icon } from "leaflet";

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "dashboard",
    path: "/",
    icon: "ic:round-dashboard",
  },
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
    title: "device types",
    path: "/device-types",
    icon: "ic:round-devices-other",
  },
  {
    title: "bill types",
    path: "/bill-types",
    icon: "ic:round-receipt",
  },
  // {
  //   title: "login",
  //   path: "/login",
  //   icon: "ic:round-login",
  // },
];

export default navConfig;
