import {

  CircleUser,
  LayoutDashboard,
  LogOutIcon,

} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';

import { Link } from 'react-router';
import { useAppDispatch } from '@/redux/hooks';
import { authApi, useLogoutMutation } from '@/redux/features/auth/auth.api';

export default function UserMenu({ data,  navigationLinks }: any) {
    const dispatch = useAppDispatch();

    const [logout] = useLogoutMutation();

  const handleLogout = async () => {
     
      await logout(undefined);
      dispatch(authApi.util.resetApiState());
    };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarFallback>
              {data?.picture ? (
                <img src={data?.picture} alt="img" />
              ) : (
                <CircleUser />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {data?.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {data?.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuItem>
          {navigationLinks?.map((link: any, index: any) => (
            <React.Fragment key={index}>
              {link.role === data?.role && (
                <>
                  <LayoutDashboard
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  <Link to={link.href}>{link.label}</Link>
                </>
              )}
            </React.Fragment>
          ))}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <button onClick={ handleLogout}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
