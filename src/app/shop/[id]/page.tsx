
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { getShopById, addProduct as addProductToData, updateProduct as updateProductInData, deleteProduct as deleteProductFromData, updateShop as updateShopInData, icons, getUsers, getOrganizations } from '@/lib/data';
import type { Product, Shop, ProductProperty, AppUser, Organization, IconName } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Tag, Search, Package, PackageCheck, PackageX, PlusCircle, ChevronLeft, ChevronRight, Edit, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductFilters } from '@/components/ProductFilters';
import { ProductActionsCell } from '@/components/ProductActions';
import { AddProductModal } from '@/components/AddProductModal';
import { Input } from '@/components/ui/input';
import { ImageUploader } from '@/components/ImageUploader';


const ITEMS_PER_PAGE = 10;

export default function ShopPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const [shop, setShop] = useState<Shop | undefined>(undefined);
  const [organization, setOrganization] = useState<Organization | undefined>(undefined);
  const [members, setMembers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'activo' | 'inactivo'>('all');
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const maxPrice = useMemo(() => {
    if (!shop || shop.inventory.length === 0) {
      return 100;
    }
    return Math.ceil(Math.max(...shop.inventory.map((p) => p.price)));
  }, [shop]);


  const fetchData = () => {
    if (!user) return;
      const fetchedShop = getShopById(params.id, user);
      if (fetchedShop) {
        setShop(fetchedShop);
        const initialMaxPrice = fetchedShop.inventory.length > 0
          ? Math.ceil(Math.max(...fetchedShop.inventory.map((p) => p.price)))
          : 100;
        setPriceRange([0, initialMaxPrice]);

        // Fetch organization and members
        const allOrgs = getOrganizations(user);
        const org = allOrgs.find(o => o.id === fetchedShop.organizationId);
        setOrganization(org);

        const allUsers = getUsers(user);
        const shopMembers = allUsers.filter(u => u.shopIds.includes(fetchedShop.id));
        setMembers(shopMembers);

      }
      setLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
     fetchData();
    }, 500);
  }, [params.id, user]);
  
  const filteredInventory = useMemo(() => {
    setCurrentPage(1);
    if (!shop) return([]);
    return shop.inventory.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      const matchesStock = !hideOutOfStock || product.stock > 0;
      return matchesSearch && matchesPrice && matchesStatus && matchesStock;
    });
  }, [shop, searchTerm, priceRange, statusFilter, hideOutOfStock]);

  const totalPages = Math.ceil(filteredInventory.length / ITEMS_PER_PAGE);

  const paginatedInventory = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredInventory.slice(startIndex, endIndex);
  }, [filteredInventory, currentPage]);

  if (loading) {
    return <ShopPageSkeleton />;
  }

  if (!shop) {
    notFound();
    return null;
  }
  
  const handleDataUpdate = () => {
    fetchData();
  }
  
  const handleShopUpdate = (updatedShopData: Shop) => {
    updateShopInData(updatedShopData);
    handleDataUpdate();
  }

  const handleProductAdd = (newProduct: Omit<Product, 'id' | 'imageHint'>) => {
    addProductToData(params.id, newProduct);
    handleDataUpdate();
  }

  const handleProductUpdate = (updatedProduct: Product) => {
    updateProductInData(params.id, updatedProduct);
    handleDataUpdate();
  }

  const handleProductDelete = (productId: string) => {
    deleteProductFromData(params.id, productId);
    handleDataUpdate();
  }

  const canEdit = user?.role === 'Admin' || (user?.role === 'Editor' && user.organizationId === shop.organizationId);

  return (
    <div className="flex flex-col gap-8">
      <Button asChild variant="ghost" className="self-start -mb-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver a todas las tiendas
          </Link>
        </Button>
      
      <div className="relative overflow-hidden rounded-lg -mx-4 lg:-mx-6">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
        <div className="relative h-48 w-full">
            <Image
                src={shop.bannerSrc}
                alt={`${shop.name} background`}
                fill
                className="object-cover"
                data-ai-hint={shop.bannerHint}
                priority
            />
        </div>
        <div className="relative flex flex-col md:flex-row items-start md:items-end gap-6 p-6 z-20 justify-between -mt-20">
            <div className="flex items-center gap-6">
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
                <div className="relative pt-16">
                    <Badge variant={shop.status === 'activo' ? 'secondary' : 'destructive'} className="capitalize absolute top-8 left-0">{shop.status}</Badge>
                    <h1 className="text-4xl font-bold tracking-tight font-headline text-foreground sm:text-5xl">
                        {shop.name}
                    </h1>
                     <p className="text-lg text-muted-foreground mt-1">{shop.specialization}</p>
                     {organization ? (
                        <Button variant="link" asChild className="p-0 h-auto font-semibold text-base text-muted-foreground hover:text-primary mt-1">
                            <Link href={`/organizations/${organization.id}`} className="flex items-center gap-1.5">
                                <Building className="h-4 w-4" /> {organization.name}
                            </Link>
                        </Button>
                     ) : null}
                </div>
            </div>
            <div className="flex items-center gap-4">
              {canEdit && (
                <div className="flex items-center">
                    <TooltipProvider>
                      <div className="flex items-center -space-x-2">
                        {members.slice(0, 5).map(member => (
                            <Tooltip key={member.id}>
                                <TooltipTrigger asChild>
                                    <Avatar className="h-9 w-9 border-2 border-background">
                                        <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${member.name}`} alt={member.name} />
                                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{member.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                         {members.length > 5 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                               <Avatar className="h-9 w-9 border-2 border-background">
                                    <AvatarFallback>+{members.length - 5}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{members.length - 5} miembro(s) más</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TooltipProvider>
                     {members.length > 0 && <span className="text-sm text-muted-foreground ml-3">{members.length} miembro(s)</span>}
                </div>
              )}

              {canEdit && (
                <EditShopModal shop={shop} onShopUpdate={handleShopUpdate}>
                    <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Tienda
                    </Button>
                </EditShopModal>
              )}
            </div>
        </div>
      </div>
      
       <main className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold font-headline">Inventario ({filteredInventory.length})</h2>
            {canEdit && (
              <AddProductModal onProductAdd={handleProductAdd}>
                  <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Agregar Producto
                  </Button>
              </AddProductModal>
            )}
          </div>
          
           <ProductFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                hideOutOfStock={hideOutOfStock}
                setHideOutOfStock={setHideOutOfStock}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                maxPrice={maxPrice}
            />

          <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Imagen</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Descripción Corta</TableHead>
                    <TableHead className="text-center">Estatus</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInventory.length > 0 ? (
                    paginatedInventory.map((product, index) => (
                      <ProductRow 
                        key={product.id} 
                        product={product}
                        canEdit={!!canEdit}
                        onProductUpdate={handleProductUpdate}
                        onProductDelete={handleProductDelete}
                        index={index}
                      />
                    ))
                  ) : (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                            No se encontraron productos que coincidan con tus criterios.
                        </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
          </Card>

           {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
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
        </main>
    </div>
  );
}


function ShopPageSkeleton() {
    return (
        <div className="flex flex-col gap-8 animate-pulse">
             <Skeleton className="h-8 w-48" />

            <div className="relative overflow-hidden rounded-lg">
                 <div className="relative flex flex-col md:flex-row items-start md:items-end gap-6 p-6 justify-between">
                    <div className="flex items-center gap-6">
                        <Skeleton className="h-32 w-32 rounded-full shrink-0" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-12 w-64" />
                            <Skeleton className="h-6 w-48" />
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                 </div>
            </div>
            
            <div className="space-y-6">
                 <div className="mb-4">
                    <Skeleton className="h-10 w-48" />
                </div>
                 <Skeleton className="h-12 w-full" />
                <Skeleton className="h-[600px] w-full" />
            </div>
        </div>
    )
}

function ProductRow({ product, canEdit, onProductUpdate, onProductDelete, index }: { product: Product, canEdit: boolean, onProductUpdate: (product: Product) => void, onProductDelete: (productId: string) => void, index: number }) {
  const formatPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price);
  
  const isOutOfStock = product.stock === 0;
  const description = product.properties.find(p => p.key.toLowerCase() === 'descripción')?.value || 'Sin descripción';

  return (
    <TableRow 
      className={cn(
        isOutOfStock && product.status === 'activo' ? 'bg-destructive/5' : '',
        "animate-in fade-in-0"
      )}
      style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'backwards' }}
    >
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
      <TableCell className="text-muted-foreground truncate max-w-xs">{description}</TableCell>
      <TableCell className="text-center">
        <Badge variant={product.status === 'activo' ? 'secondary' : 'destructive'} className="capitalize">
            {product.status === 'activo' ? <PackageCheck className="mr-1.5" /> : <PackageX className="mr-1.5" />}
            {product.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right font-semibold">
          <div className={`flex items-center justify-end gap-1.5 ${isOutOfStock ? 'text-destructive' : ''}`}>
             <Package className="text-inherit/80" />
             {isOutOfStock ? 'Agotado' : product.stock}
          </div>
      </TableCell>
      <TableCell className="text-right font-semibold text-primary">
          <div className='flex items-center justify-end gap-1.5'>
             <Tag className="h-4 w-4 text-primary/80" />
             {formatPrice}
          </div>
      </TableCell>
      <TableCell className="text-right">
        <ProductActionsCell product={product} canEdit={canEdit} onProductUpdate={onProductUpdate} onProductDelete={onProductDelete} />
      </TableCell>
    </TableRow>
  );
}


function EditShopModal({ shop, onShopUpdate, children }: { shop: Shop, onShopUpdate: (shop: Shop) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(shop.name);
    const [specialization, setSpecialization] = useState(shop.specialization);
    const [logoSrc, setLogoSrc] = useState(shop.logoSrc);
    const [bannerSrc, setBannerSrc] = useState(shop.bannerSrc);
    const [status, setStatus] = useState(shop.status);
    const [iconName, setIconName] = useState<IconName>(shop.icon);


    useEffect(() => {
        if (isOpen) {
            setName(shop.name);
            setSpecialization(shop.specialization);
            setLogoSrc(shop.logoSrc);
            setBannerSrc(shop.bannerSrc);
            setStatus(shop.status);
            setIconName(shop.icon);
        }
    }, [isOpen, shop]);

    const handleSave = () => {
        if (!name || !specialization) {
            alert('Por favor completa todos los campos.');
            return;
        }
        onShopUpdate({
            ...shop,
            name,
            specialization,
            logoSrc,
            bannerSrc,
            status,
            icon: iconName,
        });
        setIsOpen(false);
    }
    
    const IconPreview = icons[iconName] || null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Editar Tienda</DialogTitle>
                    <DialogDescription>Realiza cambios en los detalles de la tienda.</DialogDescription>
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
                        <Label htmlFor="shop-icon-edit" className="text-right">Icono</Label>
                        <div className="col-span-3 flex items-center gap-2">
                             <Select value={iconName} onValueChange={(value: IconName) => setIconName(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un icono" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(icons).map(key => {
                                        const Icon = icons[key as IconName];
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
                        <Label htmlFor="shop-status-edit" className="text-right">Estatus</Label>
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
                             {logoSrc && (
                                <div className="mt-4 relative h-24 w-24 rounded-md overflow-hidden border">
                                    <Image src={logoSrc} alt="Previsualización del logo" fill className="object-cover" sizes="96px" />
                                </div>
                            )}
                        </div>
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4 pt-2">
                        <Label className="text-right pt-2">Banner</Label>
                        <div className="col-span-3">
                            <ImageUploader value={bannerSrc} onChange={setBannerSrc} />
                            {bannerSrc && (
                                <div className="mt-4 relative aspect-video w-full rounded-md overflow-hidden border">
                                    <Image src={bannerSrc} alt="Previsualización del banner" fill className="object-cover" sizes="100%" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleSave}>Guardar Cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

    

    