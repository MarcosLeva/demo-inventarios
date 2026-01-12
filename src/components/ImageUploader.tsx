
'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image as ImageIcon, Upload } from 'lucide-react';


export function ImageUploader({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeTab, setActiveTab] = useState('url');

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

    const onTabChange = (newTab: string) => {
        setActiveTab(newTab);
        onChange(''); // Reset value when changing tabs to avoid conflicts
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const isDataUrl = value.startsWith('data:');

    return (
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="upload">Subir</TabsTrigger>
            </TabsList>
            <TabsContent value="url">
                <div className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <Input 
                        id="shop-image-url" 
                        value={isDataUrl ? '' : value}
                        onChange={(e) => onChange(e.target.value)} 
                        placeholder="https://ejemplo.com/logo.png"
                        disabled={isDataUrl}
                    />
                </div>
                 {isDataUrl && <p className="text-xs text-muted-foreground mt-2">Para usar una URL, primero quita el archivo subido cambiando de pestaña.</p>}
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
                 {value && !isDataUrl && <p className="text-xs text-muted-foreground mt-2">Para subir un archivo, primero borra la URL.</p>}
            </TabsContent>
        </Tabs>
    );
}
