import { title } from "process";
import SvgColor from "../../components/svg-color";
import path from "path";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/",
    icon: icon("ic_analytics"),
  },
  {
    title: "power",
    path: "/power",
    icon: icon("ic_power"),
  },
  {
    title: "water",
    path: "/water",
    icon: icon("ic_water"),
  },
  {
    title: "apartments",
    path: "/apartments",
    icon: icon("ic_apartment"),
  },
  {
    title: "devices",
    path: "/devices",
    icon: icon("ic_device"),
  },
  {
    title: "login",
    path: "/login",
    icon: icon("ic_lock"),
  },
];

export default navConfig;
