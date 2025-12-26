
'use client';

import { useState, useMemo, useEffect } from 'react';
import { getOrganizations, getUsers, addOrganization, updateOrganization } from '@/lib/data';
import type { Organization, AppUser } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, PlusCircle, MoreHorizontal, Edit, ChevronLeft, ChevronRight, Building, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const ORGS_PER_PAGE = 5;

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setOrganizations(getOrganizations(user));
      setAllUsers(getUsers(user));
      setLoading(false);
    }, 500);
  };

  const filteredOrganizations = useMemo(() => {
    setCurrentPage(1);
    return organizations.filter(org =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [organizations, searchTerm]);

  const totalPages = Math.ceil(filteredOrganizations.length / ORGS_PER_PAGE);

  const paginatedOrganizations = useMemo(() => {
    const startIndex = (currentPage - 1) * ORGS_PER_PAGE;
    const endIndex = startIndex + ORGS_PER_PAGE;
    return filteredOrganizations.slice(startIndex, endIndex);
  }, [filteredOrganizations, currentPage]);


  const handleAddOrganization = (name: string, userIds: string[]) => {
    addOrganization(name, userIds);
    fetchData();
  };

  const handleUpdateOrganization = (updatedOrg: Organization) => {
    updateOrganization(updatedOrg);
    fetchData();
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Organizaciones</h1>
            <p className="text-muted-foreground">
              Crea y gestiona las organizaciones y sus miembros.
            </p>
        </div>
         <AddOrgModal onSave={handleAddOrganization} allUsers={allUsers}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Organización
          </Button>
        </AddOrgModal>
      </header>
      
      <Card>
        <CardHeader>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Buscar por nombre..."
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
                <TableHead>Miembros</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: ORGS_PER_PAGE }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                ))
              ) : paginatedOrganizations.length > 0 ? (
                paginatedOrganizations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Building className="h-5 w-5 text-muted-foreground" />
                            <span>{org.name}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <UserAvatars userIds={org.userIds} allUsers={allUsers} />
                    </TableCell>
                    <TableCell className="text-right">
                        <EditOrgModal organization={org} onSave={handleUpdateOrganization} allUsers={allUsers}>
                            <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Editar</span>
                            </Button>
                        </EditOrgModal>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No se encontraron organizaciones.
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

const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
}

function UserAvatars({ userIds, allUsers }: { userIds: string[], allUsers: AppUser[] }) {
    const orgUsers = userIds.map(id => allUsers.find(u => u.id === id)).filter(Boolean) as AppUser[];

    return (
        <div className="flex items-center">
            {orgUsers.slice(0, 5).map(u => (
                 <Avatar key={u.id} className="h-8 w-8 border-2 border-background -ml-2 first:ml-0">
                    <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${u.name}`} alt={u.name} />
                    <AvatarFallback>{getInitials(u.name)}</AvatarFallback>
                </Avatar>
            ))}
            {orgUsers.length > 5 && (
                <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center -ml-2">
                    <span className="text-xs font-bold">+{orgUsers.length - 5}</span>
                </div>
            )}
            {orgUsers.length === 0 && <span className="text-xs text-muted-foreground">Sin miembros</span>}
        </div>
    )
}

function AddOrgModal({ onSave, allUsers, children }: { onSave: (name: string, userIds: string[]) => void, allUsers: AppUser[], children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    const assignableUsers = allUsers.filter(u => u.role !== 'Admin' && !u.organizationId);

    const handleSave = () => {
        if (!name) {
            alert('Por favor, ingresa un nombre para la organización.');
            return;
        }
        onSave(name, selectedUserIds);
        setIsOpen(false);
        setName('');
        setSelectedUserIds([]);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar Nueva Organización</DialogTitle>
                    <DialogDescription>Completa los detalles para crear una nueva organización.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="org-name-add" className="text-right">Nombre</Label>
                        <Input id="org-name-add" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Asignar Miembros</Label>
                        <div className="col-span-3">
                            <UserSelector allUsers={assignableUsers} selectedUserIds={selectedUserIds} onChange={setSelectedUserIds} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                    <Button onClick={handleSave}>Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function EditOrgModal({ organization, onSave, allUsers, children }: { organization: Organization, onSave: (org: Organization) => void, allUsers: AppUser[], children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(organization.name);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>(organization.userIds);

    const assignableUsers = allUsers.filter(u => u.role !== 'Admin' && (!u.organizationId || u.organizationId === organization.id));

    useEffect(() => {
        if (isOpen) {
            setName(organization.name);
            setSelectedUserIds(organization.userIds);
        }
    }, [isOpen, organization]);

    const handleSave = () => {
        if (!name) return;
        onSave({ ...organization, name, userIds: selectedUserIds });
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Organización</DialogTitle>
                </DialogHeader>
                 <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="org-name-edit" className="text-right">Nombre</Label>
                        <Input id="org-name-edit" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Miembros</Label>
                        <div className="col-span-3">
                            <UserSelector allUsers={assignableUsers} selectedUserIds={selectedUserIds} onChange={setSelectedUserIds} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                    <Button onClick={handleSave}>Guardar Cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function UserSelector({allUsers, selectedUserIds, onChange}: {allUsers: AppUser[], selectedUserIds: string[], onChange: (ids: string[]) => void}) {
    
    const handleUserToggle = (userId: string) => {
        onChange(
            selectedUserIds.includes(userId)
                ? selectedUserIds.filter(id => id !== userId)
                : [...selectedUserIds, userId]
        );
    }
    
    return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <User className="mr-2 h-4 w-4" />
                    {selectedUserIds.length > 0 ? `${selectedUserIds.length} miembro(s) seleccionado(s)`: 'Seleccionar miembros'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <ScrollArea className="h-48">
                    {allUsers.map(user => (
                        <DropdownMenuItem key={user.id} onSelect={(e) => e.preventDefault()}>
                            <Checkbox
                                id={`org-user-${user.id}`}
                                checked={selectedUserIds.includes(user.id)}
                                onCheckedChange={() => handleUserToggle(user.id)}
                                className="mr-2"
                            />
                            <Label htmlFor={`org-user-${user.id}`} className="flex-1 cursor-pointer">
                                {user.name} <span className="text-muted-foreground text-xs">({user.role})</span>
                            </Label>
                        </DropdownMenuItem>
                    ))}
                    {allUsers.length === 0 && <DropdownMenuItem disabled>No hay usuarios para asignar.</DropdownMenuItem>}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

