import { role } from '@/constants/role';
import type { TRole } from '@/interfaces/global.interface';
import { senderSidebarItems } from '@/routes/senderSidebarItems';
// import { adminSidebarItems } from '@/routes/senderSidebarItems';

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    // case role.ADMIN:
    //   return [...adminSidebarItems];

    case role.SENDER:
    return [...senderSidebarItems];
    case role.RECEIVER:
    // return [...userSidebarItems];
    default:
      return [];
  }
};
