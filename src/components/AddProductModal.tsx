

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
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageUploader } from './ImageUploader';
import { DynamicPropertiesEditor } from './DynamicPropertiesEditor';

// This modal is now for adding a product to a specific shop's inventory from the shop page
export function AddProductModal({ onProductAdd, children }: { onProductAdd: (product: Omit<Product, 'id' | 'imageHint' | 'locations'> & { price: number, stock: number, status: 'activo' | 'inactivo' }) => void, children: React.ReactNode }) {
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
            <DialogContent className="sm:max-w-3xl">
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

export function AddGlobalProductModal({ onProductAdd, children }: { onProductAdd: (product: Omit<Product, 'id' | 'locations'>) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    // Product state
    const [name, setName] = useState('');
    const [properties, setProperties] = useState<ProductProperty[]>([{ key: 'Descripción', value: '' }]);
    const [imageSrc, setImageSrc] = useState('');
    
    useEffect(() => {
        if (isOpen) {
            // Reset form
            setName('');
            setProperties([{ key: 'Descripción', value: '' }]);
            setImageSrc('');
        }
    }, [isOpen]);

    const handleSave = () => {
        if (!name) {
            alert('Por favor completa el nombre del producto.');
            return;
        }
        onProductAdd({
            name,
            properties,
            imageSrc
        });
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Agregar Nuevo Producto Global</DialogTitle>
                    <DialogDescription>Crea un nuevo producto maestro. Luego podrás asignarlo a diferentes tiendas desde la lista de productos.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name-add" className="text-right">Nombre</Label>
                        <Input id="name-add" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
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
                    <Button onClick={handleSave}>Crear Producto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

    