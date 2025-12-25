import {

  CircleUser,
  
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

import { useAppDispatch } from '@/redux/hooks';
import { baseApi } from '@/redux/baseApi';

export default function UserMenu({ data }: any) {
    const dispatch = useAppDispatch();


const handleLogout = async () => {
    try {
      // 1. Clear all RTK Query cache
      dispatch(baseApi.util.resetApiState());

      // 2. Server-side logout (delete cookies)
      // await logoutUser();

      // 3. Use replace instead of href (cleaner history)
      window.location.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
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

        <DropdownMenuItem onClick={ handleLogout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <button >Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
