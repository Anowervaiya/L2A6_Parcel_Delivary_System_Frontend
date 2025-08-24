
// import Analytics from "@/pages/Admin/Analytics";

import type { ISidebarItem } from '@/interfaces/global.interface';
import AllParcel from '@/pages/admin/AllParcel';
import AllUser from '@/pages/admin/AllUser';
import Analytics from '@/pages/admin/Analytics';
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
        title: 'All Parcel',
        url: '/admin/all-parcel',
        component: AllParcel,
      },
      {
        title: 'All User',
        url: '/admin/all-user',
        component: AllUser,
      },
    ],
  },
];
