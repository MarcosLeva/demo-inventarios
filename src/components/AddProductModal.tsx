
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import type { Product, ProductProperty, Shop, Organization, AppUser } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageUploader } from './ImageUploader';
import { DynamicPropertiesEditor } from './DynamicPropertiesEditor';

export function AddProductModal({ onProductAdd, children }: { onProductAdd: (product: Omit<Product, 'id' | 'imageHint'>) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [properties, setProperties] = useState<ProductProperty[]>([{ key: 'Descripción', value: '' }]);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [status, setStatus] = useState<'activo' | 'inactivo'>('activo');
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setProperties([{ key: 'Descripción', value: '' }]);
            setPrice(0);
            setStock(0);
            setStatus('activo');
            setImageSrc('');
        }
    }, [isOpen]);

    const handleSave = () => {
        if (!name || price <= 0 || stock < 0) {
            alert('Por favor completa los campos requeridos (Nombre, Precio > 0, Stock >= 0)');
            return;
        }
        onProductAdd({
            name,
            properties,
            price,
            stock,
            status,
            imageSrc
        });
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                    <DialogDescription>Completa los detalles para agregar un nuevo producto al inventario.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name-add" className="text-right">Nombre</Label>
                        <Input id="name-add" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
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
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Imagen</Label>
                         <div className="col-span-3">
                             <ImageUploader value={imageSrc} onChange={setImageSrc} />
                             {imageSrc && (
                                <div className="mt-4 relative h-24 w-24 rounded-md overflow-hidden border">
                                    <Image src={imageSrc} alt="Previsualización" fill className="object-cover" sizes="96px" />
                                </div>
                            )}
                         </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Propiedades</Label>
                         <div className="col-span-3">
                             <DynamicPropertiesEditor properties={properties} setProperties={setProperties} />
                         </div>
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

export function AddGlobalProductModal({ onProductAdd, allShops, allOrganizations, currentUser, children }: { onProductAdd: (shopId: string, product: Omit<Product, 'id' | 'imageHint' | 'shopId'>) => void, allShops: Shop[], allOrganizations: Organization[], currentUser: AppUser | null, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    // Product state
    const [name, setName] = useState('');
    const [properties, setProperties] = useState<ProductProperty[]>([{ key: 'Descripción', value: '' }]);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [status, setStatus] = useState<'activo' | 'inactivo'>('activo');
    const [imageSrc, setImageSrc] = useState('');
    
    // Selection state
    const [selectedOrgId, setSelectedOrgId] = useState<string | undefined>();
    const [selectedShopId, setSelectedShopId] = useState<string | undefined>();

    const availableShops = useMemo(() => {
        if (!currentUser) return [];
        if (currentUser.role === 'Admin') {
            return selectedOrgId ? allShops.filter(s => s.organizationId === selectedOrgId) : [];
        }
        if (currentUser.role === 'Editor') {
            return allShops.filter(s => s.organizationId === currentUser.organizationId);
        }
        return [];
    }, [currentUser, allShops, selectedOrgId]);

    useEffect(() => {
        if (isOpen) {
            // Reset form
            setName('');
            setProperties([{ key: 'Descripción', value: '' }]);
            setPrice(0);
            setStock(0);
            setStatus('activo');
            setImageSrc('');
            setSelectedOrgId(undefined);
            setSelectedShopId(undefined);
        }
    }, [isOpen]);
    
     useEffect(() => {
        // Reset shop selection if organization changes
        setSelectedShopId(undefined);
    }, [selectedOrgId]);

    const handleSave = () => {
        if (!name || price <= 0 || stock < 0 || !selectedShopId) {
            alert('Por favor completa todos los campos, incluyendo la tienda.');
            return;
        }
        onProductAdd(selectedShopId, {
            name,
            properties,
            price,
            stock,
            status,
            imageSrc
        });
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                    <DialogDescription>Completa los detalles para agregar un nuevo producto al inventario de una tienda.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    
                    {currentUser?.role === 'Admin' && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="org-select" className="text-right">Organización</Label>
                            <Select value={selectedOrgId} onValueChange={setSelectedOrgId}>
                                <SelectTrigger id="org-select" className="col-span-3">
                                    <SelectValue placeholder="Selecciona una organización" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allOrganizations.map(org => (
                                        <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shop-select" className="text-right">Tienda</Label>
                        <Select value={selectedShopId} onValueChange={setSelectedShopId} disabled={availableShops.length === 0}>
                            <SelectTrigger id="shop-select" className="col-span-3">
                                <SelectValue placeholder="Selecciona una tienda" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableShops.map(shop => (
                                    <SelectItem key={shop.id} value={shop.id}>{shop.name}</SelectItem>
                                ))}
                                 {availableShops.length === 0 && <SelectItem value="-" disabled>
                                    {currentUser?.role === 'Admin' ? 'Selecciona una organización primero' : 'No tienes tiendas asignadas'}
                                 </SelectItem>}
                            </SelectContent>
                        </Select>
                    </div>

                    <hr className="my-2" />

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name-add" className="text-right">Nombre</Label>
                        <Input id="name-add" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
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
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Imagen</Label>
                         <div className="col-span-3">
                             <ImageUploader value={imageSrc} onChange={setImageSrc} />
                             {imageSrc && (
                                <div className="mt-4 relative h-24 w-24 rounded-md overflow-hidden border">
                                    <Image src={imageSrc} alt="Previsualización" fill className="object-cover" sizes="96px" />
                                </div>
                            )}
                         </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Propiedades</Label>
                         <div className="col-span-3">
                             <DynamicPropertiesEditor properties={properties} setProperties={setProperties} />
                         </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleSave} disabled={!selectedShopId}>Guardar Producto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

