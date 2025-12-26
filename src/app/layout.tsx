import type { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'TiendaLocal',
  description: 'Encuentra y explora tiendas locales y su inventario.',
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
      <body className={cn('font-body antialiased bg-background text-foreground min-h-screen flex flex-col')}>
        <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-primary transition-opacity hover:opacity-80">
                <ShoppingCart className="h-7 w-7" />
                <span>TiendaLocal</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-card/50 border-t border-border mt-auto py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} TiendaLocal. Todos los derechos reservados.</p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
