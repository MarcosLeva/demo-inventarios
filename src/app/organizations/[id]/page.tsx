

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOrganizationById, getShops, getUsers, updateOrganization, assignShopToUsers, addShopAndAssignUsers, addUser } from '@/lib/data';
import type { Organization, AppUser, Shop } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Building, Users, Store, ChevronLeft, ChevronRight, Search, UserPlus, Link as LinkIcon, PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddShopModal } from '@/components/AddShopModal';
import { AddUserModal } from '@/components/UserModals';


const ITEMS_PER_PAGE = 5;

export default function OrganizationDetailPage() {
  const params = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const router = useRouter();

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<AppUser[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);
  const [canManage, setCanManage] = useState(false);


  useEffect(() => {
    if (!currentUser) return;
    
    const canAccess = currentUser.role === 'Admin' || (currentUser.role === 'Editor' && currentUser.organizationId === params.id);

    if (!canAccess) {
      router.push('/');
      return;
    }
    
    setCanManage(canAccess);
    fetchData();
  }, [currentUser, params.id, router]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      const org = getOrganizationById(params.id, currentUser);
      if (!org) {
        setLoading(false);
        return;
      }
      const allUsersData = getUsers(currentUser);
      const allShopsData = getShops(currentUser);

      setOrganization(org);
      setAllUsers(allUsersData);
      setAllOrganizations(org ? [org] : []);
      setMembers(allUsersData.filter(u => org.userIds.includes(u.id)));
      setShops(allShopsData.filter(s => s.organizationId === org.id));
      setLoading(false);
    }, 500);
  };
  
  const handleMembersUpdate = (updatedUserIds: string[]) => {
    if (!organization) return;
    const updatedOrg = { ...organization, userIds: updatedUserIds };
    updateOrganization(updatedOrg);
    fetchData();
  }

  const handleAssignShop = (shopId: string, userIds: string[]) => {
    assignShopToUsers(shopId, userIds);
    fetchData(); 
  }
  
  const handleShopAdd = (newShopData: Omit<Shop, 'id' | 'inventory'>, assignedUserIds: string[]) => {
    if (!currentUser) return;
    addShopAndAssignUsers(newShopData as Omit<Shop, 'id'|'inventory'|'organizationId'> & { organizationId: string }, assignedUserIds, currentUser); 
    fetchData();
  };

  const handleMemberAdd = (newUserData: Omit<AppUser, 'id'>) => {
    if (!currentUser) return;
    addUser(newUserData, currentUser);
    fetchData();
  };

  if (loading) {
    return <OrganizationDetailSkeleton />;
  }

  if (!organization) {
    notFound();
    return null;
  }
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }
  
  const assignableUsersForOrg = allUsers.filter(u => {
      if (currentUser?.role === 'Admin') {
         return u.role !== 'Admin' && (!u.organizationId || u.organizationId === organization.id);
      }
      if (currentUser?.role === 'Editor') {
         return u.organizationId === currentUser.organizationId && u.role !== 'Admin';
      }
      return false;
  });

  return (
    <div className="flex flex-col gap-8">
       <Button asChild variant="ghost" className="self-start">
          <Link href="/organizations" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver a Organizaciones
          </Link>
        </Button>

      <header>
        <div className="flex items-center gap-4">
            <Building className="h-10 w-10 text-primary"/>
            <h1 className="text-4xl font-bold tracking-tight">{organization.name}</h1>
        </div>
        <p className="text-muted-foreground mt-2">
            Gestiona los miembros y tiendas de la organización.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <UsersTable 
                members={members} 
                getInitials={getInitials} 
                organizationId={organization.id} 
                allUsers={assignableUsersForOrg}
                onMembersUpdate={handleMembersUpdate}
                canManage={canManage}
                onMemberAdd={handleMemberAdd}
                currentUser={currentUser}
                allOrganizations={allOrganizations}
                allShops={shops}
            />
        </div>
        <div className="lg:col-span-1">
            <ShopsTable 
                shops={shops} 
                members={members} 
                onAssignShop={handleAssignShop} 
                canManage={canManage} 
                onShopAdd={handleShopAdd}
                allUsers={allUsers}
                allOrganizations={allOrganizations}
                currentUser={currentUser}
                organizationId={organization.id}
            />
        </div>
      </div>
    </div>
  );
}

function UsersTable({ members, getInitials, organizationId, allUsers, onMembersUpdate, canManage, onMemberAdd, currentUser, allOrganizations, allShops }: { members: AppUser[], getInitials: (name: string) => string, organizationId: string, allUsers: AppUser[], onMembersUpdate: (userIds: string[]) => void, canManage: boolean, onMemberAdd: (newUserData: Omit<AppUser, 'id'>) => void, currentUser: AppUser | null, allOrganizations: Organization[], allShops: Shop[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMembers = useMemo(() => {
        return members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [members, searchTerm]);

    const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
    const paginatedMembers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredMembers, currentPage]);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2"><Users /> Miembros</CardTitle>
                        <CardDescription>Usuarios que pertenecen a esta organización.</CardDescription>
                    </div>
                     {canManage && (
                        <div className="flex gap-2">
                            <AddUserModal
                                onUserAdd={onMemberAdd}
                                allShops={allShops}
                                allOrganizations={allOrganizations}
                                currentUser={currentUser}
                                defaultOrganizationId={organizationId}
                            >
                                <Button><UserPlus className="mr-2" /> Agregar Miembro</Button>
                            </AddUserModal>
                            <ManageMembersModal 
                                organizationId={organizationId}
                                allUsers={allUsers}
                                currentMemberIds={members.map(m => m.id)}
                                onUpdate={onMembersUpdate}
                            >
                                <Button variant="outline">Gestionar Miembros</Button>
                            </ManageMembersModal>
                        </div>
                     )}
                </div>
                 <div className="relative pt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar miembro..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Estatus</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedMembers.length > 0 ? paginatedMembers.map(member => (
                            <TableRow key={member.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${member.name}`} alt={member.name} />
                                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{member.name}</div>
                                            <div className="text-xs text-muted-foreground">{member.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell>
                                    <Badge variant={member.status === 'activo' ? 'secondary' : 'destructive'}>{member.status}</Badge>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center h-24">No se encontraron miembros.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 p-4 border-t">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}><ChevronLeft className="h-4 w-4" /></Button>
                    <span className="text-sm text-muted-foreground">{currentPage} / {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}><ChevronRight className="h-4 w-4" /></Button>
                </div>
            )}
        </Card>
    );
}

function ShopsTable({ shops, members, onAssignShop, canManage, onShopAdd, allUsers, allOrganizations, currentUser, organizationId }: { shops: Shop[], members: AppUser[], onAssignShop: (shopId: string, userIds: string[]) => void, canManage: boolean, onShopAdd: (newShopData: Omit<Shop, 'id' | 'inventory'>, assignedUserIds: string[]) => void, allUsers: AppUser[], allOrganizations: Organization[], currentUser: AppUser | null, organizationId: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [assignModalState, setAssignModalState] = useState<{ isOpen: boolean; shop: Shop | null }>({ isOpen: false, shop: null });

    const filteredShops = useMemo(() => {
        return shops.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [shops, searchTerm]);

    const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
    const paginatedShops = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredShops.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredShops, currentPage]);

    const getAssignedUsers = (shopId: string) => {
        return members.filter(m => m.shopIds.includes(shopId));
    }

    return (
        <>
         <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2"><Store /> Tiendas</CardTitle>
                        <CardDescription>Tiendas de esta organización.</CardDescription>
                    </div>
                    {canManage && (
                        <AddShopModal 
                            onShopAdd={onShopAdd} 
                            allUsers={allUsers} 
                            allOrganizations={allOrganizations}
                            currentUser={currentUser}
                            defaultOrganizationId={organizationId}
                        >
                            <Button variant="outline"><PlusCircle className="mr-2" /> Agregar</Button>
                        </AddShopModal>
                    )}
                </div>
                 <div className="relative pt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar tienda..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {paginatedShops.length > 0 ? paginatedShops.map(shop => (
                            <TableRow key={shop.id}>
                                <TableCell>
                                    <div>
                                        <Link href={`/shop/${shop.id}`} className="font-medium hover:underline">{shop.name}</Link>
                                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                                             <Users className="h-3 w-3 mr-1" />
                                            {getAssignedUsers(shop.id).length} usuario(s)
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                     {canManage && (
                                        <Button variant="ghost" size="icon" onClick={() => setAssignModalState({ isOpen: true, shop: shop })}>
                                            <LinkIcon className="h-4 w-4" />
                                        </Button>
                                     )}
                                </TableCell>
                            </TableRow>
                         )) : (
                             <TableRow>
                                <TableCell colSpan={2} className="text-center h-24">No se encontraron tiendas.</TableCell>
                            </TableRow>
                         )}
                    </TableBody>
                </Table>
            </CardContent>
             {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 p-4 border-t">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}><ChevronLeft className="h-4 w-4" /></Button>
                    <span className="text-sm text-muted-foreground">{currentPage} / {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}><ChevronRight className="h-4 w-4" /></Button>
                </div>
            )}
        </Card>
        {assignModalState.shop && (
             <AssignUsersToShopModal 
                isOpen={assignModalState.isOpen}
                onOpenChange={(isOpen) => setAssignModalState({ isOpen, shop: isOpen ? assignModalState.shop : null })}
                shop={assignModalState.shop} 
                members={members} 
                onAssign={onAssignShop}
            />
        )}
        </>
    );
}

function ManageMembersModal({ organizationId, allUsers, currentMemberIds, onUpdate, children }: { organizationId: string, allUsers: AppUser[], currentMemberIds: string[], onUpdate: (userIds: string[]) => void, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUserIds, setSelectedUserIds] = useState(currentMemberIds);

    useEffect(() => {
        if(isOpen) {
            setSelectedUserIds(currentMemberIds);
        }
    }, [isOpen, currentMemberIds]);

    const handleSave = () => {
        onUpdate(selectedUserIds);
        setIsOpen(false);
    }
    
    const handleUserToggle = (userId: string) => {
        setSelectedUserIds(
            selectedUserIds.includes(userId)
                ? selectedUserIds.filter(id => id !== userId)
                : [...selectedUserIds, userId]
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Gestionar Miembros de la Organización</DialogTitle>
                    <DialogDescription>Selecciona los usuarios que pertenecerán a esta organización.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                     <Label>Usuarios Disponibles</Label>
                    <ScrollArea className="h-64 border rounded-md p-2 mt-2">
                         {allUsers.map(user => (
                            <div key={user.id} className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md">
                                <Checkbox
                                    id={`user-check-${user.id}`}
                                    checked={selectedUserIds.includes(user.id)}
                                    onCheckedChange={() => handleUserToggle(user.id)}
                                />
                                <Label htmlFor={`user-check-${user.id}`} className="flex-1 cursor-pointer">
                                    {user.name} <span className="text-muted-foreground">({user.role})</span>
                                </Label>
                            </div>
                         ))}
                    </ScrollArea>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar Cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function AssignUsersToShopModal({ shop, members, onAssign, isOpen, onOpenChange }: { shop: Shop, members: AppUser[], onAssign: (shopId: string, userIds: string[]) => void, isOpen: boolean, onOpenChange: (open: boolean) => void }) {
    const vendors = useMemo(() => members.filter(m => m.role === 'Vendedor'), [members]);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    
    useEffect(() => {
        if(isOpen) {
            const currentlyAssigned = vendors.filter(v => v.shopIds.includes(shop.id)).map(v => v.id);
            setSelectedUserIds(currentlyAssigned);
        }
    }, [isOpen, shop, vendors]);

    const handleSave = () => {
        onAssign(shop.id, selectedUserIds);
        onOpenChange(false);
    }
    
    const handleUserToggle = (userId: string) => {
        setSelectedUserIds(
            selectedUserIds.includes(userId)
                ? selectedUserIds.filter(id => id !== userId)
                : [...selectedUserIds, userId]
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Asignar Vendedores a {shop.name}</DialogTitle>
                    <DialogDescription>Selecciona los vendedores de la organización para asignarles esta tienda.</DialogDescription>
                </DialogHeader>
                 <div className="py-4">
                     <Label>Vendedores de la Organización</Label>
                    <ScrollArea className="h-64 border rounded-md p-2 mt-2">
                         {vendors.map(user => (
                            <div key={user.id} className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md">
                                <Checkbox
                                    id={`assign-user-${user.id}`}
                                    checked={selectedUserIds.includes(user.id)}
                                    onCheckedChange={() => handleUserToggle(user.id)}
                                />
                                <Label htmlFor={`assign-user-${user.id}`} className="flex-1 cursor-pointer">
                                    {user.name}
                                </Label>
                            </div>
                         ))}
                         {vendors.length === 0 && <p className="text-sm text-muted-foreground p-2">No hay vendedores en esta organización.</p>}
                    </ScrollArea>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar Asignaciones</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


function OrganizationDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      <Skeleton className="h-8 w-48" />

      <header>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-12 w-64" />
        </div>
        <Skeleton className="h-4 w-80 mt-3" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-10 w-full mt-2" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {Array.from({length: 3}).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="h-9 w-9 rounded-full" />
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-10 w-full mt-2" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {Array.from({length: 3}).map((_, i) => (
                        <div key={i} className="flex justify-between">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-16" />
                        </div>
                    ))}
                </div>
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
