
'use client';

import { useState, useMemo } from 'react';
import { getShops } from '@/lib/data';
import type { Shop } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SHOPS_PER_PAGE = 8;

export default function Home() {
  const shops = getShops();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const specializations = useMemo(() => {
    const allSpecs = shops.map((shop) => shop.specialization);
    return ['all', ...Array.from(new Set(allSpecs))];
  }, [shops]);

  const filteredShops = useMemo(() => {
    setCurrentPage(1); // Reset page when filters change
    return shops.filter((shop) => {
      const matchesSearchTerm = shop.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization =
        selectedSpecialization === 'all' || shop.specialization === selectedSpecialization;
      return matchesSearchTerm && matchesSpecialization;
    });
  }, [shops, searchTerm, selectedSpecialization]);

  const totalPages = Math.ceil(filteredShops.length / SHOPS_PER_PAGE);
  const paginatedShops = useMemo(() => {
    const startIndex = (currentPage - 1) * SHOPS_PER_PAGE;
    const endIndex = startIndex + SHOPS_PER_PAGE;
    return filteredShops.slice(startIndex, endIndex);
  }, [filteredShops, currentPage]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-foreground sm:text-5xl lg:text-6xl">
          Explora el Inventario de las Tiendas
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Navega a través de una lista curada de tiendas y explora sus inventarios únicos.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por nombre de tienda..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue placeholder="Filtrar por especialización" />
          </SelectTrigger>
          <SelectContent>
            {specializations.map((spec) => (
              <SelectItem key={spec} value={spec}>
                {spec === 'all' ? 'Todas las Especialidades' : spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedShops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>

      {filteredShops.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-10">
              No se encontraron tiendas que coincidan con tus criterios.
          </p>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <span className="text-sm font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Página siguiente</span>
          </Button>
        </div>
      )}
    </div>
  );
}

function ShopCard({ shop }: { shop: Shop }) {
  const Icon = shop.icon;
  return (
    <Link href={`/shop/${shop.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-primary/50">
        <CardHeader className="p-0">
          <div className="relative h-40 w-full">
            <Image
              src={shop.logoSrc}
              alt={`${shop.name} logo`}
              fill
              className="object-cover"
              data-ai-hint={shop.logoHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col">
          <div className="flex items-start gap-4">
             <div className="bg-accent/10 text-accent p-3 rounded-lg">
                <Icon className="h-6 w-6" />
             </div>
             <div className="flex-1">
                <h2 className="text-xl font-bold font-headline mb-1">{shop.name}</h2>
                <p className="text-sm text-muted-foreground">{shop.specialization}</p>
             </div>
          </div>
          <div className="flex justify-end items-center mt-6 pt-4 border-t">
            <div className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Ver Inventario <ArrowRight className="h-4 w-4 transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
