import { role } from '@/constants/role';
import type { TRole } from '@/interfaces/global.interface';
import { adminSidebarItems } from '@/routes/adminSidebarItems';
import { receiverSidebarItems } from '@/routes/receiverSidebarItems';
import { senderSidebarItems } from '@/routes/senderSidebarItems';

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];
    case role.SENDER:
      return [...senderSidebarItems];
    case role.RECEIVER:
      return [...receiverSidebarItems];
    default:
      return [];
  }
};
