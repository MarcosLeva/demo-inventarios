
'use client';

import { useState, useMemo, useEffect } from 'react';
import { getOrganizations, addOrganization, updateOrganization, getUsers } from '@/lib/data';
import type { Organization, AppUser } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, PlusCircle, Search, ChevronLeft, ChevronRight, Edit, Users, ArrowRight } from 'lucide-react';
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

const ORGS_PER_PAGE = 10;

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (user?.role !== 'Admin') {
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


  if (!user || user.role !== 'Admin') {
    return <div className="flex items-center justify-center h-full">Acceso denegado.</div>;
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
            {loading ? (
                Array.from({length: 6}).map((_, i) => <OrganizationCardSkeleton key={i}/>)
            ): (
                paginatedOrgs.map(org => (
                    <OrganizationCard key={org.id} org={org} onOrgUpdate={handleOrgUpdate} getUserById={getUserById} />
                ))
            )}
             {!loading && paginatedOrgs.length === 0 && (
                <div className="col-span-full text-center py-10">
                    <p>No se encontraron organizaciones.</p>
                </div>
             )}
          </div>
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

function OrganizationCard({ org, onOrgUpdate, getUserById }: { org: Organization, onOrgUpdate: (org: Organization) => void, getUserById: (id: string) => AppUser | undefined }) {
  const [name, setName] = useState(org.name);

  const handleNameUpdate = () => {
    onOrgUpdate({...org, name});
  };

  return (
    <Card className="flex flex-col group">
      <CardHeader className="flex-grow">
          <CardTitle className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                  <Building className="text-primary" />
                   <EditableOrgName name={org.name} onUpdate={handleNameUpdate} />
              </span>
          </CardTitle>
          <CardDescription>{org.userIds.length} miembro(s)</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
          <p className="font-semibold text-sm mb-2">Miembros:</p>
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
          <Button asChild variant="outline" className="w-full">
              <Link href={`/organizations/${org.id}`}>
                  Gestionar Organización <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
          </Button>
      </div>
    </Card>
  )
}

function EditableOrgName({ name, onUpdate }: { name: string, onUpdate: (newName: string) => void}) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentName, setCurrentName] = useState(name);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleBlur = () => {
        setIsEditing(false);
        if (currentName !== name) {
            onUpdate(currentName);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            inputRef.current?.blur();
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
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="text-2xl font-semibold leading-none tracking-tight h-auto p-0 border-0 focus-visible:ring-0"
            />
        );
    }

    return (
        <span onClick={() => setIsEditing(true)} className="cursor-pointer hover:bg-muted p-1 rounded-md">
            {name}
        </span>
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
