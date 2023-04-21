// Argon Dashboard 2 MUI layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import Users from "layouts/user";
import Trips from "layouts/trip";
import Employees from "layouts/employee";
import Cars from "layouts/car";
import Orders from "layouts/order";

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Dashboard />,
    roles: ['ADMIN', 'EMPLOYEE']
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
    roles: ['ADMIN', 'EMPLOYEE']
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
    roles: ['ADMIN']
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
    roles: ['ADMIN']
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
    roles: ['ADMIN']
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
    roles: ['ADMIN', 'EMPLOYEE']
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
