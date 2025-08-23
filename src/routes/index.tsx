import CommonLayout from '@/components/layout/CommonLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { role } from '@/constants/role';
import type { TRole } from '@/interfaces/global.interface';
import Home from '@/pages/Home/Home';
import { Login } from '@/pages/public/logIn';

import { SignUp } from '@/pages/public/signUp';
import Verify from '@/pages/public/verify';
import { generateRoutes } from '@/utils/generateRoutes';
import { withAuth } from '@/utils/withAuth';
import { createBrowserRouter, Navigate } from 'react-router';
import { adminSidebarItems } from './adminSidebarItems';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: CommonLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
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
  {
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    path: '/admin',
    children: [
      {
        index: true,
        element: <Navigate to="/admin/analytics" />
      },
      ...generateRoutes(adminSidebarItems),
    ],
  },
]);
