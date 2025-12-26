import { Shirt, Laptop, Cookie, BookOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  imageHint: string;
};

export type Shop = {
  id: string;
  name: string;
  specialization: string;
  logoSrc: string;
  logoHint: string;
  icon: LucideIcon;
  inventory: Product[];
};

export const shops: Shop[] = [
  {
    id: '1',
    name: 'Urban Threads',
    specialization: 'Modern Apparel',
    logoSrc: 'https://picsum.photos/seed/shop1/400/400',
    logoHint: 'clothing store',
    icon: Shirt,
    inventory: [
      {
        id: 'p1',
        name: 'Classic Cotton Tee',
        description: 'A comfortable and stylish tee for everyday wear.',
        price: 24.99,
        imageSrc: 'https://picsum.photos/seed/prod1/400/300',
        imageHint: 't-shirt',
      },
      {
        id: 'p2',
        name: 'Slim Fit Denim Jeans',
        description: 'Durable and fashionable jeans that fit just right.',
        price: 79.99,
        imageSrc: 'https://picsum.photos/seed/prod2/400/300',
        imageHint: 'jeans',
      },
      {
        id: 'p3',
        name: 'Graphic Hoodie',
        description: 'Warm and stylish hoodie with a unique design.',
        price: 59.99,
        imageSrc: 'https://picsum.photos/seed/prod9/400/300',
        imageHint: 'hoodie',
      },
    ],
  },
  {
    id: '2',
    name: 'Tech Haven',
    specialization: 'Cutting-Edge Electronics',
    logoSrc: 'https://picsum.photos/seed/shop2/400/400',
    logoHint: 'electronics store',
    icon: Laptop,
    inventory: [
      {
        id: 'p4',
        name: 'UltraBook Pro',
        description: 'Powerful and lightweight laptop for professionals.',
        price: 1299.99,
        imageSrc: 'https://picsum.photos/seed/prod3/400/300',
        imageHint: 'laptop',
      },
      {
        id: 'p5',
        name: 'Galaxy Phone X',
        description: 'The latest smartphone with a stunning display.',
        price: 999.99,
        imageSrc: 'https://picsum.photos/seed/prod4/400/300',
        imageHint: 'smartphone',
      },
      {
        id: 'p6',
        name: 'Wireless Earbuds',
        description: 'Crystal clear audio with no strings attached.',
        price: 149.99,
        imageSrc: 'https://picsum.photos/seed/prod10/400/300',
        imageHint: 'earbuds',
      },
    ],
  },
  {
    id: '3',
    name: 'The Daily Knead',
    specialization: 'Artisanal Bakery',
    logoSrc: 'https://picsum.photos/seed/shop3/400/400',
    logoHint: 'bakery shop',
    icon: Cookie,
    inventory: [
      {
        id: 'p7',
        name: 'Butter Croissant',
        description: 'Flaky, buttery, and freshly baked daily.',
        price: 3.5,
        imageSrc: 'https://picsum.photos/seed/prod5/400/300',
        imageHint: 'croissant',
      },
      {
        id: 'p8',
        name: 'Velvet Cupcake',
        description: 'A decadent treat with rich cream cheese frosting.',
        price: 4.75,
        imageSrc: 'https://picsum.photos/seed/prod6/400/300',
        imageHint: 'cupcake',
      },
       {
        id: 'p9',
        name: 'Sourdough Loaf',
        description: 'Artisan sourdough bread with a crispy crust.',
        price: 8.00,
        imageSrc: 'https://picsum.photos/seed/prod11/400/300',
        imageHint: 'bread',
      },
    ],
  },
  {
    id: '4',
    name: 'The Book Nook',
    specialization: 'Curated Literature',
    logoSrc: 'https://picsum.photos/seed/shop4/400/400',
    logoHint: 'book store',
    icon: BookOpen,
    inventory: [
      {
        id: 'p10',
        name: "The Dragon's Heir",
        description: 'An epic fantasy novel of magic and adventure.',
        price: 18.99,
        imageSrc: 'https://picsum.photos/seed/prod7/400/300',
        imageHint: 'book',
      },
      {
        id: 'p11',
        name: 'Cosmic Drift',
        description: 'A thrilling science fiction story set in deep space.',
        price: 16.99,
        imageSrc: 'https://picsum.photos/seed/prod8/400/300',
        imageHint: 'book space',
      },
       {
        id: 'p12',
        name: 'Mystery of the Manor',
        description: 'A classic whodunit that will keep you guessing.',
        price: 14.50,
        imageSrc: 'https://picsum.photos/seed/prod12/400/300',
        imageHint: 'mystery book',
      },
    ],
  },
];

export function getShops() {
  return shops;
}

export function getShopById(id: string | number) {
  return shops.find((shop) => shop.id === String(id));
}
