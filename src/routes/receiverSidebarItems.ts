
// import Analytics from "@/pages/Admin/Analytics";

import ReceiverDashboard from '@/components/dashboards/receiver-dashboard';
import type { ISidebarItem } from '@/interfaces/global.interface';






export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'Analytics',
        url: '/receiver/analytics',
        component: ReceiverDashboard,
      },
    ],
  },
  
];
