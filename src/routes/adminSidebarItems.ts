
// import Analytics from "@/pages/Admin/Analytics";

import type { ISidebarItem } from '@/interfaces/global.interface';
import AddParcel from '@/pages/admin/AddParcel';
import { lazy } from 'react';


const Analytics = lazy(() => import('@/pages/admin/Analytics'));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'Analytics',
        url: '/admin/analytics',
        component: Analytics,
      },
    ],
  },
  {
    title: 'Parcel Management',
    items: [
      {
        title: 'Add Parcel',
        url: '/admin/add-parcel',
        component: AddParcel,
      },
    ],
  },
];
