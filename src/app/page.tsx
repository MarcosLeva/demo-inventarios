
'use client';

import { useState, useMemo, useRef } from 'react';
import { getShops, icons } from '@/lib/data';
import type { Shop, IconMap } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Search, ChevronLeft, ChevronRight, PlusCircle, Image as ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from '@/components/ui/label';
import type { LucideIcon } from 'lucide-react';


const SHOPS_PER_PAGE = 8;

export default function Home() {
  const [initialShops, setInitialShops] = useState(getShops());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'activo' | 'inactivo'>('all');
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleShopAdd = (newShopData: Omit<Shop, 'id' | 'inventory'>) => {
    const newShop: Shop = {
      ...newShopData,
      id: `shop-${Date.now()}`,
      inventory: [],
    };
    setInitialShops(prevShops => [newShop, ...prevShops]);
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-foreground sm:text-5xl lg:text-6xl">
          Explora el Inventario de las Tiendas
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Navega a través de una lista curada de tiendas y explora sus inventarios únicos.
        </p>
      </div>

       <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start">
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
        <AddShopModal onShopAdd={handleShopAdd}>
             <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Tienda
            </Button>
        </AddShopModal>
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


function ImageUploader({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="upload">Subir</TabsTrigger>
            </TabsList>
            <TabsContent value="url">
                <div className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <Input id="shop-image-url" value={value.startsWith('data:') ? '' : value} onChange={(e) => onChange(e.target.value)} placeholder="https://ejemplo.com/logo.png" />
                </div>
            </TabsContent>
            <TabsContent value="upload">
                <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
                <Button variant="outline" className="w-full" onClick={handleButtonClick}>
                    <Upload className="mr-2 h-4 w-4" />
                    Seleccionar Archivo
                </Button>
            </TabsContent>
        </Tabs>
    );
}

function AddShopModal({ onShopAdd, children }: { onShopAdd: (shop: Omit<Shop, 'id' | 'inventory'>) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [logoSrc, setLogoSrc] = useState('https://picsum.photos/seed/newshop/400/400');
    const [iconName, setIconName] = useState<keyof IconMap>('Shirt');
    const [status, setStatus] = useState<'activo' | 'inactivo'>('activo');

    const handleSave = () => {
        if (!name || !specialization || !iconName) {
            alert('Por favor completa todos los campos.');
            return;
        }

        const selectedIcon = icons[iconName] as LucideIcon;

        if (!selectedIcon) {
            alert('Icono no válido seleccionado.');
            return;
        }

        onShopAdd({
            name,
            specialization,
            logoSrc,
            logoHint: `${name} ${specialization}`,
            icon: selectedIcon,
            status,
        });
        setIsOpen(false);
        // Reset form
        setName('');
        setSpecialization('');
        setLogoSrc('https://picsum.photos/seed/newshop/400/400');
        setIconName('Shirt');
        setStatus('activo');
    };

    const IconPreview = icons[iconName] || null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Nueva Tienda</DialogTitle>
                    <DialogDescription>Completa los detalles para crear una nueva tienda.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shop-name" className="text-right">Nombre</Label>
                        <Input id="shop-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shop-specialization" className="text-right">Especialización</Label>
                        <Input id="shop-specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shop-icon" className="text-right">Icono</Label>
                        <div className="col-span-3 flex items-center gap-2">
                             <Select value={iconName} onValueChange={(value: keyof IconMap) => setIconName(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un icono" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(icons).map(key => {
                                        const Icon = icons[key as keyof IconMap];
                                        return (
                                            <SelectItem key={key} value={key}>
                                               <div className="flex items-center gap-2">
                                                 <Icon className="h-4 w-4" />
                                                 <span>{key}</span>
                                               </div>
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                            {IconPreview && (
                                <div className="bg-accent/10 text-accent p-2 rounded-md">
                                    <IconPreview className="h-6 w-6" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shop-status" className="text-right">Estatus</Label>
                        <Select value={status} onValueChange={(value: 'activo' | 'inactivo') => setStatus(value)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Selecciona un estatus" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="activo">Activo</SelectItem>
                                <SelectItem value="inactivo">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4 pt-2">
                        <Label className="text-right pt-2">Logo</Label>
                        <div className="col-span-3">
                            <ImageUploader value={logoSrc} onChange={setLogoSrc} />
                        </div>
                    </div>
                    {logoSrc && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Previsualización</Label>
                            <div className="col-span-3">
                                <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                                    <Image src={logoSrc} alt="Previsualización del logo" fill className="object-cover" sizes="96px" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleSave}>Guardar Tienda</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


