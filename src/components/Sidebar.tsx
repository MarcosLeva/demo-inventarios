
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Upload, Users, ShoppingCart, Building, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

const navLinksConfig = [
  { href: '/', label: 'Tiendas', icon: Home, roles: ['Admin', 'Editor', 'Vendedor'], disabled: false },
  { href: '/products', label: 'Productos', icon: Package, roles: ['Admin', 'Editor', 'Vendedor'], disabled: false },
  { href: '/organizations', label: 'Organizaciones', icon: Building, roles: ['Admin'], disabled: false },
  { href: '/users', label: 'Usuarios', icon: Users, roles: ['Admin', 'Editor'], disabled: false },
  { href: '/import', label: 'Importar', icon: Upload, roles: ['Admin', 'Editor', 'Vendedor'], disabled: false },
  { href: '/connections', label: 'Conexiones', icon: Link2, roles: ['Admin', 'Editor', 'Vendedor'], disabled: true },
];

export default function Sidebar({ isMobile = false }) {
  const pathname = usePathname();
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }

  const navLinks = navLinksConfig.filter(link => link.roles.includes(user.role));

  const renderLink = (link: typeof navLinks[0]) => {
    const isActive = !link.disabled && (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href));
    
    const linkContent = (
       <>
        <link.icon className="h-4 w-4" />
        {link.label}
       </>
    );
    
    const linkClasses = cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
        !link.disabled && "hover:text-primary",
        isActive && "bg-muted text-primary",
        link.disabled && "cursor-not-allowed opacity-50"
    );

    if(link.disabled) {
        return <span className={linkClasses}>{linkContent}</span>
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        className={linkClasses}
      >
        {linkContent}
      </Link>
    );
  };
  
  const content = (
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navLinks.map(renderLink)}
        </nav>
      </div>
  );
  
  const header = (
     <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="">Visor de Inventarios</span>
        </Link>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {header}
        {content}
      </>
    );
  }

  return (
    <div className="hidden border-r bg-card md:fixed md:inset-y-0 md:flex md:w-[220px] md:flex-col lg:w-[280px]">
        <div className="flex h-full max-h-screen flex-col gap-2">
            {header}
            {content}
        </div>
    </div>
  );
}
