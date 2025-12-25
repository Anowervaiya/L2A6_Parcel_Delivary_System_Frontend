
// import Analytics from "@/pages/Admin/Analytics";

import SenderDashboard from '@/components/dashboards/sender-dashboard';
import type { ISidebarItem } from '@/interfaces/global.interface';



export const senderSidebarItems: ISidebarItem[] = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'Analytics',
        url: '/sender/analytics',
        component: SenderDashboard,
      },
       
           
    ],
  }
 
];
