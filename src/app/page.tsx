

'use client';

import { useState, useMemo, useEffect } from 'react';
import { getShops, getUsers, addShopAndAssignUsers, getOrganizations, getAllProducts } from '@/lib/data';
import type { Shop, AppUser, Organization, Product } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Search, ChevronLeft, ChevronRight, PlusCircle, Users, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { icons } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { AddShopModal } from '@/components/AddShopModal';


const SHOPS_PER_PAGE = 8;

export default function Home() {
  const [initialShops, setInitialShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'activo' | 'inactivo'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);

  const fetchData = () => {
      setInitialShops(getShops(user));
      setAllUsers(getUsers(user));
      setProducts(getAllProducts(user));
      if (user?.role === 'Admin') {
        setAllOrganizations(getOrganizations(user));
      } else if (user?.role === 'Editor') {
        setAllOrganizations(getOrganizations(user));
      }
      setLoading(false);
  }

  useEffect(() => {
    if (user) {
        setTimeout(() => {
          fetchData();
        }, 500); 
    }
  }, [user]);


  const specializations = useMemo(() => {
    const allSpecs = initialShops.map((shop) => shop.specialization);
    return ['all', ...Array.from(new Set(allSpecs))];
  }, [initialShops]);

  const filteredShops = useMemo(() => {
    setCurrentPage(1); // Reset page when filters change
    return initialShops.filter((shop) => {
      const matchesSearchTerm = shop.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization =
        selectedSpecialization === 'all' || shop.specialization === selectedSpecialization;
      const matchesStatus = statusFilter === 'all' || shop.status === statusFilter;
      return matchesSearchTerm && matchesSpecialization && matchesStatus;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [initialShops, searchTerm, selectedSpecialization, statusFilter]);

  const totalPages = Math.ceil(filteredShops.length / SHOPS_PER_PAGE);
  const paginatedShops = useMemo(() => {
    const startIndex = (currentPage - 1) * SHOPS_PER_PAGE;
    const endIndex = startIndex + SHOPS_PER_PAGE;
    return filteredShops.slice(startIndex, endIndex);
  }, [filteredShops, currentPage]);

  const handleShopAdd = (newShopData: Omit<Shop, 'id'>, assignedUserIds: string[]) => {
    if (!user) return;
    addShopAndAssignUsers(newShopData as Omit<Shop, 'id'|'organizationId'> & { organizationId: string }, assignedUserIds, user); 
    fetchData();
  };

  const canAddShop = user?.role === 'Admin' || user?.role === 'Editor';

  const getMemberCountForShop = (shopId: string) => {
    return allUsers.filter(u => u.shopIds.includes(shopId)).length;
  }
  
  const getProductCountForShop = (shopId: string) => {
      return products.filter(p => p.locations.some(loc => loc.shopId === shopId)).length;
  }


  return (
    <>
      <div className="flex items-center justify-between">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Tiendas</h1>
          <p className="text-muted-foreground">
            Explora y gestiona el inventario de las tiendas.
          </p>
        </header>
        {canAddShop && (
          <AddShopModal onShopAdd={handleShopAdd} allUsers={allUsers} allOrganizations={allOrganizations} currentUser={user}>
               <Button className="hidden sm:flex">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Agregar Tienda
              </Button>
          </AddShopModal>
        )}
      </div>
       <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="relative flex-1 w-full">
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
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por estatus" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Todos los estatus</SelectItem>
                <SelectItem value="activo">Activas</SelectItem>
                <SelectItem value="inactivo">Inactivas</SelectItem>
            </SelectContent>
        </Select>
         {canAddShop && (
            <AddShopModal onShopAdd={handleShopAdd} allUsers={allUsers} allOrganizations={allOrganizations} currentUser={user}>
               <Button className="w-full sm:hidden">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Agregar Tienda
              </Button>
            </AddShopModal>
          )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: SHOPS_PER_PAGE }).map((_, index) => <ShopCardSkeleton key={index} />)
        ) : paginatedShops.map((shop, index) => (
            <ShopCard 
                key={shop.id} 
                shop={shop} 
                index={index} 
                memberCount={getMemberCountForShop(shop.id)}
                productCount={getProductCountForShop(shop.id)}
            />
        ))}
      </div>

      {!loading && filteredShops.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm col-span-full py-10">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                No se encontraron tiendas
              </h3>
              <p className="text-sm text-muted-foreground">
                Intenta ajustar tu búsqueda o filtros.
              </p>
            </div>
          </div>
      )}

      {totalPages > 1 && !loading && (
        <div className="flex items-center justify-center gap-4 mt-4">
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
    </>
  );
}

function ShopCardSkeleton() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[160px] w-full rounded-lg" />
            <div className="space-y-2 p-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    );
}


function ShopCard({ shop, index, memberCount, productCount }: { shop: Shop, index: number, memberCount: number, productCount: number }) {
  const Icon = icons[shop.icon];
  return (
    <Link href={`/shop/${shop.id}`} className="group block">
      <Card 
        className={cn(
            "h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 animate-in fade-in-0 flex flex-col",
        )}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <CardHeader className="p-0 relative">
          <div className="relative h-40 w-full">
            <Image
              src={shop.logoSrc}
              alt={`${shop.name} logo`}
              fill
              className="object-cover"
              data-ai-hint={shop.logoHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
             <Badge variant={shop.status === 'activo' ? 'secondary' : 'destructive'} className="absolute top-2 right-2 capitalize">
                {shop.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col flex-grow">
          <div className="flex items-start gap-4">
             <div className="bg-accent/10 text-accent p-3 rounded-lg">
                {Icon && <Icon className="h-6 w-6" />}
             </div>
             <div className="flex-1">
                <h2 className="text-xl font-bold font-headline mb-1">{shop.name}</h2>
                <p className="text-sm text-muted-foreground">{shop.specialization}</p>
             </div>
          </div>
          <div className="mt-4 flex-grow space-y-2 text-sm text-muted-foreground">
             <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>{productCount} producto(s)</span>
             </div>
             <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{memberCount} miembro(s)</span>
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
