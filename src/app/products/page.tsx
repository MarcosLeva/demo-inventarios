

'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts, getShops, updateProduct as updateProductInData, deleteProductFromData, addProductToData, getOrganizations } from '@/lib/data';
import type { Product, Shop, Organization, ShopProductDetails } from '@/lib/data';
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
import { Search, MapPin, ChevronLeft, ChevronRight, Eye, PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductActionsCell } from '@/components/ProductActions';
import { AddGlobalProductModal } from '@/components/AddProductModal';


const PRODUCTS_PER_PAGE = 10;

type DisplayProduct = Product & {
    priceRange?: string;
    stockSum?: number;
    statusSummary?: string;
};


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShop, setSelectedShop] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'activo' | 'inactivo'>('all');
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const { user } = useAuth();
  
  // New state for editor's view filter
  const [editorView, setEditorView] = useState<'my-shops' | 'all'>('my-shops');

  const maxPrice = useMemo(() => {
    if (!products || products.length === 0) {
      return 100;
    }
    const allPrices = products.flatMap(p => p.locations.map(l => l.price));
    if (allPrices.length === 0) return 100;
    return Math.ceil(Math.max(...allPrices));
  }, [products]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      if (!user) {
        setLoading(false);
        return;
      }
      const allProducts = getAllProducts(user);
      setProducts(allProducts);
      const allShops = getShops(user);
      setShops(allShops);
      setOrganizations(getOrganizations(user));
      
      const allPrices = allProducts.flatMap(p => p.locations.map(l => l.price));
      const initialMaxPrice = allPrices.length > 0 ? Math.ceil(Math.max(...allPrices)) : 100;
      setPriceRange([0, initialMaxPrice]);

      setLoading(false);
    }, 500);
  };
  
  useEffect(() => {
    fetchData();
  }, [user]);

  const handleProductUpdate = (updatedProduct: Product) => {
    updateProductInData(updatedProduct);
    fetchData();
  }

  const handleProductDelete = (productId: string) => {
    deleteProductFromData(productId);
    fetchData();
  }

  const handleProductAdd = (newProductData: Omit<Product, 'id' | 'locations'>) => {
    addProductToData(newProductData);
    fetchData();
  };

  const getShopName = (shopId: string | undefined) => {
    if (!shopId) return 'N/A';
    const shop = shops.find(s => s.id === shopId);
    return shop ? shop.name : 'N/A';
  }
  
  const formatPrice = (price: number) => new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

  const filteredProducts = useMemo(() => {
    setCurrentPage(1);

    let baseProducts = products;

    if (user?.role === 'Editor' && editorView === 'my-shops') {
      const editorOrgShops = shops.filter(s => s.organizationId === user.organizationId).map(s => s.id);
      baseProducts = products.filter(p => p.locations.some(loc => editorOrgShops.includes(loc.shopId)));
    }

    return baseProducts.filter(product => {
      // 1. Filter by search term (always applies)
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearchTerm) {
        return false;
      }

      // Determine which locations are relevant for filtering
      let relevantLocations = product.locations;
      if (user?.role === 'Editor') {
        const editorOrgShops = shops.filter(s => s.organizationId === user.organizationId).map(s => s.id);
        relevantLocations = product.locations.filter(loc => editorOrgShops.includes(loc.shopId));
      }

      // If in Editor's "all" view and product has no locations in their org, show it if it matched search
      if (user?.role === 'Editor' && editorView === 'all' && relevantLocations.length === 0) {
        return true;
      }

      // 2. Apply location-based filters
      return relevantLocations.some(loc => {
        const matchesShop = selectedShop === 'all' || loc.shopId === selectedShop;
        const matchesPrice = loc.price >= priceRange[0] && loc.price <= priceRange[1];
        const matchesStatus = statusFilter === 'all' || loc.status === statusFilter;
        const matchesStock = !hideOutOfStock || loc.stock > 0;
        return matchesShop && matchesPrice && matchesStatus && matchesStock;
      });
    });
}, [products, searchTerm, selectedShop, priceRange, statusFilter, hideOutOfStock, user, editorView, shops]);

  
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts: DisplayProduct[] = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex).map(p => {
        let relevantLocations = p.locations;
        if (user?.role === 'Editor') {
            const editorOrgShops = shops.filter(s => s.organizationId === user.organizationId).map(s => s.id);
            relevantLocations = p.locations.filter(loc => editorOrgShops.includes(loc.shopId));
        }

        const stockSum = relevantLocations.reduce((acc, loc) => acc + loc.stock, 0);
        const prices = relevantLocations.map(l => l.price);
        const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
        const maxPriceVal = prices.length > 0 ? Math.max(...prices) : 0;

        const priceRange = prices.length > 1 && minPrice !== maxPriceVal 
            ? `${formatPrice(minPrice)} - ${formatPrice(maxPriceVal)}` 
            : prices.length > 0 ? formatPrice(minPrice) : 'N/A';

        const activeCount = relevantLocations.filter(l => l.status === 'activo').length;
        const inactiveCount = relevantLocations.filter(l => l.status === 'inactivo').length;
        let statusSummary = 'No asignado';
        if (relevantLocations.length > 0) {
            if (activeCount > 0 && inactiveCount > 0) statusSummary = 'Mixto';
            else if (activeCount > 0) statusSummary = 'Activo';
            else if (inactiveCount > 0) statusSummary = 'Inactivo';
        }
        
        return {
            ...p,
            stockSum,
            priceRange,
            statusSummary,
        }
    });
  }, [filteredProducts, currentPage, user, shops, formatPrice]);

  const canAddProduct = user?.role === 'Admin';

  const productFiltersProps = {
    searchTerm, setSearchTerm,
    statusFilter, setStatusFilter,
    hideOutOfStock, setHideOutOfStock,
    priceRange, setPriceRange,
    maxPrice,
    // Pass shops based on user role
    shops: user?.role === 'Admin' ? shops : shops.filter(s => s.organizationId === user?.organizationId),
    selectedShop, setSelectedShop
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos Globales</h1>
          <p className="text-muted-foreground">
            {user?.role === 'Admin' 
              ? "Listado maestro de todos los productos. Desde aquí se asignan a las tiendas."
              : "Catálogo de productos. Asigna productos a las tiendas de tu organización."
            }
          </p>
        </div>
        {canAddProduct && (
          <AddGlobalProductModal onProductAdd={handleProductAdd}>
            <Button>
              <PlusCircle className="mr-2" />
              Crear Producto
            </Button>
          </AddGlobalProductModal>
        )}
      </header>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <ProductFilters {...productFiltersProps} />
        {user?.role === 'Editor' && (
          <Select value={editorView} onValueChange={(v: 'my-shops'|'all') => setEditorView(v)}>
            <SelectTrigger className="w-full sm:w-auto min-w-[180px]">
              <SelectValue placeholder="Mostrar productos..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="my-shops">En Mis Tiendas</SelectItem>
              <SelectItem value="all">Todos los Productos</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <Card>
          <CardHeader>
              <CardTitle>Resultados ({filteredProducts.length})</CardTitle>
              <CardDescription>Esta es la lista de productos que coincide con tu búsqueda y filtros.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
          <Table>
              <TableHeader>
              <TableRow>
                  <TableHead className="w-[80px]">Imagen</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Ubicaciones</TableHead>
                  <TableHead>Estatus</TableHead>
                  <TableHead className="text-right">Stock Total</TableHead>
                  <TableHead>Rango de Precio</TableHead>
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
                            <TableCell>
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{product.locations.length} tienda(s)</span>
                                </div>
                            </TableCell>
                            <TableCell>
                            <Badge variant={product.statusSummary === 'Activo' ? 'secondary' : (product.statusSummary === 'Mixto' ? 'outline' : (product.statusSummary === 'No asignado' ? 'default' : 'destructive'))} className="capitalize">
                                {product.statusSummary}
                            </Badge>
                            </TableCell>
                            <TableCell className={cn("text-right font-semibold", product.stockSum === 0 && product.statusSummary !== 'No asignado' ? "text-destructive" : "")}>
                            {product.statusSummary !== 'No asignado' ? product.stockSum : '-'}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-primary/80">
                            {product.priceRange}
                            </TableCell>
                            <TableCell className="text-center">
                                <ProductActionsCell
                                  product={product}
                                  onProductUpdate={handleProductUpdate}
                                  onProductDelete={handleProductDelete}
                                />
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
    </div>
  );
}
