import CommonLayout from "@/components/layout/CommonLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import type { TRole } from "@/interfaces/global.interface";
import Home from "@/pages/Home/Home";
import { Login } from "@/pages/public/logIn";

import { SignUp } from "@/pages/public/signUp";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { senderSidebarItems } from "./senderSidebarItems";
import { adminSidebarItems } from "./adminSidebarItems";
import { receiverSidebarItems } from "./receiverSidebarItems";
import About from "@/pages/about/About";
import Pricing from "@/pages/pricing/pricing";

import ServicesPage from "../pages/services/services";
import TrackingPage from "@/pages/tracking/tracking";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CommonLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/tracking",
        Component: TrackingPage,
      },
      {
        path: "/pricing",
        Component: Pricing,
      },
      {
        path: "/services",
        Component: ServicesPage,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/signup",
    Component: SignUp,
  },

  // {
  //   path: '/verify',
  //   Component: Verify,
  // },
  {
    Component: withAuth(DashboardLayout, role.SENDER as TRole),
    path: "/sender",
    children: [
      {
        index: true,
        element: <Navigate to="/sender/analytics" />,
      },
      ...generateRoutes(senderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.RECEIVER as TRole),
    path: "/receiver",
    children: [
      {
        index: true,
        element: <Navigate to="/receiver/analytics" />,
      },
      ...generateRoutes(receiverSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to="/admin/analytics" />,
      },
      ...generateRoutes(adminSidebarItems),
    ],
  },
]);
