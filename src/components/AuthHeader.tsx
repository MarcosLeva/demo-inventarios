'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

export default function AuthHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 rounded-full pl-2 pr-4">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block font-medium text-sm">{user.name}</span>
                </div>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
