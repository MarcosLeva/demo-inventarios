import { getShopById } from '@/lib/data';
import type { Product } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ShopPage({ params }: { params: { id: string } }) {
  const shop = getShopById(params.id);

  if (!shop) {
    notFound();
  }

  const Icon = shop.icon;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to all shops
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 p-6 bg-card rounded-lg border shadow-sm">
        <div className="relative h-32 w-32 rounded-full overflow-hidden shrink-0 border-4 border-background ring-4 ring-primary/20 shadow-md">
            <Image
              src={shop.logoSrc}
              alt={`${shop.name} logo`}
              fill
              className="object-cover"
              data-ai-hint={shop.logoHint}
              sizes="128px"
            />
        </div>
        <div>
            <div className="flex items-center gap-3 mb-2">
                 <div className="bg-accent/10 text-accent p-3 rounded-lg">
                    <Icon className="h-8 w-8" />
                 </div>
                 <h1 className="text-4xl font-bold tracking-tight font-headline text-foreground sm:text-5xl">
                    {shop.name}
                 </h1>
            </div>
          <p className="text-lg text-muted-foreground ml-1">{shop.specialization}</p>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold font-headline mb-8">Inventory</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {shop.inventory.length > 0 ? (
          shop.inventory.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-muted-foreground col-span-full">This shop's inventory is currently empty.</p>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const formatPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <Card className="overflow-hidden flex flex-col h-full group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            data-ai-hint={product.imageHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <CardTitle className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-4 flex-grow">{product.description}</CardDescription>
        <div className="flex justify-between items-center mt-auto pt-4 border-t">
          <p className="text-lg font-semibold text-primary flex items-center gap-1.5">
            <Tag className="h-4 w-4 text-primary/80" />
            {formatPrice}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
