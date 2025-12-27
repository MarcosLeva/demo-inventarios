
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, X } from 'lucide-react';
import type { ProductProperty } from '@/lib/data';

export function DynamicPropertiesEditor({ properties, setProperties }: { properties: ProductProperty[], setProperties: (properties: ProductProperty[]) => void }) {
    
    const handleKeyChange = (index: number, newKey: string) => {
        const newProps = [...properties];
        newProps[index] = { ...newProps[index], key: newKey };
        setProperties(newProps);
    };

    const handleValueChange = (index: number, newValue: string) => {
        const newProps = [...properties];
        newProps[index] = { ...newProps[index], value: newValue };
        setProperties(newProps);
    };
    
    const addProperty = () => {
        setProperties([...properties, { key: '', value: '' }]);
    };

    const removeProperty = (index: number) => {
        const newProps = properties.filter((_, i) => i !== index);
        setProperties(newProps);
    };

    return (
        <div className="space-y-4">
            {properties.map((prop, index) => (
                <div key={index} className="flex gap-2 items-center">
                    <Input
                        placeholder="Nombre (ej. Talla)"
                        value={prop.key}
                        onChange={(e) => handleKeyChange(index, e.target.value)}
                        className="flex-1"
                        disabled={prop.key === 'Descripción'}
                    />
                    <Textarea
                        placeholder="Valor (ej. M)"
                        value={prop.value}
                        onChange={(e) => handleValueChange(index, e.target.value)}
                        className="flex-1"
                        rows={1}
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeProperty(index)} disabled={prop.key === 'Descripción'}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button variant="outline" size="sm" onClick={addProperty}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Propiedad
            </Button>
        </div>
    );
}
