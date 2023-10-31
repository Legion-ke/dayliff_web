// import { Box, Chip } from "@mui/material";

export const getMenuItems = () => {
  return [
    {
      items: [
        {
          href: `/`,
          icon: <i className="bx bx-grid-alt" />,
          title: "Dashboard",
        },
      ],
    },
    {
      title: "Tasks",
      items: [
        {
          href: `/tasks/orders/`,
          icon: <i className="bx bx-book" />,
          title: "Orders",
          exact: true,
        },
        {
          href: `/tasks/routes/`,
          icon: <i className="bx bx-book" />,
          title: "Routes",
          exact: true,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          href: `/management/`,
          icon: <i className="bx bx-book" />,
          title: "Users",
          exact: true,
        },

        {
          href: `/management/vehicles`,
          icon: <i className="bx bx-book" />,
          title: "Vehicles",
          exact: true,
        },
      ],
    },
    {
      title: "Session",
      items: [
        {
          href: ``,
          icon: <i className="bx bx-log-out" />,
          title: "Logout",
        },
      ],
    },
  ];
};
