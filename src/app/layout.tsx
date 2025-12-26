
import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ShoppingCart, Package, Upload, Link2, Users, PanelLeft } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthProvider } from '@/providers/auth-provider';
import AuthHeader from '@/components/AuthHeader';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '@/components/Sidebar';

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
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
              <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 md:hidden"
                    >
                      <PanelLeft className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col p-0">
                    <Sidebar isMobile={true} />
                  </SheetContent>
                </Sheet>

                <div className="w-full flex-1">
                  {/* Se puede agregar un search bar global aquí si se desea */}
                </div>
                <ThemeToggle />
                <AuthHeader />
              </header>

              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background/50 dark:bg-background">
                {children}
              </main>

               <footer className="bg-card/50 border-t border-border mt-auto py-3 px-6 text-center text-muted-foreground text-xs">
                  <p>&copy; {new Date().getFullYear()} Visor de Inventarios. Powered by COCOCO Ventures</p>
                </footer>
            </div>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
