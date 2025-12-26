
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { getUsers, addUser, updateUser, deleteUser, getShops } from '@/lib/data';
import type { AppUser, Shop } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, PlusCircle, MoreHorizontal, Edit, Trash2, Store, ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

const USERS_PER_PAGE = 10;

export default function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers(getUsers(currentUser));
      setShops(getShops(currentUser));
      setLoading(false);
    }, 500);
  };
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }

  const filteredUsers = useMemo(() => {
    setCurrentPage(1);
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);


  const handleAddUser = (newUser: Omit<AppUser, 'id'>) => {
    addUser(newUser);
    fetchData();
  };

  const handleUpdateUser = (updatedUser: AppUser) => {
    updateUser(updatedUser);
    fetchData();
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
    fetchData();
  };


  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
            <p className="text-muted-foreground">
              Gestiona los usuarios y sus permisos en el sistema.
            </p>
        </div>
        <AddUserModal onUserAdd={handleAddUser} allShops={shops}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Usuario
          </Button>
        </AddUserModal>
      </header>
      
      <Card>
        <CardHeader>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Buscar por nombre o correo..."
                    className="pl-10 w-full max-w-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Tiendas Asignadas</TableHead>
                <TableHead>Estatus</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: USERS_PER_PAGE }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                        </TableCell>
                        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                ))
              ) : paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                       <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt={user.name} />
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                       </div>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                     <TableCell>
                      {user.shopIds.length > 0 ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-8 px-2">
                                     <Store className="mr-1.5 h-3 w-3" />
                                     <span>{user.shopIds.length} Tienda(s)</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Tiendas Asignadas</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                {user.shopIds.map(id => {
                                    const shop = shops.find(s => s.id === id);
                                    if (!shop) return null;
                                    return (
                                        <DropdownMenuItem key={id} asChild>
                                            <Link href={`/shop/${id}`} className="cursor-pointer">
                                                {shop.name}
                                            </Link>
                                        </DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <span className="text-xs text-muted-foreground">Ninguna</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'activo' ? 'secondary' : 'destructive'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <UserActionsCell 
                            user={user} 
                            allShops={shops} 
                            onUserUpdate={handleUpdateUser} 
                            onUserDelete={handleDeleteUser}
                            currentUser={currentUser}
                        />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No se encontraron usuarios.
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


function UserActionsCell({ user, allShops, onUserUpdate, onUserDelete, currentUser }: { user: AppUser, allShops: Shop[], onUserUpdate: (user: AppUser) => void, onUserDelete: (userId: string) => void, currentUser?: AppUser | null }) {
  if (currentUser?.id === user.id) return null;
  
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
        <EditUserModal user={user} allShops={allShops} onUserUpdate={onUserUpdate}>
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

function AddUserModal({ onUserAdd, allShops, children }: { onUserAdd: (user: Omit<AppUser, 'id'>) => void, allShops: Shop[], children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<AppUser['role']>('Vendedor');
    const [status, setStatus] = useState<AppUser['status']>('activo');
    const [selectedShopIds, setSelectedShopIds] = useState<string[]>([]);

    const handleSave = () => {
        if (!name || !email || !role) {
            alert('Por favor completa todos los campos.');
            return;
        }

        onUserAdd({ name, email, role, status, shopIds: selectedShopIds });
        setIsOpen(false);
        // Reset form
        setName('');
        setEmail('');
        setRole('Vendedor');
        setStatus('activo');
        setSelectedShopIds([]);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
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
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Vendedor">Vendedor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     {role === 'Vendedor' && (
                       <div className="grid grid-cols-4 items-start gap-4">
                          <Label className="text-right pt-2">Tiendas</Label>
                          <ShopSelector allShops={allShops} selectedShopIds={selectedShopIds} onChange={setSelectedShopIds} />
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

function EditUserModal({ user, allShops, onUserUpdate, children }: { user: AppUser, allShops: Shop[], onUserUpdate: (user: AppUser) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState<AppUser['role']>(user.role);
    const [status, setStatus] = useState<AppUser['status']>(user.status);
    const [selectedShopIds, setSelectedShopIds] = useState<string[]>(user.shopIds);

    useEffect(() => {
        if(isOpen) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setStatus(user.status);
            setSelectedShopIds(user.shopIds);
        }
    }, [isOpen, user]);

    const handleSave = () => {
        onUserUpdate({ ...user, name, email, role, status, shopIds: role === 'Vendedor' ? selectedShopIds : [] });
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
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
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Vendedor">Vendedor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     {role === 'Vendedor' && (
                       <div className="grid grid-cols-4 items-start gap-4">
                          <Label className="text-right pt-2">Tiendas</Label>
                          <ShopSelector allShops={allShops} selectedShopIds={selectedShopIds} onChange={setSelectedShopIds} />
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

function ShopSelector({allShops, selectedShopIds, onChange}: {allShops: Shop[], selectedShopIds: string[], onChange: (ids: string[]) => void}) {
    
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
                <Button variant="outline" className="col-span-3 w-full justify-start text-left font-normal">
                     <Store className="mr-2 h-4 w-4" />
                    {selectedShopIds.length > 0 ? `${selectedShopIds.length} tienda(s) seleccionada(s)`: 'Seleccionar tiendas'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <ScrollArea className="h-48">
                    {allShops.map(shop => (
                        <DropdownMenuItem key={shop.id} onSelect={(e) => e.preventDefault()}>
                            <Checkbox
                                id={`shop-${shop.id}`}
                                checked={selectedShopIds.includes(shop.id)}
                                onCheckedChange={() => handleShopToggle(shop.id)}
                                className="mr-2"
                            />
                            <Label htmlFor={`shop-${shop.id}`} className="flex-1 cursor-pointer">{shop.name}</Label>
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

    