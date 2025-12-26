
'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter } from 'lucide-react';
import type { Shop } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

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
        <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px] sm:min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    id="search-inventory"
                    type="text"
                    placeholder="Buscar producto..."
                    className="pl-9 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {shops && selectedShop && setSelectedShop && (
                <Select value={selectedShop} onValueChange={setSelectedShop}>
                    <SelectTrigger className="w-full sm:w-auto min-w-[180px]">
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
            )}

            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                <SelectTrigger className="w-full sm:w-auto min-w-[160px]">
                    <SelectValue placeholder="Filtrar por estatus" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos los estatus</SelectItem>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                </SelectContent>
            </Select>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Filter className="mr-2 h-4 w-4" />
                        Más Filtros
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Filtros Adicionales</h4>
                            <p className="text-sm text-muted-foreground">
                                Ajusta el precio y la disponibilidad.
                            </p>
                        </div>
                        <div className="grid gap-2">
                             <div className="pt-2">
                                <div className="flex justify-between items-center mb-2">
                                    <Label>Rango de precios</Label>
                                    <span className="text-xs text-muted-foreground font-medium">
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

                             <div className="flex items-center gap-2 pt-4">
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
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
