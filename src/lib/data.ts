import { Shirt, Laptop, Cookie, BookOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageSrc: string;
  imageHint: string;
  stock: number;
  status: 'activo' | 'inactivo';
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
    name: 'Hilos Urbanos',
    specialization: 'Ropa Moderna',
    logoSrc: 'https://picsum.photos/seed/shop1/400/400',
    logoHint: 'tienda de ropa',
    icon: Shirt,
    inventory: [
      {
        id: 'p1',
        name: 'Camiseta Clásica de Algodón',
        description: 'Una camiseta cómoda y elegante para el día a día.',
        price: 24.99,
        imageSrc: 'https://picsum.photos/seed/prod1/400/300',
        imageHint: 'camiseta',
        stock: 50,
        status: 'activo',
      },
      {
        id: 'p2',
        name: 'Vaqueros Slim Fit',
        description: 'Vaqueros duraderos y a la moda que sientan genial.',
        price: 79.99,
        imageSrc: 'https://picsum.photos/seed/prod2/400/300',
        imageHint: 'vaqueros',
        stock: 25,
        status: 'activo',
      },
      {
        id: 'p3',
        name: 'Sudadera con Capucha Gráfica',
        description: 'Sudadera cálida y elegante con un diseño único.',
        price: 59.99,
        imageSrc: 'https://picsum.photos/seed/prod9/400/300',
        imageHint: 'sudadera',
        stock: 0,
        status: 'inactivo',
      },
    ],
  },
  {
    id: '2',
    name: 'Refugio Tecnológico',
    specialization: 'Electrónica de Vanguardia',
    logoSrc: 'https://picsum.photos/seed/shop2/400/400',
    logoHint: 'tienda de electrónica',
    icon: Laptop,
    inventory: [
      {
        id: 'p4',
        name: 'UltraBook Pro',
        description: 'Portátil potente y ligero para profesionales.',
        price: 1299.99,
        imageSrc: 'https://picsum.photos/seed/prod3/400/300',
        imageHint: 'portátil',
        stock: 10,
        status: 'activo',
      },
      {
        id: 'p5',
        name: 'Teléfono Galaxy X',
        description: 'El último smartphone con una pantalla impresionante.',
        price: 999.99,
        imageSrc: 'https://picsum.photos/seed/prod4/400/300',
        imageHint: 'smartphone',
        stock: 0,
        status: 'activo',
      },
      {
        id: 'p6',
        name: 'Auriculares Inalámbricos',
        description: 'Audio nítido sin ataduras.',
        price: 149.99,
        imageSrc: 'https://picsum.photos/seed/prod10/400/300',
        imageHint: 'auriculares',
        stock: 100,
        status: 'inactivo',
      },
    ],
  },
  {
    id: '3',
    name: 'El Pan de Cada Día',
    specialization: 'Panadería Artesanal',
    logoSrc: 'https://picsum.photos/seed/shop3/400/400',
    logoHint: 'panadería',
    icon: Cookie,
    inventory: [
      {
        id: 'p7',
        name: 'Croissant de Mantequilla',
        description: 'Hojaldrado, mantecoso y recién horneado a diario.',
        price: 3.5,
        imageSrc: 'https://picsum.photos/seed/prod5/400/300',
        imageHint: 'croissant',
        stock: 200,
        status: 'activo',
      },
      {
        id: 'p8',
        name: 'Cupcake de Terciopelo',
        description: 'Un capricho decadente con un rico glaseado de queso crema.',
        price: 4.75,
        imageSrc: 'https://picsum.photos/seed/prod6/400/300',
        imageHint: 'cupcake',
        stock: 75,
        status: 'activo',
      },
       {
        id: 'p9',
        name: 'Hogaza de Masa Madre',
        description: 'Pan artesano de masa madre con una corteza crujiente.',
        price: 8.00,
        imageSrc: 'https://picsum.photos/seed/prod11/400/300',
        imageHint: 'pan',
        stock: 30,
        status: 'activo',
      },
    ],
  },
  {
    id: '4',
    name: 'El Rincón del Libro',
    specialization: 'Literatura Selecta',
    logoSrc: 'https://picsum.photos/seed/shop4/400/400',
    logoHint: 'librería',
    icon: BookOpen,
    inventory: [
      {
        id: 'p10',
        name: "El Heredero del Dragón",
        description: 'Una novela épica de fantasía, magia y aventura.',
        price: 18.99,
        imageSrc: 'https://picsum.photos/seed/prod7/400/300',
        imageHint: 'libro',
        stock: 40,
        status: 'activo',
      },
      {
        id: 'p11',
        name: 'Deriva Cósmica',
        description: 'Una emocionante historia de ciencia ficción en el espacio profundo.',
        price: 16.99,
        imageSrc: 'https://picsum.photos/seed/prod8/400/300',
        imageHint: 'libro espacio',
        stock: 15,
        status: 'activo',
      },
       {
        id: 'p12',
        name: 'Misterio en la Mansión',
        description: 'Un clásico de misterio que te mantendrá en vilo.',
        price: 14.50,
        imageSrc: 'https://picsum.photos/seed/prod12/400/300',
        imageHint: 'libro de misterio',
        stock: 0,
        status: 'inactivo',
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
