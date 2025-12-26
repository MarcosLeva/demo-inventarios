import { getShops } from '@/lib/data';
import type { Shop } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const shops = getShops();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-foreground sm:text-5xl lg:text-6xl">
          Discover Local Shops
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Browse through a curated list of shops and explore their unique inventories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
}

function ShopCard({ shop }: { shop: Shop }) {
  const Icon = shop.icon;
  return (
    <Link href={`/shop/${shop.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-primary/50">
        <CardHeader className="p-0">
          <div className="relative h-40 w-full">
            <Image
              src={shop.logoSrc}
              alt={`${shop.name} logo`}
              fill
              className="object-cover"
              data-ai-hint={shop.logoHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col">
          <div className="flex items-start gap-4">
             <div className="bg-accent/10 text-accent p-3 rounded-lg">
                <Icon className="h-6 w-6" />
             </div>
             <div className="flex-1">
                <h2 className="text-xl font-bold font-headline mb-1">{shop.name}</h2>
                <p className="text-sm text-muted-foreground">{shop.specialization}</p>
             </div>
          </div>
          <div className="flex justify-end items-center mt-6 pt-4 border-t">
            <div className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Inventory <ArrowRight className="h-4 w-4 transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
