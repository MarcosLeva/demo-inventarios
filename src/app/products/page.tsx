
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { getAllProducts, getShops } from '@/lib/data';
import type { Product, Shop } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, PackageCheck, PackageX, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { ProductFilters } from '@/components/ProductFilters';

const PRODUCTS_PER_PAGE = 10;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShop, setSelectedShop] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'activo' | 'inactivo'>('all');
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const { user } = useAuth();
  
  const maxPrice = useMemo(() => {
    if (!products || products.length === 0) {
      return 100;
    }
    return Math.ceil(Math.max(...products.map((p) => p.price)));
  }, [products]);

  useEffect(() => {
    setTimeout(() => {
      const allProducts = getAllProducts(user);
      setProducts(allProducts);
      setShops(getShops(user));
      const initialMaxPrice = allProducts.length > 0
          ? Math.ceil(Math.max(...allProducts.map((p) => p.price)))
          : 100;
      setPriceRange([0, initialMaxPrice]);
      setLoading(false);
    }, 500);
  }, [user]);

  const getShopName = (shopId: string | undefined) => {
    if (!shopId) return 'N/A';
    const shop = shops.find(s => s.id === shopId);
    return shop ? shop.name : 'N/A';
  }

  const filteredProducts = useMemo(() => {
    setCurrentPage(1);
    return products.filter(product => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesShop = selectedShop === 'all' || product.shopId === selectedShop;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      const matchesStock = !hideOutOfStock || product.stock > 0;
      return matchesSearchTerm && matchesShop && matchesPrice && matchesStatus && matchesStock;
    });
  }, [products, searchTerm, selectedShop, priceRange, statusFilter, hideOutOfStock]);
  
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);


  const formatPrice = (price: number) => new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
        <p className="text-muted-foreground">
          Un listado de todos los productos disponibles en todas las tiendas.
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
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
                shops={shops}
                selectedShop={selectedShop}
                setSelectedShop={setSelectedShop}
              />
        </aside>

        <main className="lg:col-span-3">
            <h2 className="text-3xl font-bold font-headline mb-4">Resultados ({filteredProducts.length})</h2>
            <Card>
                <CardContent className="p-0">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Imagen</TableHead>
                        <TableHead>Producto</TableHead>
                        <TableHead>Tienda</TableHead>
                        <TableHead>Estatus</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead className="text-center">Acciones</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {loading ? (
                        Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton className="h-16 w-16 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                                <TableCell><Skeleton className="h-8 w-8 mx-auto" /></TableCell>
                            </TableRow>
                        ))
                    ) : paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                                <Image
                                src={product.imageSrc}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                                />
                            </div>
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell className="text-muted-foreground">{getShopName(product.shopId)}</TableCell>
                            <TableCell>
                            <Badge variant={product.status === 'activo' ? 'secondary' : 'destructive'} className="capitalize">
                                {product.status === 'activo' ? <PackageCheck className="mr-1.5 h-3 w-3" /> : <PackageX className="mr-1.5 h-3 w-3" />}
                                {product.status}
                            </Badge>
                            </TableCell>
                            <TableCell className={cn("text-right font-semibold", product.stock === 0 ? "text-destructive" : "")}>
                            {product.stock === 0 ? 'Agotado' : product.stock}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                            {formatPrice(product.price)}
                            </TableCell>
                            <TableCell className="text-center">
                                <ViewProductModal product={product} shopName={getShopName(product.shopId)}>
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">Ver Detalles</span>
                                    </Button>
                                </ViewProductModal>
                            </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                            No se encontraron productos.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
            
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
        </main>
      </div>
    </div>
  );
}


function ViewProductModal({ product, shopName, children }: { product: Product, shopName: string, children: React.ReactNode }) {
    const formatPrice = (price: number) => new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
    }).format(price);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                    <DialogDescription>Detalles completos del producto.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                   <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                       <Image src={product.imageSrc} alt={product.name} fill className="object-cover" sizes="100%"/>
                   </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="font-semibold">Tienda:</div><div>{shopName}</div>
                        <div className="font-semibold">Precio:</div><div>{formatPrice(product.price)}</div>
                        <div className="font-semibold">Stock:</div><div>{product.stock > 0 ? product.stock : 'Agotado'}</div>
                        <div className="font-semibold">Estatus:</div><div><Badge variant={product.status === 'activo' ? 'secondary' : 'destructive'} className="capitalize">{product.status}</Badge></div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-sm">Propiedades Adicionales</h4>
                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableBody>
                                        {product.properties.map((prop, index) => (
                                            <TableRow key={index} className="text-sm">
                                                <TableCell className="font-medium w-1/3">{prop.key}</TableCell>
                                                <TableCell>{prop.value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

    