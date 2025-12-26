
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2 } from 'lucide-react';

export default function ConnectionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Conexiones</h1>
        <p className="text-muted-foreground">
          Gestiona las conexiones e integraciones de datos.
        </p>
      </header>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
            <Link2 className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-2xl font-bold tracking-tight">
            Página en Construcción
          </h3>
          <p className="text-sm text-muted-foreground">
            Esta sección para gestionar conexiones estará disponible próximamente.
          </p>
        </div>
      </div>
    </div>
  );
}
