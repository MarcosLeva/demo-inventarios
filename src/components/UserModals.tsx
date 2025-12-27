

'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import type { AppUser, Shop, Organization } from '@/lib/data';
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
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Edit, Trash2, Store } from 'lucide-react';


export function UserActionsCell({ user, allShops, allOrganizations, onUserUpdate, onUserDelete, currentUser }: { user: AppUser, allShops: Shop[], allOrganizations: Organization[], onUserUpdate: (user: AppUser) => void, onUserDelete: (userId: string) => void, currentUser?: AppUser | null }) {
  if (!currentUser) return null;
  if (currentUser.id === user.id) return null;
  if (currentUser.role === 'Editor' && user.role === 'Admin') return null;
  if (currentUser.role === 'Editor' && user.organizationId !== currentUser.organizationId) return null;

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
        <EditUserModal user={user} allShops={allShops} allOrganizations={allOrganizations} onUserUpdate={onUserUpdate} currentUser={currentUser}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Editar</span>
            </DropdownMenuItem>
        </EditUserModal>
        <DeleteUserAlert userId={user.id} onUserDelete={onUserDelete}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Eliminar</span>
            </DropdownMenuItem>
        </DeleteUserAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AddUserModal({ onUserAdd, allShops, allOrganizations, currentUser, children, defaultOrganizationId }: { onUserAdd: (user: Omit<AppUser, 'id'>) => void, allShops: Shop[], allOrganizations: Organization[], currentUser: AppUser | null, children: React.ReactNode, defaultOrganizationId?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<AppUser['role']>('Vendedor');
    const [status, setStatus] = useState<AppUser['status']>('activo');
    const [selectedShopIds, setSelectedShopIds] = useState<string[]>([]);
    const [organizationId, setOrganizationId] = useState<string | undefined>(defaultOrganizationId ?? (currentUser?.role === 'Editor' ? currentUser.organizationId : undefined));
    
    const availableRoles = currentUser?.role === 'Admin' ? ['Admin', 'Editor', 'Vendedor'] : ['Editor', 'Vendedor'];

    const assignableShops = useMemo(() => {
        const orgId = defaultOrganizationId ?? (currentUser?.role === 'Editor' ? currentUser.organizationId : organizationId);
        if (!orgId) return [];
        return allShops.filter(s => s.organizationId === orgId);
    }, [allShops, organizationId, currentUser, defaultOrganizationId]);


    useEffect(() => {
        if(isOpen) {
            // Reset form when modal opens
            setName('');
            setEmail('');
            setRole('Vendedor');
            setStatus('activo');
            setSelectedShopIds([]);
            setOrganizationId(defaultOrganizationId ?? (currentUser?.role === 'Editor' ? currentUser.organizationId : undefined));
        }
    }, [isOpen, currentUser, defaultOrganizationId]);
    
    useEffect(() => {
        setSelectedShopIds([]);
    }, [organizationId]);


    const handleSave = () => {
        if (!name || !email || !role) {
            alert('Por favor completa todos los campos.');
            return;
        }

        if (role !== 'Admin' && !organizationId) {
            alert('Debes seleccionar una organización para este rol.');
            return;
        }

        onUserAdd({ name, email, role, status, shopIds: role === 'Vendedor' ? selectedShopIds : [], organizationId: role !== 'Admin' ? organizationId : undefined });
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                    <DialogDescription>Completa los detalles para crear un nuevo usuario.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-name-add" className="text-right">Nombre</Label>
                        <Input id="user-name-add" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-email-add" className="text-right">Email</Label>
                        <Input id="user-email-add" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-role-add" className="text-right">Rol</Label>
                        <Select value={role} onValueChange={(value: AppUser['role']) => setRole(value)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableRoles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    {currentUser?.role === 'Admin' && role !== 'Admin' && (
                         <div className="grid grid-cols-4 items-center gap-4">
                             <Label htmlFor="user-org-add" className="text-right">Organización</Label>
                             <Select value={organizationId} onValueChange={setOrganizationId} disabled={!!defaultOrganizationId}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Selecciona una organización" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allOrganizations.map(org => <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                         </div>
                    )}

                     {(role === 'Vendedor') && (
                       <div className="grid grid-cols-4 items-start gap-4">
                          <Label className="text-right pt-2">Tiendas</Label>
                          <ShopSelector allShops={assignableShops} selectedShopIds={selectedShopIds} onChange={setSelectedShopIds} disabled={!organizationId && currentUser?.role !== 'Editor'} />
                        </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-status-add" className="text-right">Estatus</Label>
                        <Select value={status} onValueChange={(value: AppUser['status']) => setStatus(value)}>
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
                    <Button onClick={handleSave}>Guardar Usuario</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function EditUserModal({ user, allShops, allOrganizations, onUserUpdate, currentUser, children }: { user: AppUser, allShops: Shop[], allOrganizations: Organization[], onUserUpdate: (user: AppUser) => void, currentUser: AppUser | null, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState<AppUser['role']>(user.role);
    const [status, setStatus] = useState<AppUser['status']>(user.status);
    const [selectedShopIds, setSelectedShopIds] = useState<string[]>(user.shopIds);
    const [organizationId, setOrganizationId] = useState<string | undefined>(user.organizationId);
    
    const availableRoles = currentUser?.role === 'Admin' ? ['Admin', 'Editor', 'Vendedor'] : ['Editor', 'Vendedor'];

    const assignableShops = useMemo(() => {
        if (currentUser?.role === 'Admin') {
            if (!organizationId) return [];
            return allShops.filter(s => s.organizationId === organizationId);
        }
        if (currentUser?.role === 'Editor') {
            if (!currentUser.organizationId) return [];
            return allShops.filter(s => s.organizationId === currentUser.organizationId);
        }
        return [];
    }, [allShops, organizationId, currentUser]);


    useEffect(() => {
        if(isOpen) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setStatus(user.status);
            setSelectedShopIds(user.shopIds);
            setOrganizationId(user.organizationId);
        }
    }, [isOpen, user]);

    useEffect(() => {
      // If organization changes while modal is open, reset shop selections if the new org is different.
      // This is primarily for Admins changing a user's organization.
      if (organizationId !== user.organizationId) {
        setSelectedShopIds([]);
      }
    }, [organizationId, user.organizationId]);

    const handleSave = () => {
        if (role !== 'Admin' && !organizationId) {
            alert('Debes seleccionar una organización para este rol.');
            return;
        }

        const updatedUser = { 
            ...user, 
            name, 
            email, 
            role, 
            status, 
            shopIds: (role === 'Vendedor' || role === 'Editor') ? selectedShopIds : [],
            organizationId: role !== 'Admin' ? organizationId : undefined
        };
        onUserUpdate(updatedUser);
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Editar Usuario</DialogTitle>
                    <DialogDescription>Realiza cambios en los detalles del usuario.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-name-edit" className="text-right">Nombre</Label>
                        <Input id="user-name-edit" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-email-edit" className="text-right">Email</Label>
                        <Input id="user-email-edit" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-role-edit" className="text-right">Rol</Label>
                        <Select value={role} onValueChange={(value: AppUser['role']) => setRole(value)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableRoles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    {currentUser?.role === 'Admin' && role !== 'Admin' && (
                         <div className="grid grid-cols-4 items-center gap-4">
                             <Label htmlFor="user-org-edit" className="text-right">Organización</Label>
                             <Select value={organizationId} onValueChange={setOrganizationId}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Selecciona una organización" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allOrganizations.map(org => <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                         </div>
                    )}

                     {(role === 'Vendedor' || role === 'Editor') && (
                       <div className="grid grid-cols-4 items-start gap-4">
                          <Label className="text-right pt-2">Tiendas</Label>
                          <ShopSelector allShops={assignableShops} selectedShopIds={selectedShopIds} onChange={setSelectedShopIds} disabled={currentUser?.role !== 'Admin' && currentUser?.role !== 'Editor'} />
                        </div>
                    )}
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="user-status-edit" className="text-right">Estatus</Label>
                        <Select value={status} onValueChange={(value: AppUser['status']) => setStatus(value)}>
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

function ShopSelector({allShops, selectedShopIds, onChange, disabled = false}: {allShops: Shop[], selectedShopIds: string[], onChange: (ids: string[]) => void, disabled?: boolean}) {
    
    const handleShopToggle = (shopId: string) => {
        onChange(
            selectedShopIds.includes(shopId)
                ? selectedShopIds.filter(id => id !== shopId)
                : [...selectedShopIds, shopId]
        );
    }
    
    return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="col-span-3 w-full justify-start text-left font-normal" disabled={disabled}>
                     <Store className="mr-2 h-4 w-4" />
                    {selectedShopIds.length > 0 ? `${selectedShopIds.length} tienda(s) seleccionada(s)`: 'Seleccionar tiendas'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <ScrollArea className="h-48">
                    {allShops.map(shop => (
                        <DropdownMenuItem key={shop.id} onSelect={(e) => e.preventDefault()}>
                            <Checkbox
                                id={`shop-${shop.id}-${Math.random()}`}
                                checked={selectedShopIds.includes(shop.id)}
                                onCheckedChange={() => handleShopToggle(shop.id)}
                                className="mr-2"
                            />
                            <Label htmlFor={`shop-${shop.id}-${Math.random()}`} className="flex-1 cursor-pointer">{shop.name}</Label>
                        </DropdownMenuItem>
                    ))}
                     {allShops.length === 0 && <DropdownMenuItem disabled>No hay tiendas disponibles.</DropdownMenuItem>}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function DeleteUserAlert({ userId, onUserDelete, children }: { userId: string, onUserDelete: (userId: string) => void, children: React.ReactNode }) {
    const handleDelete = () => {
        onUserDelete(userId);
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario.
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

    