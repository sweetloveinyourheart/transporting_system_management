// Argon Dashboard 2 MUI pages
import Dashboard from "pages/dashboard";
import SignIn from "pages/authentication/sign-in";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import Users from "pages/user";
import Trips from "pages/trip";
import Employees from "pages/employee";
import Cars from "pages/car";
import Orders from "pages/order";

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Dashboard />,
    roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']
  },
  { type: "title", title: "Users", key: "account-pages" },
  {
    type: "route",
    name: "Users",
    key: "users",
    route: "/users",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-02" />
    ),
    component: <Users />,
    roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']
  },
  {
    type: "route",
    name: "Employees",
    key: "employees",
    route: "/employees",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-circle-08" />
    ),
    component: <Employees />,
    roles: ['ROLE_ADMIN']
  },
  { type: "title", title: "Trips", key: "trip-pages" },

  {
    type: "route",
    name: "Trips",
    key: "trips",
    route: "/trips",
    icon: (
      <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-map-big" />
    ),
    component: <Trips />,
    roles: ['ROLE_ADMIN']
  },
  {
    type: "route",
    name: "Cars & Schedules",
    key: "cars",
    route: "/cars",
    icon: (
      <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-ambulance" />
    ),
    component: <Cars />,
    roles: ['ROLE_ADMIN']
  },
  {
    type: "route",
    name: "Order & Ticket",
    key: "order",
    route: "/orders",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-paper-diploma" />
    ),
    component: <Orders />,
    roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']
  },
  {
    type: "sub-route",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
    ),
    component: <SignIn />,
  }
];

export default routes;
