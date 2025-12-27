
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts, getShops, updateProduct as updateProductInData, deleteProduct as deleteProductFromData, addProduct as addProductToData, getOrganizations } from '@/lib/data';
import type { Product, Shop, Organization } from '@/lib/data';
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
import { Search, PackageCheck, PackageX, ChevronLeft, ChevronRight, Eye, PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductActionsCell } from '@/components/ProductActions';
import { AddGlobalProductModal } from '@/components/AddProductModal';


const PRODUCTS_PER_PAGE = 10;

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
  
  const maxPrice = useMemo(() => {
    if (!products || products.length === 0) {
      return 100;
    }
    return Math.ceil(Math.max(...products.map((p) => p.price)));
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
      const initialMaxPrice = allProducts.length > 0
          ? Math.ceil(Math.max(...allProducts.map((p) => p.price)))
          : 100;
      setPriceRange([0, initialMaxPrice]);
      setLoading(false);
    }, 500);
  };
  
  useEffect(() => {
    fetchData();
  }, [user]);

  const handleProductUpdate = (updatedProduct: Product) => {
    if(!updatedProduct.shopId) return;
    updateProductInData(updatedProduct.shopId, updatedProduct);
    fetchData();
  }

  const handleProductDelete = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product || !product.shopId) return;
    deleteProductFromData(product.shopId, productId);
    fetchData();
  }

  const handleProductAdd = (shopId: string, newProductData: Omit<Product, 'id' | 'imageHint' | 'shopId'>) => {
    addProductToData(shopId, newProductData);
    fetchData();
  };

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
  
  const canAddProduct = user?.role === 'Admin' || user?.role === 'Editor';

  return (
    <div className="flex flex-col gap-6">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">
            Un listado de todos los productos disponibles en todas las tiendas.
          </p>
        </div>
        {canAddProduct && (
          <AddGlobalProductModal 
            onProductAdd={handleProductAdd} 
            allShops={shops} 
            allOrganizations={organizations} 
            currentUser={user}
          >
            <Button>
              <PlusCircle className="mr-2" />
              Agregar Producto
            </Button>
          </AddGlobalProductModal>
        )}
      </header>
      
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
                  paginatedProducts.map((product) => {
                    const shop = shops.find(s => s.id === product.shopId);
                    const canEdit = user?.role === 'Admin' || (user?.role === 'Editor' && user.organizationId === shop?.organizationId);
                    return (
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
                              {product.shopId ? (
                                <Link href={`/shop/${product.shopId}`} className="text-muted-foreground hover:text-primary hover:underline">
                                  {getShopName(product.shopId)}
                                </Link>
                              ) : (
                                <span className="text-muted-foreground">{getShopName(product.shopId)}</span>
                              )}
                            </TableCell>
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
                                <ProductActionsCell
                                  product={product}
                                  canEdit={!!canEdit}
                                  onProductUpdate={handleProductUpdate}
                                  onProductDelete={handleProductDelete}
                                />
                            </TableCell>
                        </TableRow>
                    )
                })
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
