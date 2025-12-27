

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Product, ProductProperty } from '@/lib/data';
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
import { MoreHorizontal, Eye, Edit, Trash2, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Table, TableBody, TableCell, TableRow } from './ui/table';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ImageUploader } from './ImageUploader';
import { DynamicPropertiesEditor } from './DynamicPropertiesEditor';


export function ProductActionsCell({ product, canEdit, onProductUpdate, onProductDelete }: { product: Product, canEdit: boolean, onProductUpdate: (product: Product) => void, onProductDelete: (productId: string) => void }) {
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
        <ViewProductModal product={product}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Eye className="mr-2 h-4 w-4" />
                <span>Ver Detalles</span>
            </DropdownMenuItem>
        </ViewProductModal>
        {canEdit && (
            <>
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
            </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ViewProductModal({ product, children }: { product: Product, children: React.ReactNode }) {
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
                </DialogHeader>
                <div className="grid gap-6 py-4">
                   <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                       <Image src={product.imageSrc} alt={product.name} fill className="object-cover" sizes="100%"/>
                   </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="font-semibold">Precio:</div><div>{formatPrice(product.price)}</div>
                        <div className="font-semibold">Stock:</div><div>{product.stock > 0 ? product.stock : 'Agotado'}</div>
                        <div className="font-semibold">Estatus:</div><div><Badge variant={product.status === 'activo' ? 'secondary' : 'destructive'} className="capitalize">{product.status}</Badge></div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-sm">Propiedades</h4>
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

function EditProductModal({ product, onProductUpdate, children }: { product: Product, onProductUpdate: (product: Product) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(product.name);
    const [properties, setProperties] = useState<ProductProperty[]>(product.properties);
    const [price, setPrice] = useState(product.price);
    const [status, setStatus] = useState(product.status);
    const [imageSrc, setImageSrc] = useState(product.imageSrc);

    useEffect(() => {
      if (isOpen) {
        setName(product.name);
        setPrice(product.price);
        setStatus(product.status);
        setProperties(product.properties);
        setImageSrc(product.imageSrc);
      }
    }, [isOpen, product])
    
    const handleSave = () => {
        onProductUpdate({
            ...product,
            name,
            properties,
            price,
            status,
            imageSrc,
        });
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Editar Producto</DialogTitle>
                    <DialogDescription>Realiza cambios en los detalles del producto.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nombre</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
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
                    <Button onClick={handleSave}>Guardar Cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function UpdateStockModal({ product, onProductUpdate, children }: { product: Product, onProductUpdate: (product: Product) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [stock, setStock] = useState(product.stock);
    
    useEffect(() => {
        if (isOpen) {
            setStock(product.stock);
        }
    }, [isOpen, product]);

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
