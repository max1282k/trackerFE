/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Icons from "views/examples/Icons.js";
import UserManagement from "views/examples/UserManagement";
import OrganizationManagement from "views/examples/OrganizationManagement";
import OrganizationDetail from "components/OrganizationDetail";
import DeviceManagement from "views/DeviceManagement";
import AdminManagement from "views/examples/AdminManagement";
import DeviceDetails from "components/DeviceDetails";
import EquipmentTypes from "views/EquipmentTypes";
import ConfigureDevice from "views/examples/ConfigureDevice";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/admin-mangement",
    name: "Admin Management",
    icon: "ni ni-single-02 text-red",
    component: <AdminManagement />,
    layout: "/admin",
  },
  {
    path: "/organization-mangement",
    name: "Organization Management",
    icon: "ni ni-money-coins text-success",
    component: <OrganizationManagement />,
    layout: "/admin",
  },
  {
    path: "/organization-detail",
    name: "Organization Detail",
    icon: "fas fa-users text-orange",
    component: <OrganizationDetail />,
    layout: "/admin",
  },
  {
    path: "/user-mangement",
    name: "User Management",
    icon: "fas fa-users text-orange",
    component: <UserManagement />,
    layout: "/admin",
  },
  {
    path: "/device-mangement",
    name: "Device Management",
    icon: "ni ni-tablet-button text-primary",
    component: <DeviceManagement />,
    layout: "/admin",
  },
  {
    path: "/device-details",
    name: "Device Details",
    icon: "ni ni-tablet-button text-primary",
    component: <DeviceDetails />,
    layout: "/admin",
  },
  // {
  //   path: "/equipment-types",
  //   name: "Equipment Types",
  //   icon: "fa fa-solid fa-toolbox text-danger",
  //   component: <EquipmentTypes />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/configure-device",
  //   name: "Equipment Types",
  //   icon: "fa fa-solid fa-toolbox text-danger",
  //   component: <ConfigureDevice />,
  //   layout: "/auth",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
