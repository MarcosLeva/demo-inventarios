
'use client';

import { useState, useMemo } from 'react';
import { getShopById } from '@/lib/data';
import type { Product } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Tag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ShopPage({ params }: { params: { id: string } }) {
  const shop = getShopById(params.id);
  const [searchTerm, setSearchTerm] = useState('');

  if (!shop) {
    notFound();
  }

  const filteredInventory = useMemo(() => {
    if (!searchTerm) {
      return shop.inventory;
    }
    return shop.inventory.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [shop.inventory, searchTerm]);

  const Icon = shop.icon;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver a todas las tiendas
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 p-6 bg-card rounded-lg border shadow-sm">
        <div className="relative h-32 w-32 rounded-full overflow-hidden shrink-0 border-4 border-background ring-4 ring-primary/20 shadow-md">
            <Image
              src={shop.logoSrc}
              alt={`${shop.name} logo`}
              fill
              className="object-cover"
              data-ai-hint={shop.logoHint}
              sizes="128px"
            />
        </div>
        <div>
            <div className="flex items-center gap-3 mb-2">
                 <div className="bg-accent/10 text-accent p-3 rounded-lg">
                    <Icon className="h-8 w-8" />
                 </div>
                 <h1 className="text-4xl font-bold tracking-tight font-headline text-foreground sm:text-5xl">
                    {shop.name}
                 </h1>
            </div>
          <p className="text-lg text-muted-foreground ml-1">{shop.specialization}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold font-headline">Inventario</h2>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar en el inventario..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Imagen</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Precio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length > 0 ? (
                filteredInventory.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No se encontraron productos que coincidan con tu búsqueda.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
      </Card>
    </div>
  );
}

function ProductRow({ product }: { product: Product }) {
  const formatPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price);

  return (
    <TableRow>
      <TableCell>
        <div className="relative h-16 w-16 rounded-md overflow-hidden">
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.imageHint}
            sizes="64px"
          />
        </div>
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell className="text-muted-foreground">{product.description}</TableCell>
      <TableCell className="text-right font-semibold text-primary">
          <div className='flex items-center justify-end gap-1.5'>
             <Tag className="h-4 w-4 text-primary/80" />
             {formatPrice}
          </div>
      </TableCell>
    </TableRow>
  );
}
