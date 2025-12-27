
'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image as ImageIcon, Upload } from 'lucide-react';


export function ImageUploader({ value, onChange }: { value: string, onChange: (value: string) => void }) {
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
