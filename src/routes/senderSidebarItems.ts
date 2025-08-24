
// import Analytics from "@/pages/Admin/Analytics";

import type { ISidebarItem } from '@/interfaces/global.interface';
import AddParcel from '@/pages/sender/AddParcel';
import MyParcel from '@/pages/sender/MyParcel';





export const senderSidebarItems: ISidebarItem[] = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'My Parcel',
        url: '/sender/my-parcel',
        component: MyParcel,
      },
    ],
  },
  {
    title: 'Parcel Management',
    items: [
      {
        title: 'Add Parcel',
        url: '/sender/add-parcel',
        component: AddParcel,
      },
    ],
  },
];
