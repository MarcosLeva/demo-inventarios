
'use client';

import { useState, useMemo, useEffect } from 'react';
import React from 'react';
import { getOrganizations, addOrganization, updateOrganization, getUsers, getShops } from '@/lib/data';
import type { Organization, AppUser, Shop } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, PlusCircle, Search, ChevronLeft, ChevronRight, Edit, Users, ArrowRight, Store } from 'lucide-react';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const ORGS_PER_PAGE = 10;

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);
  const [allShops, setAllShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (!user) return;
      if (user.role === 'Editor' && user.organizationId) {
          router.push(`/organizations/${user.organizationId}`);
          return;
      }
      if (user.role !== 'Admin') {
          router.push('/');
          return;
      }
      fetchData();
  }, [user, router]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
        setOrganizations(getOrganizations(user));
        setAllUsers(getUsers(user));
        setAllShops(getShops(user));
        setLoading(false);
    }, 500);
  }

  const handleOrgAdd = (name: string) => {
    addOrganization(name);
    fetchData();
  };

  const handleOrgUpdate = (updatedOrg: Organization) => {
    updateOrganization(updatedOrg);
    fetchData();
  }

  const filteredOrgs = useMemo(() => {
    setCurrentPage(1);
    return organizations.filter(org => org.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [organizations, searchTerm]);

  const totalPages = Math.ceil(filteredOrgs.length / ORGS_PER_PAGE);

  const paginatedOrgs = useMemo(() => {
    const startIndex = (currentPage - 1) * ORGS_PER_PAGE;
    const endIndex = startIndex + ORGS_PER_PAGE;
    return filteredOrgs.slice(startIndex, endIndex);
  }, [filteredOrgs, currentPage]);

  const getUserById = (id: string) => allUsers.find(u => u.id === id);
  const getShopCountByOrgId = (orgId: string) => allShops.filter(s => s.organizationId === orgId).length;


  if (loading || user?.role !== 'Admin') {
      return (
        <div className="flex flex-col gap-4">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Organizaciones</h1>
                    <p className="text-muted-foreground">
                        Crea y gestiona las organizaciones y sus usuarios.
                    </p>
                </div>
            </header>
            <Card>
                <CardHeader>
                    <Skeleton className="h-10 w-full max-w-sm" />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({length: 6}).map((_, i) => <OrganizationCardSkeleton key={i}/>)}
                    </div>
                </CardContent>
            </Card>
        </div>
      );
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizaciones</h1>
          <p className="text-muted-foreground">
            Crea y gestiona las organizaciones y sus usuarios.
          </p>
        </div>
        <AddOrganizationModal onOrgAdd={handleOrgAdd}>
            <Button>
                <PlusCircle className="mr-2" />
                Crear Organización
            </Button>
        </AddOrganizationModal>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedOrgs.map((org, index) => (
                <OrganizationCard 
                  key={org.id} 
                  org={org} 
                  onOrgUpdate={handleOrgUpdate} 
                  getUserById={getUserById}
                  shopCount={getShopCountByOrgId(org.id)}
                  index={index}
                />
            ))}
             {paginatedOrgs.length === 0 && (
                <div className="col-span-full text-center py-10">
                    <p>No se encontraron organizaciones.</p>
                </div>
             )}
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>Página {currentPage} de {totalPages}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

    </div>
  );
}

function OrganizationCard({ org, onOrgUpdate, getUserById, shopCount, index }: { org: Organization, onOrgUpdate: (org: Organization) => void, getUserById: (id: string) => AppUser | undefined, shopCount: number, index: number }) {

  const handleNameUpdate = (newName: string) => {
    onOrgUpdate({...org, name: newName});
  };

  return (
      <Link href={`/organizations/${org.id}`} className="group block h-full">
        <Card 
            className={cn(
                "h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 animate-in fade-in-0 flex flex-col",
            )}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <CardHeader className="p-6">
                <div className="flex items-start gap-4">
                    <div className="bg-accent/10 text-accent p-3 rounded-lg">
                        <Building className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <EditableOrgName name={org.name} onUpdate={handleNameUpdate} />
                        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                            <div className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                <span>{org.userIds.length} miembro(s)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Store className="h-4 w-4" />
                                <span>{shopCount} tienda(s)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-grow">
                <p className="font-semibold text-sm mb-2">Miembros Clave:</p>
                <div className="flex flex-wrap gap-1">
                    {org.userIds.slice(0, 5).map(userId => {
                        const member = getUserById(userId);
                        return member ? <Badge key={userId} variant="secondary">{member.name}</Badge> : null;
                    })}
                    {org.userIds.length > 5 && <Badge variant="outline">+{org.userIds.length - 5} más</Badge>}
                    {org.userIds.length === 0 && <p className="text-xs text-muted-foreground">Sin miembros asignados.</p>}
                </div>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
                <div className="flex justify-end items-center mt-4 pt-4 border-t">
                    <div className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Gestionar <ArrowRight className="h-4 w-4 transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </Card>
      </Link>
  )
}

function EditableOrgName({ name, onUpdate }: { name: string, onUpdate: (newName: string) => void}) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentName, setCurrentName] = useState(name);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (currentName.trim() && currentName !== name) {
            onUpdate(currentName);
        } else {
            setCurrentName(name);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            inputRef.current?.blur();
        } else if (e.key === 'Escape') {
            setCurrentName(name);
            setIsEditing(false);
        }
    };
    
    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditing]);

    if (isEditing) {
        return (
            <Input
                ref={inputRef}
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="text-xl font-bold h-auto p-0 border-0 focus-visible:ring-0"
            />
        );
    }

    return (
        <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-headline mb-0">{name}</h2>
            <Button variant="ghost" size="icon" onClick={handleEditClick} className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit className="h-4 w-4" />
            </Button>
        </div>
    );
}


function OrganizationCardSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
                 <Skeleton className="h-4 w-1/2 mb-3" />
                 <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                 </div>
            </CardContent>
            <div className="p-6 pt-0">
                <Skeleton className="h-10 w-full" />
            </div>
        </Card>
    )
}

function AddOrganizationModal({onOrgAdd, children}: {onOrgAdd: (name: string) => void, children: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');

    const handleSave = () => {
        if(!name) return;
        onOrgAdd(name);
        setName('');
        setIsOpen(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Nueva Organización</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="org-name">Nombre de la Organización</Label>
                    <Input id="org-name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                    <Button onClick={handleSave}>Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

    