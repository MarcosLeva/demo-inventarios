
import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ShoppingCart, Package, Upload, Link2, Users, PanelLeft, Building } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthProvider } from '@/providers/auth-provider';
import AuthHeader from '@/components/AuthHeader';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '@/components/Sidebar';
import LayoutClient from '@/components/LayoutClient';

// This can't be in a client component, so we export it from the root layout file.
// The actual layout logic is in a client component below.
export const metadata: Metadata = {
  title: 'Visor de Inventarios',
  description: 'Un sistema para visualizar el inventario de las tiendas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased bg-background text-foreground min-h-screen')}>
        <AuthProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
