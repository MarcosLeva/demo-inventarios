
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { LogIn, ShoppingCart } from 'lucide-react';
import { getUserByEmail } from '@/lib/data';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const user = getUserByEmail(email);

    // For this mock app, we'll just check if a user exists and a password is provided
    if (user && password) { 
      login(user);
      router.push('/');
    } else {
      setError('Credenciales inválidas. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[380px] gap-8">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Bienvenido de Nuevo</h1>
            <p className="text-balance text-muted-foreground">
              Ingresa tus credenciales para acceder al sistema.
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@ejemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input 
                  id="password" 
                  type="password" 
                  required 
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full text-base py-6">
               <LogIn className="mr-2 h-5 w-5" />
              Acceder
            </Button>
          </form>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block h-full">
        <Image
          src="https://picsum.photos/seed/loginpage/1200/1800"
          alt="Imagen de fondo del login"
          fill
          priority
          className="object-cover opacity-30"
          data-ai-hint="warehouse inventory"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 p-12 z-20">
            <div className="flex items-center gap-3 text-foreground">
                <ShoppingCart className="h-10 w-10 text-primary" />
                <h2 className="text-4xl font-bold">Visor de Inventarios</h2>
            </div>
            <p className="text-lg mt-4 max-w-md text-muted-foreground">
                Tu centro de control para la gestión inteligente de inventarios y tiendas.
            </p>
        </div>
      </div>
    </div>
  );
}
