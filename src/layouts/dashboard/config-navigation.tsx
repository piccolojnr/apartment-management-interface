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
        reuiredRoles: ["tenant"],
      },
      {
        title: "water",
        path: "/water",
        icon: "ic:round-water",
        requiredRoles: ["tenant"],
      },
    ],
    requiredRoles: ["tenant"],
  },
  {
    category: "Management",
    items: [
      {
        title: "apartments",
        path: "/apartments",
        icon: "ic:round-apartment",
        requiredRoles: ["admin", "administrator"],
      },
      {
        title: "networks",
        path: "/networks",
        icon: "ic:round-network-check",
        requiredRoles: ["admin", "administrator"],
      },
      {
        title: "devices",
        path: "/devices",
        icon: "ic:round-devices",
        requiredRoles: ["admin", "administrator"],
      },
      {
        title: "utility types",
        path: "/utility-types",
        icon: "ic:round-devices-other",
        requiredRoles: ["admin", "administrator"],
      },
    ],
    requiredRoles: ["admin", "administrator"],
  },
  {
    category: "User",
    items: [
      {
        title: "users",
        path: "/users",
        icon: "ic:round-supervised-user-circle",
        requiredRoles: ["admin", "administrator"],
      },
      {
        title: "roles",
        path: "/roles",
        icon: "ic:round-supervised-user-circle",
        requiredRoles: ["admin", "administrator"],
      },
      {
        title: "contacts",
        path: "/contacts",
        icon: "ic:round-contacts",
        requiredRoles: ["admin", "administrator"],
      },
      {
        title: "sessions",
        path: "/sessions",
        icon: "arcticons:session",
        requiredRoles: ["admin", "administrator"],
      },
    ],
    requiredRoles: ["admin", "administrator"],
  },
  {
    category: "Authentication",
    items: [
      {
        title: "logout",
        path: "/login",
        icon: "ic:round-logout",
        requiredRoles: ["tenant"],
      },
    ],
    requiredRoles: ["tenant"],
  },
];

export default navConfig;
