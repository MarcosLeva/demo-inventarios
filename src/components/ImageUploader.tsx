
'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon, Upload, X } from 'lucide-react';

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

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveImage = () => {
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const isDataUrl = value && value.startsWith('data:');
    const isHttpUrl = value && (value.startsWith('http:') || value.startsWith('https:'));

    return (
        <div className="w-full space-y-2 rounded-md border p-4">
            <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <Input 
                    id="shop-image-url" 
                    value={isHttpUrl ? value : ''}
                    onChange={(e) => onChange(e.target.value)} 
                    placeholder="Pega la URL de una imagen"
                    disabled={isDataUrl}
                />
            </div>

            <div className="relative flex items-center justify-center">
                <div className="flex-grow border-t border-muted"></div>
                <span className="mx-2 shrink text-xs uppercase text-muted-foreground">O</span>
                <div className="flex-grow border-t border-muted"></div>
            </div>
            
            <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                disabled={isHttpUrl && !!value}
            />
            <Button variant="outline" className="w-full" onClick={handleUploadClick} disabled={isHttpUrl && !!value}>
                <Upload className="mr-2 h-4 w-4" />
                Subir un archivo
            </Button>
            
            {(isDataUrl || isHttpUrl) && (
                 <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive" onClick={handleRemoveImage}>
                    <X className="mr-2 h-4 w-4" />
                    Quitar imagen
                </Button>
            )}
        </div>
    );
}
