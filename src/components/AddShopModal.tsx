
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import type { Shop, IconMap, IconName, AppUser, Organization } from '@/lib/data';
import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image as ImageIcon, Upload, Users } from 'lucide-react';
import Image from 'next/image';
import { icons } from '@/lib/data';

function ImageUploader({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="upload">Subir</TabsTrigger>
            </TabsList>
            <TabsContent value="url">
                <div className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <Input id="shop-image-url" value={value.startsWith('data:') ? '' : value} onChange={(e) => onChange(e.target.value)} placeholder="https://ejemplo.com/logo.png" />
                </div>
            </TabsContent>
            <TabsContent value="upload">
                <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
                <Button variant="outline" className="w-full" onClick={handleButtonClick}>
                    <Upload className="mr-2 h-4 w-4" />
                    Seleccionar Archivo
                </Button>
            </TabsContent>
        </Tabs>
    );
}

function UserSelector({allUsers, selectedUserIds, onChange, disabled = false}: {allUsers: AppUser[], selectedUserIds: string[], onChange: (ids: string[]) => void, disabled?: boolean}) {
    
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
                <Button variant="outline" className="w-full justify-start text-left font-normal" disabled={disabled}>
                    <Users className="mr-2" />
                    {selectedUserIds.length > 0 ? `${selectedUserIds.length} usuario(s) seleccionado(s)`: 'Seleccionar usuarios'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                <ScrollArea className="h-48">
                    {allUsers.map(user => (
                        <DropdownMenuItem key={user.id} onSelect={(e) => e.preventDefault()}>
                            <Checkbox
                                id={`user-selector-${user.id}-${Math.random()}`}
                                checked={selectedUserIds.includes(user.id)}
                                onCheckedChange={() => handleUserToggle(user.id)}
                                className="mr-2"
                            />
                            <Label htmlFor={`user-selector-${user.id}-${Math.random()}`} className="flex-1 cursor-pointer">{user.name} ({user.role})</Label>
                        </DropdownMenuItem>
                    ))}
                    {allUsers.length === 0 && <DropdownMenuItem disabled>No hay usuarios disponibles.</DropdownMenuItem>}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export function AddShopModal({ onShopAdd, allUsers, allOrganizations, currentUser, children, defaultOrganizationId }: { onShopAdd: (shop: Omit<Shop, 'id' | 'inventory'>, assignedUserIds: string[]) => void, allUsers: AppUser[], allOrganizations: Organization[], currentUser: AppUser | null, children: React.ReactNode, defaultOrganizationId?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [logoSrc, setLogoSrc] = useState('https://picsum.photos/seed/newshop/400/400');
    const [iconName, setIconName] = useState<IconName>('Shirt');
    const [status, setStatus] = useState<'activo' | 'inactivo'>('activo');
    const [assignedUserIds, setAssignedUserIds] = useState<string[]>([]);
    const [organizationId, setOrganizationId] = useState<string | undefined>(defaultOrganizationId ?? (currentUser?.role === 'Editor' ? currentUser.organizationId : undefined));

    const assignableUsers = useMemo(() => {
      const orgId = defaultOrganizationId ?? (currentUser?.role === 'Editor' ? currentUser.organizationId : organizationId);
      if (!orgId) return [];
      return allUsers.filter(u => u.role === 'Vendedor' && u.organizationId === orgId);
    }, [allUsers, organizationId, currentUser, defaultOrganizationId]);

    useEffect(() => {
        if (isOpen) {
            // Reset form
            setName('');
            setSpecialization('');
            setLogoSrc('https://picsum.photos/seed/newshop/400/400');
            setIconName('Shirt');
            setStatus('activo');
            setAssignedUserIds([]);
            
            if (defaultOrganizationId) {
                 setOrganizationId(defaultOrganizationId);
            } else if (currentUser?.role === 'Editor') {
                setOrganizationId(currentUser.organizationId);
            } else {
                setOrganizationId(undefined);
            }
        }
    }, [currentUser, isOpen, defaultOrganizationId]);

    const handleSave = () => {
        if (!name || !specialization || !iconName || !organizationId) {
            alert('Por favor completa todos los campos requeridos, incluyendo la organización.');
            return;
        }

        onShopAdd({
            name,
            specialization,
            logoSrc,
            logoHint: `${name} ${specialization}`,
            icon: iconName,
            status,
            organizationId,
        }, assignedUserIds);

        setIsOpen(false);
    };

    const IconPreview = icons[iconName] || null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Agregar Nueva Tienda</DialogTitle>
                    <DialogDescription>Completa los detalles para crear una nueva tienda.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    {currentUser?.role === 'Admin' && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="shop-organization" className="text-right">Organización</Label>
                             <Select value={organizationId} onValueChange={(value) => setOrganizationId(value)} disabled={!!defaultOrganizationId}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Selecciona una organización" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allOrganizations.map(org => (
                                        <SelectItem key={org.id} value={org.id}>
                                            {org.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shop-name" className="text-right">Nombre</Label>
                        <Input id="shop-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shop-specialization" className="text-right">Especialización</Label>
                        <Input id="shop-specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shop-icon" className="text-right">Icono</Label>
                        <div className="col-span-3 flex items-center gap-2">
                             <Select value={iconName} onValueChange={(value: IconName) => setIconName(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un icono" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(icons).map(key => {
                                        const Icon = icons[key as IconName];
                                        return (
                                            <SelectItem key={key} value={key}>
                                               <div className="flex items-center gap-2">
                                                 <Icon className="h-4 w-4" />
                                                 <span>{key}</span>
                                               </div>
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                            {IconPreview && (
                                <div className="bg-accent/10 text-accent p-2 rounded-md">
                                    <IconPreview className="h-6 w-6" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shop-status" className="text-right">Estatus</Label>
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
                    <div className="grid grid-cols-4 items-start gap-4 pt-2">
                        <Label className="text-right pt-2">Logo</Label>
                        <div className="col-span-3">
                            <ImageUploader value={logoSrc} onChange={setLogoSrc} />
                        </div>
                    </div>
                    {logoSrc && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Previsualización</Label>
                            <div className="col-span-3">
                                <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                                    <Image src={logoSrc} alt="Previsualización del logo" fill className="object-cover" sizes="96px" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Asignar Vendedores</Label>
                        <div className="col-span-3">
                            <UserSelector allUsers={assignableUsers} selectedUserIds={assignedUserIds} onChange={setAssignedUserIds} disabled={!organizationId && currentUser?.role !== 'Editor'} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleSave}>Guardar Tienda</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
