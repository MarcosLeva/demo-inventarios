
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Upload, Users, ShoppingCart, Link2, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

export default function Sidebar({ isMobile = false }) {
  const pathname = usePathname();
  const { user } = useAuth();
  
  if (!user) {
    return null;
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
  
  const header = (
     <div className="flex h-14 shrink-0 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="">Visor de Inventarios</span>
        </Link>
    </div>
  );

  const content = (
    <div className="flex-1 overflow-y-auto">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
        {navLinks.map(renderLink)}
      </nav>
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
    <div className="hidden border-r bg-card md:block h-full">
        <div className="flex h-full flex-col">
            {header}
            {content}
        </div>
    </div>
  );
}
