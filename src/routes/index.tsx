
import CommonLayout from "@/components/layout/CommonLayout";
import { LoginForm } from "@/pages/public/loginForm";
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
    Component: LoginForm,
    path: '/login'
  },
  
  {
    Component: SignUp,
    path: '/signup'
  }
  
])

