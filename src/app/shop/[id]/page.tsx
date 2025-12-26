
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
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function ShopPage({ params }: { params: { id: string } }) {
  const shop = getShopById(params.id);
  const [searchTerm, setSearchTerm] = useState('');
  
  const maxPrice = useMemo(() => {
    if (!shop || shop.inventory.length === 0) {
      return 100;
    }
    return Math.max(...shop.inventory.map((p) => p.price));
  }, [shop]);

  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  if (!shop) {
    notFound();
  }
  
  useMemo(() => {
      setPriceRange([0, maxPrice]);
  }, [maxPrice]);


  const filteredInventory = useMemo(() => {
    return shop.inventory.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesPrice;
    });
  }, [shop.inventory, searchTerm, priceRange]);

  const Icon = shop.icon;

  const formatPrice = (price: number) => new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

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
      
      <div className="mb-8 p-6 bg-card rounded-lg border">
        <h3 className="text-xl font-bold mb-6">Filtrar Inventario</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <Label htmlFor="search-product">Nombre del producto</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="search-product"
                    type="text"
                    placeholder="Buscar en el inventario..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Rango de precios</Label>
                    <span className="text-sm text-muted-foreground font-medium">
                        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                </div>
                 <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={maxPrice}
                    step={1}
                />
            </div>
        </div>
      </div>


      <h2 className="text-3xl font-bold font-headline mb-8">Inventario ({filteredInventory.length})</h2>
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
