
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PanelLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import AuthHeader from '@/components/AuthHeader';


function AppLayout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
}
