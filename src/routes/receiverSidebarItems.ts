
// import Analytics from "@/pages/Admin/Analytics";

import type { ISidebarItem } from '@/interfaces/global.interface';
import MyParcel from '@/pages/sender/MyParcel';





export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'My Parcel',
        url: '/receiver/my-parcel',
        component: MyParcel,
      },
    ],
  },
  
];
