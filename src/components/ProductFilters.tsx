
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter } from 'lucide-react';
import type { Shop } from '@/lib/data';

interface ProductFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    statusFilter: 'all' | 'activo' | 'inactivo';
    setStatusFilter: (value: 'all' | 'activo' | 'inactivo') => void;
    hideOutOfStock: boolean;
    setHideOutOfStock: (value: boolean) => void;
    priceRange: number[];
    setPriceRange: (value: number[]) => void;
    maxPrice: number;
    shops?: Shop[];
    selectedShop?: string;
    setSelectedShop?: (value: string) => void;
}

export function ProductFilters({
    searchTerm, setSearchTerm,
    statusFilter, setStatusFilter,
    hideOutOfStock, setHideOutOfStock,
    priceRange, setPriceRange,
    maxPrice,
    shops, selectedShop, setSelectedShop
}: ProductFiltersProps) {

    const formatPrice = (price: number) => new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
    }).format(price);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Filter /> Filtros</CardTitle>
                <CardDescription>Refina la lista de productos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label htmlFor="search-inventory">Buscar producto</Label>
                    <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            id="search-inventory"
                            type="text"
                            placeholder="Nombre del producto..."
                            className="pl-10 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {shops && selectedShop && setSelectedShop && (
                    <div className="space-y-2">
                        <Label>Tienda</Label>
                        <Select value={selectedShop} onValueChange={setSelectedShop}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por tienda" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las tiendas</SelectItem>
                                {shops.map(shop => (
                                    <SelectItem key={shop.id} value={shop.id}>
                                        {shop.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

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
                
                <div className="flex items-center gap-2 pt-2">
                    <Checkbox
                        id="hide-out-of-stock"
                        checked={hideOutOfStock}
                        onCheckedChange={(checked) => setHideOutOfStock(Boolean(checked))}
                    />
                    <Label htmlFor="hide-out-of-stock" className="text-sm">
                        Ocultar agotados
                    </Label>
                </div>

                <div className="pt-2">
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
            </CardContent>
        </Card>
    );
}

    