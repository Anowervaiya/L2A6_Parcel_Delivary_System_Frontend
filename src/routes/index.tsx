

import CommonLayout from "@/components/layout/CommonLayout";
import Home from "@/pages/Home/Home";
import { Login } from "@/pages/public/logIn";

import { SignUp } from "@/pages/public/signUp";
import Verify from "@/pages/public/verify";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: CommonLayout,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
  {
    path: '/login',
    Component: Login,
  },

  {
    path: '/signup',
    Component: SignUp,
  },
  {
    path: '/verify',
    Component: Verify,
  },
]);

