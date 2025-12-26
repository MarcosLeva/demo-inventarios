'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOrganizationById, getShops, getUsers } from '@/lib/data';
import type { Organization, AppUser, Shop } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Building, Users, Store, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

const ITEMS_PER_PAGE = 5;

export default function OrganizationDetailPage() {
  const params = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const router = useRouter();

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<AppUser[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.role !== 'Admin') {
      router.push('/');
      return;
    }
    fetchData();
  }, [currentUser, params.id]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      const org = getOrganizationById(params.id, currentUser);
      if (!org) {
        setLoading(false);
        return;
      }
      const allUsers = getUsers(currentUser);
      const allShops = getShops(currentUser);

      setOrganization(org);
      setMembers(allUsers.filter(u => org.userIds.includes(u.id)));
      setShops(allShops.filter(s => s.organizationId === org.id));
      setLoading(false);
    }, 500);
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UsersTable members={members} getInitials={getInitials} />
        <ShopsTable shops={shops} />
      </div>
    </div>
  );
}

function UsersTable({ members, getInitials }: { members: AppUser[], getInitials: (name: string) => string }) {
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

function ShopsTable({ shops }: { shops: Shop[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredShops = useMemo(() => {
        return shops.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [shops, searchTerm]);

    const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
    const paginatedShops = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredShops.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredShops, currentPage]);

    return (
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Store /> Tiendas</CardTitle>
                <CardDescription>Tiendas que pertenecen a esta organización.</CardDescription>
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
                            <TableHead>Especialización</TableHead>
                            <TableHead>Estatus</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {paginatedShops.length > 0 ? paginatedShops.map(shop => (
                            <TableRow key={shop.id}>
                                <TableCell className="font-medium">
                                    <Link href={`/shop/${shop.id}`} className="hover:underline">{shop.name}</Link>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{shop.specialization}</TableCell>
                                <TableCell>
                                    <Badge variant={shop.status === 'activo' ? 'secondary' : 'destructive'}>{shop.status}</Badge>
                                </TableCell>
                            </TableRow>
                         )) : (
                             <TableRow>
                                <TableCell colSpan={3} className="text-center h-24">No se encontraron tiendas.</TableCell>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                       <Skeleton className="h-5 w-32" />
                       <Skeleton className="h-5 w-16" />
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
