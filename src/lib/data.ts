

import { Shirt, Laptop, Cookie, BookOpen, Wrench, Sprout, Dumbbell, Guitar, Dog, Coffee, Pill, Building } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ProductProperty = {
  key: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  properties: ProductProperty[];
  price: number;
  imageSrc: string;
  imageHint: string;
  stock: number;
  status: 'activo' | 'inactivo';
  shopId?: string; // Add shopId to trace back to shop
};

export const icons = {
    Shirt,
    Laptop,
    Cookie,
    BookOpen,
    Wrench,
    Sprout,
    Dumbbell,
    Guitar,
    Dog,
    Coffee,
    Pill,
    Building,
};

export type IconMap = typeof icons;
export type IconName = keyof IconMap;

export type Organization = {
    id: string;
    name: string;
    userIds: string[];
}

export type Shop = {
  id: string;
  name: string;
  specialization: string;
  logoSrc: string;
  logoHint: string;
  bannerSrc: string;
  bannerHint: string;
  icon: IconName;
  inventory: Product[];
  status: 'activo' | 'inactivo';
  organizationId: string;
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Vendedor';
  status: 'activo' | 'inactivo';
  shopIds: string[];
  organizationId?: string;
}

const organizations: Organization[] = [
    { id: 'org-1', name: 'Grupo Moda Central', userIds: ['user-editor-1', 'user-3', 'user-4', 'user-7', 'user-vendedor1', 'user-vendedor5', 'user-vendedor7', 'user-vendedor9', 'user-vendedor10'] },
    { id: 'org-2', name: 'Tech & More Inc.', userIds: ['user-editor-2', 'user-5', 'user-8', 'user-vendedor2', 'user-vendedor6', 'user-vendedor8'] },
    { id: 'org-3', name: 'Delicias Gastronómicas', userIds: ['user-editor-3', 'user-vendedor3'] },
    { id: 'org-4', name: 'Consorcio Literario', userIds: ['user-editor-4', 'user-6', 'user-vendedor4'] },
];

const shops: Shop[] = [
  {
    id: '1',
    name: 'Hilos Urbanos',
    specialization: 'Ropa Moderna',
    logoSrc: 'https://picsum.photos/seed/shop1/400/400',
    logoHint: 'tienda de ropa',
    bannerSrc: 'https://picsum.photos/seed/shop1bg/1200/400',
    bannerHint: 'clothing store interior',
    icon: 'Shirt',
    status: 'activo',
    organizationId: 'org-1',
    inventory: [
      { id: 'p1', name: 'Camiseta Clásica de Algodón', properties: [{key: 'Descripción', value: 'Una camiseta cómoda y elegante para el día a día.'}, {key: 'Talla', value: 'M'}, {key: 'Color', value: 'Blanco'}], price: 24.99, imageSrc: 'https://picsum.photos/seed/prod1/400/300', imageHint: 'camiseta', stock: 50, status: 'activo' },
      { id: 'p2', name: 'Vaqueros Slim Fit', properties: [{key: 'Descripción', value: 'Vaqueros duraderos y a la moda que sientan genial.'}, {key: 'Talla', value: '32'}, {key: 'Color', value: 'Azul Oscuro'}], price: 79.99, imageSrc: 'https://picsum.photos/seed/prod2/400/300', imageHint: 'vaqueros', stock: 25, status: 'activo' },
      { id: 'p3', name: 'Sudadera con Capucha', properties: [{key: 'Descripción', value: 'Cálida y cómoda, perfecta para un look casual.'}, {key: 'Talla', value: 'L'}, {key: 'Color', value: 'Gris'}], price: 59.95, imageSrc: 'https://picsum.photos/seed/prod3/400/300', imageHint: 'sudadera', stock: 30, status: 'activo' },
    ],
  },
  {
    id: '2',
    name: 'Refugio Tecnológico',
    specialization: 'Electrónica de Vanguardia',
    logoSrc: 'https://picsum.photos/seed/shop2/400/400',
    logoHint: 'tienda de electrónica',
    bannerSrc: 'https://picsum.photos/seed/shop2bg/1200/400',
    bannerHint: 'electronics store interior',
    icon: 'Laptop',
    status: 'activo',
    organizationId: 'org-2',
    inventory: [
      { id: 'p4', name: 'UltraBook Pro', properties: [{key: 'Descripción', value: 'Portátil potente y ligero para profesionales.'}, {key: 'Procesador', value: 'Intel Core i7'}, {key: 'RAM', value: '16GB'}], price: 1299.99, imageSrc: 'https://picsum.photos/seed/prod4/400/300', imageHint: 'portátil', stock: 10, status: 'activo' },
      { id: 'p5', name: 'Teléfono Galaxy X', properties: [{key: 'Descripción', value: 'El último smartphone con una pantalla impresionante.'}, {key: 'Almacenamiento', value: '256GB'}, {key: 'Color', value: 'Negro espacial'}], price: 999.99, imageSrc: 'https://picsum.photos/seed/prod5/400/300', imageHint: 'smartphone', stock: 0, status: 'activo' },
      { id: 'p6', name: 'Auriculares Inalámbricos', properties: [{key: 'Descripción', value: 'Sonido cristalino con cancelación de ruido.'}, {key: 'Batería', value: '24 horas'}, {key: 'Color', value: 'Blanco'}], price: 179.00, imageSrc: 'https://picsum.photos/seed/prod6/400/300', imageHint: 'auriculares', stock: 40, status: 'activo' },
    ],
  },
  {
    id: '3',
    name: 'El Pan de Cada Día',
    specialization: 'Panadería Artesanal',
    logoSrc: 'https://picsum.photos/seed/shop3/400/400',
    logoHint: 'panadería',
    bannerSrc: 'https://picsum.photos/seed/shop3bg/1200/400',
    bannerHint: 'bakery interior',
    icon: 'Cookie',
    status: 'activo',
    organizationId: 'org-3',
    inventory: [
      { id: 'p7', name: 'Croissant de Mantequilla', properties: [{key: 'Descripción', value: 'Hojaldrado, mantecoso y recién horneado a diario.'}, {key: 'Alérgenos', value: 'Gluten, Lácteos'}], price: 3.5, imageSrc: 'https://picsum.photos/seed/prod7/400/300', imageHint: 'croissant', stock: 200, status: 'activo' },
      { id: 'p8', name: 'Cupcake de Terciopelo', properties: [{key: 'Descripción', value: 'Un capricho decadente con un rico glaseado de queso crema.'}, {key: 'Alérgenos', value: 'Gluten, Lácteos, Huevos'}], price: 4.75, imageSrc: 'https://picsum.photos/seed/prod8/400/300', imageHint: 'cupcake', stock: 75, status: 'activo' },
      { id: 'p9', name: 'Pan de Masa Madre', properties: [{key: 'Descripción', value: 'Hogaza rústica con una corteza crujiente y miga tierna.'}, {key: 'Ingredientes', value: 'Harina, Agua, Sal'}], price: 6.00, imageSrc: 'https://picsum.photos/seed/prod9/400/300', imageHint: 'pan', stock: 30, status: 'activo' },
    ],
  },
  {
    id: '4',
    name: 'El Rincón del Libro',
    specialization: 'Literatura Selecta',
    logoSrc: 'https://picsum.photos/seed/shop4/400/400',
    logoHint: 'librería',
    bannerSrc: 'https://picsum.photos/seed/shop4bg/1200/400',
    bannerHint: 'bookstore interior',
    icon: 'BookOpen',
    status: 'inactivo',
    organizationId: 'org-4',
    inventory: [
      { id: 'p10', name: "El Heredero del Dragón", properties: [{key: 'Descripción', value: 'Un libro de fantasia.'}, {key: 'Autor', value: 'J.R.R. Tolkien'}, {key: 'Género', value: 'Fantasía'}], price: 18.99, imageSrc: 'https://picsum.photos/seed/prod10/400/300', imageHint: 'libro', stock: 40, status: 'activo' },
      { id: 'p11', name: 'Deriva Cósmica', properties: [{key: 'Descripción', value: 'Un libro de ciencia ficción.'}, {key: 'Autor', value: 'Isaac Asimov'}, {key: 'Género', value: 'Ciencia Ficción'}], price: 16.99, imageSrc: 'https://picsum.photos/seed/prod11/400/300', imageHint: 'libro espacio', stock: 15, status: 'activo' },
      { id: 'p12', name: 'El Misterio de la Calle Sombra', properties: [{key: 'Descripción', value: 'Una novela de misterio apasionante.'}, {key: 'Autor', value: 'Agatha Christie'}, {key: 'Género', value: 'Misterio'}], price: 14.50, imageSrc: 'https://picsum.photos/seed/prod12/400/300', imageHint: 'libro misterio', stock: 22, status: 'inactivo' },
    ],
  },
  {
    id: '5',
    name: 'Autopartes Gohner',
    specialization: 'Refacciones y Accesorios Automotrices',
    logoSrc: 'https://picsum.photos/seed/gohner/400/400',
    logoHint: 'autopartes',
    bannerSrc: 'https://picsum.photos/seed/gohnerbg/1200/400',
    bannerHint: 'auto parts interior',
    icon: 'Wrench',
    status: 'activo',
    organizationId: 'org-2',
    inventory: [
      { id: 'p13', name: 'Filtro de Aceite Gohner G-28', properties: [{key: 'Descripción', value: 'Alta eficiencia para motores a gasolina.'}, {key: 'Compatibilidad', value: 'Modelos 2010-2020'}], price: 12.50, imageSrc: 'https://picsum.photos/seed/prod13/400/300', imageHint: 'filtro aceite', stock: 150, status: 'activo' },
      { id: 'p14', name: 'Juego de Balatas Cerámicas', properties: [{key: 'Descripción', value: 'Frenado silencioso y de alto rendimiento.'}, {key: 'Posición', value: 'Delanteras'}], price: 55.80, imageSrc: 'https://picsum.photos/seed/prod14/400/300', imageHint: 'balatas', stock: 60, status: 'activo' },
    ]
  },
  {
    id: '6',
    name: 'El Jardín Secreto',
    specialization: 'Plantas y Jardinería',
    logoSrc: 'https://picsum.photos/seed/shop6/400/400',
    logoHint: 'jardinería',
    bannerSrc: 'https://picsum.photos/seed/shop6bg/1200/400',
    bannerHint: 'gardening interior',
    icon: 'Sprout',
    status: 'activo',
    organizationId: 'org-1',
    inventory: [
      { id: 'p15', name: 'Orquídea Phalaenopsis', properties: [{key: 'Descripción', value: 'Elegante orquídea de interior, fácil de cuidar.'}, {key: 'Color', value: 'Blanco'}, {key: 'Luz', value: 'Indirecta'}], price: 29.99, imageSrc: 'https://picsum.photos/seed/prod15/400/300', imageHint: 'orquídea', stock: 18, status: 'activo' },
      { id: 'p16', name: 'Kit de Herramientas de Jardín', properties: [{key: 'Descripción', value: 'Set de 3 piezas de acero inoxidable.'}, {key: 'Incluye', value: 'Pala, rastrillo, trasplantador'}], price: 22.50, imageSrc: 'https://picsum.photos/seed/prod16/400/300', imageHint: 'herramientas jardín', stock: 35, status: 'activo' },
    ]
  },
  {
    id: '7',
    name: 'Fuerza & Forma',
    specialization: 'Equipo de Gimnasio',
    logoSrc: 'https://picsum.photos/seed/shop7/400/400',
    logoHint: 'gimnasio',
    bannerSrc: 'https://picsum.photos/seed/shop7bg/1200/400',
    bannerHint: 'gym interior',
    icon: 'Dumbbell',
    status: 'activo',
    organizationId: 'org-2',
    inventory: [
      { id: 'p17', name: 'Juego de Mancuernas Ajustables', properties: [{key: 'Descripción', value: 'Ajustables de 2.5 a 24 kg. Ahorra espacio.'}, {key: 'Material', value: 'Acero'}, {key: 'Unidades', value: 'Par'}], price: 250.00, imageSrc: 'https://picsum.photos/seed/prod17/400/300', imageHint: 'mancuernas', stock: 12, status: 'activo' },
    ]
  },
  {
    id: '8',
    name: 'Acordes y Melodías',
    specialization: 'Instrumentos Musicales',
    logoSrc: 'https://picsum.photos/seed/shop8/400/400',
    logoHint: 'tienda de música',
    bannerSrc: 'https://picsum.photos/seed/shop8bg/1200/400',
    bannerHint: 'music store interior',
    icon: 'Guitar',
    status: 'inactivo',
    organizationId: 'org-4',
    inventory: [
      { id: 'p18', name: 'Guitarra Acústica "Trovador"', properties: [{key: 'Descripción', value: 'Ideal para principiantes, con sonido cálido.'}, {key: 'Madera', value: 'Abeto'}, {key: 'Cuerdas', value: 'Nylon'}], price: 120.00, imageSrc: 'https://picsum.photos/seed/prod18/400/300', imageHint: 'guitarra', stock: 8, status: 'activo' },
    ]
  },
  {
    id: '9',
    name: 'La Pata Amiga',
    specialization: 'Suministros para Mascotas',
    logoSrc: 'https://picsum.photos/seed/shop9/400/400',
    logoHint: 'tienda de mascotas',
    bannerSrc: 'https://picsum.photos/seed/shop9bg/1200/400',
    bannerHint: 'pet store interior',
    icon: 'Dog',
    status: 'activo',
    organizationId: 'org-3',
    inventory: [
      { id: 'p19', name: 'Alimento Premium para Perro', properties: [{key: 'Descripción', value: 'Croquetas de salmón para todas las edades.'}, {key: 'Peso', value: '15 kg'}, {key: 'Etapa', value: 'Adulto'}], price: 65.00, imageSrc: 'https://picsum.photos/seed/prod19/400/300', imageHint: 'comida perro', stock: 45, status: 'activo' },
    ]
  },
  {
    id: '10',
    name: 'El Cafetal Despierto',
    specialization: 'Café de Especialidad',
    logoSrc: 'https://picsum.photos/seed/shop10/400/400',
    logoHint: 'cafetería',
    bannerSrc: 'https://picsum.photos/seed/shop10bg/1200/400',
    bannerHint: 'coffee shop interior',
    icon: 'Coffee',
    status: 'activo',
    organizationId: 'org-3',
    inventory: [
      { id: 'p20', name: 'Café en Grano de Chiapas', properties: [{key: 'Descripción', value: 'Notas de chocolate y nuez, tostado medio.'}, {key: 'Origen', value: 'México'}, {key: 'Presentación', value: '1 kg'}], price: 25.00, imageSrc: 'https://picsum.photos/seed/prod20/400/300', imageHint: 'café grano', stock: 100, status: 'activo' },
    ]
  },
  {
    id: '11',
    name: 'Farmacia Bienestar',
    specialization: 'Salud y Cuidado Personal',
    logoSrc: 'https://picsum.photos/seed/shop11/400/400',
    logoHint: 'farmacia',
    bannerSrc: 'https://picsum.photos/seed/shop11bg/1200/400',
    bannerHint: 'pharmacy interior',
    icon: 'Pill',
    status: 'activo',
    organizationId: 'org-4',
    inventory: [
      { id: 'p21', name: 'Vitamina C 1000mg', properties: [{key: 'Descripción', value: 'Suplemento para fortalecer el sistema inmune.'}, {key: 'Contenido', value: '100 tabletas'}, {key: 'Dosis', value: '1 al día'}], price: 15.50, imageSrc: 'https://picsum.photos/seed/prod21/400/300', imageHint: 'vitaminas', stock: 250, status: 'activo' },
    ]
  }
];

const users: AppUser[] = [
    { id: 'user-1', name: 'Admin Principal', email: 'admin@example.com', role: 'Admin', status: 'activo', shopIds: [] },
    { id: 'user-2', name: 'Laura Méndez (Admin)', email: 'laura.mendez@example.com', role: 'Admin', status: 'activo', shopIds: [] },
    
    { id: 'user-editor-1', name: 'Eduardo Manos-Tijeras (Editor)', email: 'editor1@example.com', role: 'Editor', status: 'activo', shopIds: ['1', '6'], organizationId: 'org-1' },
    { id: 'user-editor-2', name: 'Esther Exposito (Editor)', email: 'editor2@example.com', role: 'Editor', status: 'activo', shopIds: ['2', '5', '7'], organizationId: 'org-2' },
    { id: 'user-editor-3', name: 'Gordon Ramsay (Editor)', email: 'editor3@example.com', role: 'Editor', status: 'activo', shopIds: ['3', '9', '10'], organizationId: 'org-3' },
    { id: 'user-editor-4', name: 'Stephen King (Editor)', email: 'editor4@example.com', role: 'Editor', status: 'activo', shopIds: ['4', '8', '11'], organizationId: 'org-4' },
    
    { id: 'user-3', name: 'Carlos Pérez', email: 'carlos.perez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
    { id: 'user-4', name: 'Ana García', email: 'ana.garcia@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['1'], organizationId: 'org-1' },
    { id: 'user-5', name: 'Jorge Martín', email: 'jorge.martin@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['2'], organizationId: 'org-2' },
    { id: 'user-6', name: 'Vendedor Ejemplo', email: 'vendedor@example.com', role: 'Vendedor', status: 'activo', shopIds: ['4'], organizationId: 'org-4' },
    { id: 'user-7', name: 'Sofía Reyes', email: 'sofia.reyes@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
    { id: 'user-8', name: 'Luis Fernández', email: 'luis.fernandez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['2', '5'], organizationId: 'org-2' },
    { id: 'user-vendedor1', name: 'Vendedor 1', email: 'vendedor1@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
    { id: 'user-vendedor2', name: 'Vendedor 2', email: 'vendedor2@example.com', role: 'Vendedor', status: 'activo', shopIds: ['2'], organizationId: 'org-2' },
    { id: 'user-vendedor3', name: 'Vendedor 3', email: 'vendedor3@example.com', role: 'Vendedor', status: 'activo', shopIds: ['3'], organizationId: 'org-3' },
    { id: 'user-vendedor4', name: 'Vendedor 4', email: 'vendedor4@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['4'], organizationId: 'org-4' },
    { id: 'user-vendedor5', name: 'Vendedor 5', email: 'vendedor5@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
    { id: 'user-vendedor6', name: 'Vendedor 6', email: 'vendedor6@example.com', role: 'Vendedor', status: 'activo', shopIds: [], organizationId: 'org-2' },
    { id: 'user-vendedor7', name: 'Vendedor 7', email: 'vendedor7@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
    { id: 'user-vendedor8', name: 'Vendedor 8', email: 'vendedor8@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['2'], organizationId: 'org-2' },
    { id: 'user-vendedor9', name: 'Vendedor 9', email: 'vendedor9@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
    { id: 'user-vendedor10', name: 'Vendedor 10', email: 'vendedor10@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
];

let shopsStore: Shop[] = JSON.parse(JSON.stringify(shops));
let usersStore: AppUser[] = JSON.parse(JSON.stringify(users));
let organizationsStore: Organization[] = JSON.parse(JSON.stringify(organizations));

// --- Organizations ---
export function getOrganizations(user?: AppUser | null): Organization[] {
  if (!user) return [];
  if (user.role === 'Admin') {
    return JSON.parse(JSON.stringify(organizationsStore));
  }
  if (user.role === 'Editor' && user.organizationId) {
    const org = organizationsStore.find(o => o.id === user.organizationId);
    return org ? [JSON.parse(JSON.stringify(org))] : [];
  }
  return [];
}

export function getOrganizationById(id: string, user?: AppUser | null): Organization | undefined {
  if (!user) return undefined;
  const org = organizationsStore.find(o => o.id === id);
  if (!org) return undefined;

  if (user.role === 'Admin') {
    return JSON.parse(JSON.stringify(org));
  }
  if (user.role === 'Editor' && user.organizationId === org.id) {
    return JSON.parse(JSON.stringify(org));
  }
  return undefined;
}

export function addOrganization(name: string) {
    const newOrg: Organization = {
        id: `org-${Date.now()}`,
        name,
        userIds: [],
    };
    organizationsStore.unshift(newOrg);
}

export function updateOrganization(updatedOrg: Organization) {
    const index = organizationsStore.findIndex(org => org.id === updatedOrg.id);
    if (index !== -1) {
        organizationsStore[index] = updatedOrg;
    }
}


// --- Shops ---
export function getShops(user?: AppUser | null): Shop[] {
  if (!user) return [];
  switch (user.role) {
    case 'Admin':
      return JSON.parse(JSON.stringify(shopsStore));
    case 'Editor':
      return JSON.parse(JSON.stringify(shopsStore.filter(shop => shop.organizationId === user.organizationId)));
    case 'Vendedor':
      return JSON.parse(JSON.stringify(shopsStore.filter(shop => user.shopIds.includes(shop.id))));
    default:
      return [];
  }
}

export function getShopById(id: string, user?: AppUser | null): Shop | undefined {
  const shop = shopsStore.find((shop) => shop.id === String(id));
  if (!shop) return undefined;
  
  if (user?.role === 'Admin') {
      return JSON.parse(JSON.stringify(shop));
  }
  if ((user?.role === 'Editor' || user?.role === 'Vendedor') && user.organizationId === shop.organizationId) {
      if (user.role === 'Vendedor' && !user.shopIds.includes(shop.id)) {
        return undefined;
      }
      return JSON.parse(JSON.stringify(shop));
  }
  return undefined;
}


// --- Products ---
export function getAllProducts(user?: AppUser | null) {
    if (!user) return [];
    const allProducts: Product[] = [];
    const shopsToSearch = getShops(user);

    shopsToSearch.forEach(shop => {
        shop.inventory.forEach(product => {
            allProducts.push({
                ...product,
                shopId: shop.id
            });
        });
    });
    return allProducts;
}

// --- Users ---
export function getUsers(user?: AppUser | null): AppUser[] {
    if (!user) return [];
    if (user.role === 'Admin') {
        return JSON.parse(JSON.stringify(usersStore));
    }
    if (user.role === 'Editor') {
        return JSON.parse(JSON.stringify(usersStore.filter(u => u.organizationId === user.organizationId)));
    }
    return [JSON.parse(JSON.stringify(user))];
}

export function getUserByEmail(email: string): AppUser | undefined {
    const user = usersStore.find(user => user.email === email);
    if (!user) return undefined;
    return JSON.parse(JSON.stringify(user));
}

export function addUser(user: Omit<AppUser, 'id'>, currentUser?: AppUser | null) {
    if (!currentUser) return;
    
    const newUser: AppUser = {
        ...user,
        id: `user-${Date.now()}`,
    };

    if (currentUser.role === 'Editor') {
        if (newUser.role === 'Admin') return; // Editors can't create Admins
        newUser.organizationId = currentUser.organizationId;
    }

    if (newUser.organizationId) {
        const org = organizationsStore.find(o => o.id === newUser.organizationId);
        if (org && !org.userIds.includes(newUser.id)) {
            org.userIds.push(newUser.id);
        }
    }
    
    usersStore.unshift(newUser);
}

export function updateUser(updatedUser: AppUser) {
    const index = usersStore.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
        const oldUser = usersStore[index];

        // Handle org change
        if (oldUser.organizationId !== updatedUser.organizationId) {
            // Remove from old org
            const oldOrg = organizationsStore.find(o => o.id === oldUser.organizationId);
            if (oldOrg) {
                oldOrg.userIds = oldOrg.userIds.filter(id => id !== oldUser.id);
            }
            // Add to new org
            const newOrg = organizationsStore.find(o => o.id === updatedUser.organizationId);
             if (newOrg && !newOrg.userIds.includes(updatedUser.id)) {
                newOrg.userIds.push(updatedUser.id);
            }
        }
        
        usersStore[index] = updatedUser;
    }
}

export function deleteUser(userId: string) {
    const user = usersStore.find(u => u.id === userId);
    if (user && user.organizationId) {
        const org = organizationsStore.find(o => o.id === user.organizationId);
        if (org) {
            org.userIds = org.userIds.filter(id => id !== userId);
        }
    }
    usersStore = usersStore.filter(u => u.id !== userId);
}


export function addShop(shopData: Omit<Shop, 'id'|'inventory'>, currentUser: AppUser) {
    const newShop: Shop = {
        ...shopData,
        id: `shop-${Date.now()}`,
        inventory: [],
        organizationId: currentUser.role === 'Editor' ? currentUser.organizationId! : shopData.organizationId,
    };
    shopsStore.unshift(newShop);

    // If editor creates a shop, assign it to them
    if (currentUser.role === 'Editor') {
        const user = usersStore.find(u => u.id === currentUser.id);
        if (user && !user.shopIds.includes(newShop.id)) {
            user.shopIds.push(newShop.id);
        }
    }
}

export function updateShop(updatedShop: Shop) {
    const index = shopsStore.findIndex(shop => shop.id === updatedShop.id);
    if (index !== -1) {
        shopsStore[index] = updatedShop;
    }
}

export function addProduct(shopId: string, product: Omit<Product, 'id' | 'imageHint'>) {
    const shop = shopsStore.find(s => s.id === shopId);
    if (shop) {
        const newProduct: Product = {
            ...product,
            id: `p${Date.now()}`,
            imageSrc: product.imageSrc || `https://picsum.photos/seed/new${Date.now()}/400/300`,
            imageHint: 'nuevo producto',
        };
        shop.inventory.unshift(newProduct);
    }
}

export function updateProduct(shopId: string, updatedProduct: Product) {
    const shop = shopsStore.find(s => s.id === shopId);
    if (shop) {
        const index = shop.inventory.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
            shop.inventory[index] = updatedProduct;
        }
    }
}

export function deleteProduct(shopId: string, productId: string) {
    const shop = shopsStore.find(s => s.id === shopId);
    if (shop) {
        shop.inventory = shop.inventory.filter(p => p.id !== productId);
    }
}

export function addShopAndAssignUsers(shopData: Omit<Shop, 'id'|'inventory'|'organizationId'> & { organizationId: string }, assignedUserIds: string[], currentUser: AppUser) {
    const newShop: Shop = {
        ...shopData,
        id: `shop-${Date.now()}`,
        inventory: [],
    };

    if (!newShop.organizationId) {
        console.error("Shop must have an organization ID");
        return;
    }

    shopsStore.unshift(newShop);

    // If editor creates a shop, assign it to them
    if (currentUser.role === 'Editor') {
        const user = usersStore.find(u => u.id === currentUser.id);
        if (user && !user.shopIds.includes(newShop.id)) {
            user.shopIds.push(newShop.id);
        }
    }
    
    // Assign selected users
    assignedUserIds.forEach(userId => {
        const user = usersStore.find(u => u.id === userId);
        if (user && !user.shopIds.includes(newShop.id)) {
            user.shopIds.push(newShop.id);
        }
    });
}

export function assignShopToUsers(shopId: string, userIds: string[]) {
    const shop = shopsStore.find(s => s.id === shopId);
    if (!shop) return;
  
    // Unassign from all vendors in the organization first
    usersStore.forEach(user => {
      if (user.organizationId === shop.organizationId && user.role === 'Vendedor') {
        user.shopIds = user.shopIds.filter(id => id !== shopId);
      }
    });
  
    // Assign to selected vendors
    userIds.forEach(userId => {
      const user = usersStore.find(u => u.id === userId);
      if (user && user.role === 'Vendedor' && user.organizationId === shop.organizationId && !user.shopIds.includes(shopId)) {
        user.shopIds.push(shopId);
      }
    });
}
