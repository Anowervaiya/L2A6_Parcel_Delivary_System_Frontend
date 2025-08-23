import { role } from "@/constants/role";
import type { TRole } from "@/interfaces/global.interface";
import { adminSidebarItems } from "@/routes/adminSidebarItems";


export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];
  
    case role.SENDER:
      // return [...userSidebarItems];
    case role.RECEIVER:
      // return [...userSidebarItems];
    default:
      return [];
  }
};
