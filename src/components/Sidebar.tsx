
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Upload, Link2, Users, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';

const navLinksConfig = [
  { href: '/', label: 'Tiendas', icon: Home, roles: ['Admin', 'Vendedor'] },
  { href: '/products', label: 'Productos', icon: Package, roles: ['Admin', 'Vendedor'] },
  { href: '/import', label: 'Importar', icon: Upload, roles: ['Admin', 'Vendedor'] },
  { href: '/connections', label: 'Conexión', icon: Link2, disabled: true, roles: ['Admin'] },
  { href: '/users', label: 'Usuarios', icon: Users, roles: ['Admin'] },
];

export default function Sidebar({ isMobile = false }) {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const navLinks = navLinksConfig.filter(link => {
    if (!user) return false;
    if (user.role === 'Vendedor') {
        return ['/', '/import', '/products'].includes(link.href);
    }
    return link.roles.includes(user.role);
  });

  const renderLink = (link: typeof navLinks[0]) => {
    const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
    return (
      <Link
        key={link.href}
        href={link.disabled ? '#' : link.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          isActive && "bg-muted text-primary",
          link.disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <link.icon className="h-4 w-4" />
        {link.label}
        {link.href === '/connections' && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">3</Badge>}
      </Link>
    );
  };
  
  if (isMobile) {
    return (
      <>
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <span className="">Visor de Inventarios</span>
            </Link>
        </div>
        <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {navLinks.map(renderLink)}
            </nav>
        </div>
      </>
    );
  }

  return (
    <div className="hidden md:block fixed left-0 top-0 h-full w-[220px] lg:w-[280px] border-r bg-card z-40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="">Visor de Inventarios</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map(renderLink)}
          </nav>
        </div>
      </div>
    </div>
  );
}
