
'use client';

import { useState, useMemo, useEffect } from 'react';
import { getShopById } from '@/lib/data';
import type { Product, Shop } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Tag, Search, Package, PackageCheck, PackageX, MoreHorizontal, Edit, Trash2, PlusCircle, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ITEMS_PER_PAGE = 10;

export default function ShopPage({ params }: { params: { id: string } }) {
  const shopData = getShopById(params.id);

  const [shop, setShop] = useState<Shop | undefined>(shopData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'activo' | 'inactivo'>('all');
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const maxPrice = useMemo(() => {
    if (!shop || shop.inventory.length === 0) {
      return 100;
    }
    return Math.ceil(Math.max(...shop.inventory.map((p) => p.price)));
  }, [shop]);

  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  useEffect(() => {
    if (shop) {
        setPriceRange([0, Math.ceil(Math.max(...shop.inventory.map((p) => p.price))) || 100]);
    }
  }, [shop]);


  if (!shop) {
    notFound();
  }
  
  const handleShopUpdate = (updatedShop: Shop) => {
    setShop(updatedShop);
  }

  const handleProductAdd = (newProduct: Omit<Product, 'id' | 'imageSrc' | 'imageHint'>) => {
    setShop(prevShop => {
        if (!prevShop) return prevShop;
        const productToAdd: Product = {
            ...newProduct,
            id: `p${Date.now()}`,
            imageSrc: `https://picsum.photos/seed/new${Date.now()}/400/300`,
            imageHint: 'nuevo producto',
        };
        const newInventory = [productToAdd, ...prevShop.inventory];
        return {...prevShop, inventory: newInventory};
    });
  }

  const handleProductUpdate = (updatedProduct: Product) => {
    setShop(prevShop => {
        if (!prevShop) return prevShop;
        const newInventory = prevShop.inventory.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        return {...prevShop, inventory: newInventory};
    });
  }

  const handleProductDelete = (productId: string) => {
    setShop(prevShop => {
        if (!prevShop) return prevShop;
        const newInventory = prevShop.inventory.filter(p => p.id !== productId);
        return {...prevShop, inventory: newInventory};
    });
  }

  const filteredInventory = useMemo(() => {
    setCurrentPage(1); // Reset page when filters change
    if (!shop) return [];
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
                 <EditShopModal shop={shop} onShopUpdate={handleShopUpdate}>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar Tienda</span>
                    </Button>
                </EditShopModal>
            </div>
          <p className="text-lg text-muted-foreground ml-1">{shop.specialization}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-6 mb-8 p-6 bg-card rounded-lg border">
        <div className="lg:col-span-4">
            <h3 className="text-lg font-medium">Filtros de Inventario</h3>
            <p className="text-sm text-muted-foreground">Refina la lista de productos.</p>
        </div>

        <div className="lg:col-span-2">
            <Label htmlFor="search-inventory">Buscar producto</Label>
            <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="search-inventory"
                  type="text"
                  placeholder="Buscar por nombre..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className="space-y-2">
            <Label>Estatus</Label>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estatus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estatus</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
        </div>
        
        <div className="flex items-end pb-2">
             <div className="flex items-center gap-2">
                <Checkbox
                    id="hide-out-of-stock"
                    checked={hideOutOfStock}
                    onCheckedChange={(checked) => setHideOutOfStock(Boolean(checked))}
                />
                <Label htmlFor="hide-out-of-stock" className="text-sm">
                    Ocultar agotados
                </Label>
            </div>
        </div>

        <div className="lg:col-span-4">
            <div className="flex justify-between items-center mb-2">
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


      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold font-headline">Inventario ({filteredInventory.length})</h2>
        <AddProductModal onProductAdd={handleProductAdd}>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Producto
            </Button>
        </AddProductModal>
      </div>

      <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Imagen</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-center">Estatus</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInventory.length > 0 ? (
                paginatedInventory.map((product) => (
                  <ProductRow 
                    key={product.id} 
                    product={product}
                    onProductUpdate={handleProductUpdate}
                    onProductDelete={handleProductDelete}
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
    </div>
  );
}

function ProductRow({ product, onProductUpdate, onProductDelete }: { product: Product, onProductUpdate: (product: Product) => void, onProductDelete: (productId: string) => void }) {
  const formatPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price);
  
  const isOutOfStock = product.stock === 0;

  return (
    <TableRow className={isOutOfStock && product.status === 'activo' ? 'bg-destructive/5' : ''}>
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
      <TableCell className="text-center">
        <Badge variant={product.status === 'activo' ? 'secondary' : 'outline'} className="capitalize">
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
        <ProductActionsCell product={product} onProductUpdate={onProductUpdate} onProductDelete={onProductDelete} />
      </TableCell>
    </TableRow>
  );
}

function ProductActionsCell({ product, onProductUpdate, onProductDelete }: { product: Product, onProductUpdate: (product: Product) => void, onProductDelete: (productId: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditProductModal product={product} onProductUpdate={onProductUpdate}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Editar</span>
            </DropdownMenuItem>
        </EditProductModal>
        <UpdateStockModal product={product} onProductUpdate={onProductUpdate}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Actualizar Stock</span>
            </DropdownMenuItem>
        </UpdateStockModal>
        <DropdownMenuSeparator />
        <DeleteProductAlert productId={product.id} onProductDelete={onProductDelete}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Eliminar</span>
            </DropdownMenuItem>
        </DeleteProductAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AddProductModal({ onProductAdd, children }: { onProductAdd: (product: Omit<Product, 'id' | 'imageSrc' | 'imageHint'>) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [status, setStatus] = useState<'activo' | 'inactivo'>('activo');

    const handleSave = () => {
        if (!name || price <= 0 || stock < 0) {
            // Basic validation
            alert('Por favor completa los campos requeridos (Nombre, Precio > 0, Stock >= 0)');
            return;
        }
        onProductAdd({
            name,
            description,
            price,
            stock,
            status,
        });
        setIsOpen(false);
        // Reset form
        setName('');
        setDescription('');
        setPrice(0);
        setStock(0);
        setStatus('activo');
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                    <DialogDescription>Completa los detalles para agregar un nuevo producto al inventario.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name-add" className="text-right">Nombre</Label>
                        <Input id="name-add" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description-add" className="text-right">Descripción</Label>
                        <Input id="description-add" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price-add" className="text-right">Precio (€)</Label>
                        <Input id="price-add" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock-add" className="text-right">Stock</Label>
                        <Input id="stock-add" type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status-add" className="text-right">Estatus</Label>
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
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleSave}>Guardar Producto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function EditProductModal({ product, onProductUpdate, children }: { product: Product, onProductUpdate: (product: Product) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [status, setStatus] = useState(product.status);

    const handleSave = () => {
        onProductUpdate({
            ...product,
            name,
            description,
            price,
            status,
        });
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Producto</DialogTitle>
                    <DialogDescription>Realiza cambios en los detalles del producto.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nombre</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Descripción</Label>
                        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Precio (€)</Label>
                        <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Estatus</Label>
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

function UpdateStockModal({ product, onProductUpdate, children }: { product: Product, onProductUpdate: (product: Product) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [stock, setStock] = useState(product.stock);
    
    const handleSave = () => {
        onProductUpdate({ ...product, stock });
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Actualizar Stock</DialogTitle>
                    <DialogDescription>Ajusta la cantidad de stock para <strong>{product.name}</strong>.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stock" className="text-right">Stock</Label>
                        <Input id="stock" type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="col-span-3" />
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

function DeleteProductAlert({ productId, onProductDelete, children }: { productId: string, onProductDelete: (productId: string) => void, children: React.ReactNode }) {
    const handleDelete = () => {
        onProductDelete(productId);
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás absolutely seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente el producto de la base de datos.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function EditShopModal({ shop, onShopUpdate, children }: { shop: Shop, onShopUpdate: (shop: Shop) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(shop.name);
    const [specialization, setSpecialization] = useState(shop.specialization);
    const [logoSrc, setLogoSrc] = useState(shop.logoSrc);

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
        });
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
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
                        <Label htmlFor="shop-image" className="text-right">URL de la Imagen</Label>
                        <div className="col-span-3 flex items-center gap-2">
                           <ImageIcon className="h-5 w-5 text-muted-foreground" />
                           <Input id="shop-image" value={logoSrc} onChange={(e) => setLogoSrc(e.target.value)} placeholder="https://ejemplo.com/logo.png" />
                        </div>
                    </div>
                    {logoSrc && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Previsualización</Label>
                            <div className="col-span-3">
                                <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                                    <Image src={logoSrc} alt="Previsualización del logo" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    )}
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
    

    