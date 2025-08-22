

import CommonLayout from "@/components/layout/CommonLayout";
import { Login } from "@/pages/public/logIn";

import { SignUp } from "@/pages/public/signUp";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([

  {
    Component: CommonLayout,
    path: '/',
    children: [
      {
       index: true,
      }
    ]
    

  },
  {
    Component: Login,
    path: '/login'
  },
  
  {
    Component: SignUp,
    path: '/signup'
  }
  
])

