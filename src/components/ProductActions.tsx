

'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import type { Product, ProductProperty, ShopProductDetails, Shop, Organization, AppUser } from '@/lib/data';
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
import { MoreHorizontal, Eye, Edit, Trash2, PlusCircle, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './ui/table';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ImageUploader } from './ImageUploader';
import { DynamicPropertiesEditor } from './DynamicPropertiesEditor';
import { useAuth } from '@/hooks/use-auth';
import { getShops, getOrganizations } from '@/lib/data';
import { ScrollArea } from './ui/scroll-area';


export function ProductActionsCell({ product, onProductUpdate, onProductDelete }: { product: Product, onProductUpdate: (product: Product) => void, onProductDelete: (productId: string) => void }) {
  const { user } = useAuth();
  const [allShops, setAllShops] = useState<Shop[]>([]);
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    if (user) {
        setAllShops(getShops(user));
        setAllOrganizations(getOrganizations(user));
    }
  }, [user]);

  const canEdit = user?.role === 'Admin' || user?.role === 'Editor';

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
        <ViewProductModal product={product} allShops={allShops}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Eye className="mr-2 h-4 w-4" />
                <span>Ver Detalles</span>
            </DropdownMenuItem>
        </ViewProductModal>
        {canEdit && (
            <>
                <DropdownMenuSeparator />
                 <ManageLocationsModal 
                    product={product} 
                    onProductUpdate={onProductUpdate}
                    allShops={allShops}
                    allOrganizations={allOrganizations}
                    currentUser={user}
                >
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>Gestionar Ubicaciones</span>
                    </DropdownMenuItem>
                </ManageLocationsModal>
                {user?.role === 'Admin' && (
                  <>
                    <EditProductModal product={product} onProductUpdate={onProductUpdate}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar Producto Maestro</span>
                        </DropdownMenuItem>
                    </EditProductModal>
                    <DropdownMenuSeparator />
                    <DeleteProductAlert productId={product.id} onProductDelete={onProductDelete}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                        </DropdownMenuItem>
                    </DeleteProductAlert>
                  </>
                )}
            </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ViewProductModal({ product, allShops, children }: { product: Product, allShops: Shop[], children: React.ReactNode }) {
    const getShopName = (shopId: string) => allShops.find(s => s.id === shopId)?.name || 'Tienda Desconocida';
    
    const formatPrice = (price: number) => new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
    }).format(price);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6 py-4">
                   <div className="space-y-6">
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
                           <Image src={product.imageSrc} alt={product.name} fill className="object-cover" sizes="100%"/>
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
                   <div>
                        <h4 className="font-semibold mb-2 text-sm">Ubicaciones y Precios</h4>
                         <Card>
                            <CardContent className="p-0">
                               <Table>
                                 <TableHeader>
                                     <TableRow>
                                        <TableCell>Tienda</TableCell>
                                        <TableCell>Precio</TableCell>
                                        <TableCell>Stock</TableCell>
                                        <TableCell>Estatus</TableCell>
                                     </TableRow>
                                 </TableHeader>
                                  <TableBody>
                                    {product.locations.length > 0 ? product.locations.map(loc => (
                                      <TableRow key={loc.shopId}>
                                          <TableCell className="font-medium">{getShopName(loc.shopId)}</TableCell>
                                          <TableCell>{formatPrice(loc.price)}</TableCell>
                                          <TableCell>{loc.stock}</TableCell>
                                          <TableCell>
                                              <Badge variant={loc.status === 'activo' ? 'secondary' : 'destructive'} className="capitalize">{loc.status}</Badge>
                                          </TableCell>
                                      </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center h-24">Este producto no está asignado a ninguna tienda.</TableCell>
                                        </TableRow>
                                    )}
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
    const [imageSrc, setImageSrc] = useState(product.imageSrc);

    useEffect(() => {
      if (isOpen) {
        setName(product.name);
        setProperties(product.properties);
        setImageSrc(product.imageSrc);
      }
    }, [isOpen, product])
    
    const handleSave = () => {
        onProductUpdate({
            ...product,
            name,
            properties,
            imageSrc,
        });
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Editar Producto Maestro</DialogTitle>
                    <DialogDescription>Realiza cambios en los detalles maestros del producto. Los precios y stock se gestionan en "Ubicaciones".</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nombre</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
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

function ManageLocationsModal({ product, onProductUpdate, allShops, allOrganizations, currentUser, children }: { product: Product, onProductUpdate: (product: Product) => void, allShops: Shop[], allOrganizations: Organization[], currentUser: AppUser | null, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [locations, setLocations] = useState<ShopProductDetails[]>([]);
    const [selectedOrgId, setSelectedOrgId] = useState<string>('');

    const availableShops = useMemo(() => {
        if (!currentUser) return [];
        if (currentUser.role === 'Admin') {
            return allShops.filter(s => s.organizationId === selectedOrgId);
        }
        return allShops.filter(s => s.organizationId === currentUser.organizationId);
    }, [allShops, selectedOrgId, currentUser]);


    useEffect(() => {
        if(isOpen) {
            setLocations(JSON.parse(JSON.stringify(product.locations)));
            if (currentUser?.role === 'Editor') {
                setSelectedOrgId(currentUser.organizationId!);
            } else {
                setSelectedOrgId('');
            }
        }
    }, [isOpen, product, currentUser]);

    const handleSave = () => {
        onProductUpdate({ ...product, locations });
        setIsOpen(false);
    }

    const handleLocationChange = (shopId: string, field: keyof ShopProductDetails, value: string | number) => {
        setLocations(currentLocations => {
            const newLocations = [...currentLocations];
            const locIndex = newLocations.findIndex(l => l.shopId === shopId);
            if (locIndex > -1) {
                (newLocations[locIndex] as any)[field] = value;
            }
            return newLocations;
        });
    }
    
    const addLocation = (shop: Shop) => {
        if (!locations.some(l => l.shopId === shop.id)) {
            setLocations(current => [...current, { shopId: shop.id, price: 0, stock: 0, status: 'activo' }]);
        }
    }
    
    const removeLocation = (shopId: string) => {
        setLocations(current => current.filter(l => l.shopId !== shopId));
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Gestionar Ubicaciones para "{product.name}"</DialogTitle>
                    <DialogDescription>Asigna este producto a tiendas y define su precio, stock y estatus para cada una.</DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-8 py-4 max-h-[70vh]">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-semibold">Tiendas Disponibles</h4>
                         {currentUser?.role === 'Admin' && (
                            <Select value={selectedOrgId} onValueChange={setSelectedOrgId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una organización..." />
                                </SelectTrigger>
                                <SelectContent>
                                     {allOrganizations.map(org => <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                         )}
                         <ScrollArea className="h-96 border rounded-md p-2">
                            {availableShops.map(shop => (
                                <div key={shop.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
                                    <Label>{shop.name}</Label>
                                    <Button size="sm" variant="outline" onClick={() => addLocation(shop)} disabled={locations.some(l => l.shopId === shop.id)}>
                                        <PlusCircle className="mr-2"/> Asignar
                                    </Button>
                                </div>
                            ))}
                            {availableShops.length === 0 && <p className="text-sm text-center text-muted-foreground p-4">No hay tiendas en esta organización.</p>}
                         </ScrollArea>
                    </div>
                     <div className="flex flex-col gap-4">
                         <h4 className="font-semibold">Tiendas Asignadas</h4>
                         <ScrollArea className="h-[450px] border rounded-md p-4 space-y-4">
                             {locations.length > 0 ? locations.map(loc => {
                                const shop = allShops.find(s => s.id === loc.shopId);
                                if (!shop) return null;
                                return (
                                <Card key={loc.shopId}>
                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label className="font-semibold">{shop.name}</Label>
                                            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => removeLocation(loc.shopId)}>
                                                <Trash2 className="mr-2"/> Quitar
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label htmlFor={`price-${loc.shopId}`}>Precio</Label>
                                                <Input id={`price-${loc.shopId}`} type="number" value={loc.price} onChange={e => handleLocationChange(loc.shopId, 'price', Number(e.target.value))} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor={`stock-${loc.shopId}`}>Stock</Label>
                                                <Input id={`stock-${loc.shopId}`} type="number" value={loc.stock} onChange={e => handleLocationChange(loc.shopId, 'stock', Number(e.target.value))} />
                                            </div>
                                        </div>
                                         <div className="space-y-1">
                                            <Label htmlFor={`status-${loc.shopId}`}>Estatus</Label>
                                            <Select value={loc.status} onValueChange={(val: 'activo' | 'inactivo') => handleLocationChange(loc.shopId, 'status', val)}>
                                                <SelectTrigger id={`status-${loc.shopId}`}>
                                                    <SelectValue placeholder="Estatus" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="activo">Activo</SelectItem>
                                                    <SelectItem value="inactivo">Inactivo</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>
                                )
                             }) : (
                                 <div className="text-center text-muted-foreground p-8">
                                     <p>Asigna este producto a una tienda desde el panel izquierdo.</p>
                                 </div>
                             )}
                         </ScrollArea>
                     </div>
                </div>

                 <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleSave}>Guardar Ubicaciones</Button>
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
                    <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente el producto y todas sus ubicaciones de la base de datos.
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
