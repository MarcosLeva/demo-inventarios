
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Package, Upload, Users, ShoppingCart, Link2, Building, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function Sidebar({ isMobile = false }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }

  const navLinksConfig = [
    { href: '/', label: 'Tiendas', icon: Home, roles: ['Admin', 'Editor', 'Vendedor'], disabled: false },
    { href: '/products', label: 'Productos', icon: Package, roles: ['Admin', 'Editor', 'Vendedor'], disabled: false },
    { href: '/users', label: 'Usuarios', icon: Users, roles: ['Admin', 'Editor'], disabled: false },
    { href: '/organizations', label: user.role === 'Admin' ? 'Organizaciones' : 'Organización', icon: Building, roles: ['Admin', 'Editor'], disabled: false },
    { href: '/import', label: 'Importar', icon: Upload, roles: ['Admin', 'Editor', 'Vendedor'], disabled: false },
    { href: '/connections', label: 'Conexiones', icon: Link2, roles: ['Admin', 'Editor', 'Vendedor'], disabled: true },
  ];

  const navLinks = navLinksConfig.filter(link => link.roles.includes(user.role));

  const renderLink = (link: typeof navLinks[0]) => {
    let href = link.href;
    if (link.href === '/organizations' && user?.role === 'Editor' && user.organizationId) {
        href = `/organizations/${user.organizationId}`;
    }

    const isActive = !link.disabled && (link.href === '/' ? pathname === '/' : pathname.startsWith(href));
    
    const linkContent = (
       <>
        <link.icon className="h-5 w-5" />
        {link.label}
       </>
    );
    
    const linkClasses = cn(
        "flex items-center gap-4 rounded-lg px-4 py-3 text-foreground/70 transition-all",
        !link.disabled && "hover:text-foreground hover:bg-muted",
        isActive && "bg-secondary text-foreground font-semibold",
        link.disabled && "cursor-not-allowed opacity-50"
    );

    if(link.disabled) {
        return <span key={link.href} className={linkClasses}>{linkContent}</span>
    }

    return (
      <Link
        key={link.href}
        href={href}
        className={linkClasses}
      >
        {linkContent}
      </Link>
    );
  };
  
  return (
    <div className={cn("hidden border-r bg-card md:block", isMobile && "block")}>
      <div className="flex h-full flex-col">
        <div className="flex h-14 shrink-0 items-center border-b bg-card px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <span className="">Visor de Inventarios</span>
            </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start p-2 text-base font-medium sm:p-4">
            {navLinks.map(renderLink)}
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
            <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">{user.name}</span>
                        <span className="text-xs text-muted-foreground leading-none">{user.role}</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Cerrar sesión</span>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
