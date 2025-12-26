
'use client';

import { useState, useEffect } from 'react';
import { getShops } from '@/lib/data';
import type { Shop } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ImportPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setShops(getShops());
    setLoading(false);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShop || !file) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Por favor, selecciona una tienda y un archivo.',
      });
      return;
    }
    
    // Simulate import process
    toast({
      title: 'Importación en progreso...',
      description: `Importando "${file.name}" a la tienda seleccionada.`,
    });

    setTimeout(() => {
       toast({
        title: '¡Importación Exitosa!',
        description: `El catálogo "${file.name}" se ha importado correctamente.`,
      });
      // Reset form
      setSelectedShop('');
      setFile(null);
      const fileInput = document.getElementById('catalog-file') as HTMLInputElement;
      if(fileInput) fileInput.value = '';
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4">
       <header>
        <h1 className="text-3xl font-bold tracking-tight">Importar Catálogo</h1>
        <p className="text-muted-foreground">
          Sube un archivo de catálogo (CSV, Excel) para añadir o actualizar productos en una tienda.
        </p>
      </header>

      <Card className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Formulario de Importación</CardTitle>
            <CardDescription>
              Selecciona la tienda y el archivo de catálogo para iniciar la importación.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="shop-select">Tienda de Destino</Label>
              <Select value={selectedShop} onValueChange={setSelectedShop} disabled={loading}>
                <SelectTrigger id="shop-select">
                  <SelectValue placeholder="Selecciona una tienda..." />
                </SelectTrigger>
                <SelectContent>
                  {shops.map(shop => (
                    <SelectItem key={shop.id} value={shop.id}>
                      {shop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="catalog-file">Archivo de Catálogo</Label>
              <Input id="catalog-file" type="file" onChange={handleFileChange} accept=".csv,.xlsx,.xls" />
              <p className="text-xs text-muted-foreground pt-1">
                Formatos soportados: .csv, .xlsx, .xls
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!selectedShop || !file}>
              <UploadCloud className="mr-2 h-4 w-4" />
              Importar Catálogo
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
