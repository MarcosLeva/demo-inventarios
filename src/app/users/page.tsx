
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { getUsers, getShops, getOrganizations, addUser, updateUser, deleteUser } from '@/lib/data';
import type { AppUser, Shop, Organization } from '@/lib/data';
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
import { Search, PlusCircle, Store, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { AddUserModal, UserActionsCell } from '@/components/UserModals';

const USERS_PER_PAGE = 10;

export default function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers(getUsers(currentUser));
      setShops(getShops(currentUser));
      if (currentUser?.role === 'Admin') {
        setOrganizations(getOrganizations(currentUser));
      } else if (currentUser?.role === 'Editor' && currentUser.organizationId) {
        const org = getOrganizations(currentUser).find(o => o.id === currentUser!.organizationId);
        setOrganizations(org ? [org] : []);
      }
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

  const getOrganizationName = (orgId: string | undefined) => {
    if (!orgId) return 'N/A';
    const org = organizations.find(o => o.id === orgId);
    return org?.name || 'Desconocida';
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
    addUser(newUser, currentUser);
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
        <AddUserModal onUserAdd={handleAddUser} allShops={shops} allOrganizations={organizations} currentUser={currentUser}>
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
                <TableHead>Organización</TableHead>
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
                     <TableCell>{user.role !== 'Admin' ? getOrganizationName(user.organizationId) : 'N/A'}</TableCell>
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
                            allOrganizations={organizations} 
                            onUserUpdate={handleUpdateUser} 
                            onUserDelete={handleDeleteUser}
                            currentUser={currentUser}
                        />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
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
