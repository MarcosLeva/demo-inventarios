

import { Shirt, Laptop, Cookie, BookOpen, Wrench, Sprout, Dumbbell, Guitar, Dog, Coffee, Pill, Building } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ProductProperty = {
  key: string;
  value: string;
};

export type ShopProductDetails = {
    shopId: string;
    price: number;
    stock: number;
    status: 'activo' | 'inactivo';
}

export type Product = {
  id: string;
  name: string;
  properties: ProductProperty[];
  imageSrc: string;
  imageHint: string;
  locations: ShopProductDetails[];
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
  }
];

const initialUsers: AppUser[] = [
  { id: 'user-admin', name: 'Admin General', email: 'admin@shopspot.com', role: 'Admin', status: 'activo', shopIds: [] },
  { id: 'user-editor-1', name: 'Ana Torres', email: 'ana.torres@modacentral.com', role: 'Editor', status: 'activo', shopIds: ['1', '6'], organizationId: 'org-1' },
  { id: 'user-editor-2', name: 'Carlos Gomez', email: 'carlos.gomez@techmore.com', role: 'Editor', status: 'activo', shopIds: ['2', '5', '7'], organizationId: 'org-2' },
  { id: 'user-editor-3', name: 'Beatriz Soler', email: 'beatriz.soler@delicias.com', role: 'Editor', status: 'activo', shopIds: ['3', '9', '10'], organizationId: 'org-3' },
  { id: 'user-editor-4', name: 'David Peña', email: 'david.peña@libros.com', role: 'Editor', status: 'activo', shopIds: ['4', '8', '11'], organizationId: 'org-4' },
  { id: 'user-3', name: 'Luisa Martinez', email: 'luisa.martinez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
  { id: 'user-4', name: 'Javier Fernandez', email: 'javier.fernandez@example.com', role: 'Vendedor', status: 'inactivo', shopIds: [], organizationId: 'org-1' },
  { id: 'user-5', name: 'Sofia Rodriguez', email: 'sofia.rodriguez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['2'], organizationId: 'org-2' },
  { id: 'user-6', name: 'Miguel Angel', email: 'miguel.angel@example.com', role: 'Vendedor', status: 'activo', shopIds: ['4'], organizationId: 'org-4' },
  { id: 'user-7', name: 'Elena Perez', email: 'elena.perez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['6'], organizationId: 'org-1' },
  { id: 'user-8', name: 'Pedro Sanchez', email: 'pedro.sanchez@example.com', role: 'Vendedor', status: 'inactivo', shopIds: [], organizationId: 'org-2' },
  { id: 'user-vendedor1', name: 'Carmen Garcia', email: 'carmen.garcia@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
  { id: 'user-vendedor2', name: 'Jorge Ruiz', email: 'jorge.ruiz@example.com', role: 'Vendedor', status: 'activo', shopIds: ['2', '5'], organizationId: 'org-2' },
  { id: 'user-vendedor3', name: 'Raquel Alonso', email: 'raquel.alonso@example.com', role: 'Vendedor', status: 'activo', shopIds: ['3', '10'], organizationId: 'org-3' },
  { id: 'user-vendedor4', name: 'Marcos Vazquez', email: 'marcos.vazquez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['4', '11'], organizationId: 'org-4' },
  { id: 'user-vendedor5', name: 'Laura Jimenez', email: 'laura.jimenez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1', '6'], organizationId: 'org-1' },
  { id: 'user-vendedor6', name: 'Alberto Moreno', email: 'alberto.moreno@example.com', role: 'Vendedor', status: 'activo', shopIds: ['2', '7'], organizationId: 'org-2' },
  { id: 'user-vendedor7', name: 'Isabel Diez', email: 'isabel.diez@example.com', role: 'Vendedor', status: 'inactivo', shopIds: [], organizationId: 'org-1' },
  { id: 'user-vendedor8', name: 'Francisco Romero', email: 'francisco.romero@example.com', role: 'Vendedor', status: 'activo', shopIds: ['5'], organizationId: 'org-2' },
  { id: 'user-vendedor9', name: 'Nuria Prieto', email: 'nuria.prieto@example.com', role: 'Vendedor', status: 'activo', shopIds: ['6'], organizationId: 'org-1' },
  { id: 'user-vendedor10', name: 'Sergio Santos', email: 'sergio.santos@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
];

const initialProducts: Omit<Product, 'id'>[] = [
  // Hilos Urbanos (org-1)
  { name: 'Camiseta Clásica de Algodón', properties: [{key: 'Descripción', value: 'Una camiseta cómoda y elegante para el día a día.'}, {key: 'Talla', value: 'M'}, {key: 'Color', value: 'Blanco'}], imageSrc: 'https://picsum.photos/seed/prod1/400/300', imageHint: 'camiseta', locations: [{shopId: '1', price: 24.99, stock: 50, status: 'activo'}]},
  { name: 'Vaqueros Slim Fit', properties: [{key: 'Descripción', value: 'Vaqueros duraderos y a la moda que sientan genial.'}, {key: 'Talla', value: '32'}, {key: 'Color', value: 'Azul Oscuro'}], imageSrc: 'https://picsum.photos/seed/prod2/400/300', imageHint: 'vaqueros', locations: [{shopId: '1', price: 79.99, stock: 25, status: 'activo'}]},
  { name: 'Sudadera con Capucha', properties: [{key: 'Descripción', value: 'Cálida y cómoda, perfecta para un look casual.'}, {key: 'Talla', value: 'L'}, {key: 'Color', value: 'Gris'}], imageSrc: 'https://picsum.photos/seed/prod3/400/300', imageHint: 'sudadera', locations: [{shopId: '1', price: 59.95, stock: 30, status: 'activo'}]},
  { name: 'Chaqueta Bomber', properties: [{key: 'Descripción', value: 'Chaqueta ligera y versátil para entretiempo.'}, {key: 'Talla', value: 'M'}, {key: 'Color', value: 'Negro'}], imageSrc: 'https://picsum.photos/seed/prod22/400/300', imageHint: 'chaqueta', locations: [{shopId: '1', price: 89.90, stock: 20, status: 'activo'}]},
  { name: 'Pantalones Chinos', properties: [{key: 'Descripción', value: 'Pantalones elegantes y cómodos para cualquier ocasión.'}, {key: 'Talla', value: '34'}, {key: 'Color', value: 'Beige'}], imageSrc: 'https://picsum.photos/seed/prod23/400/300', imageHint: 'pantalones', locations: [{shopId: '1', price: 65.00, stock: 40, status: 'activo'}]},
  
  // Refugio Tecnológico (org-2)
  { name: 'UltraBook Pro', properties: [{key: 'Descripción', value: 'Portátil potente y ligero para profesionales.'}, {key: 'Procesador', value: 'Intel Core i7'}, {key: 'RAM', value: '16GB'}], imageSrc: 'https://picsum.photos/seed/prod4/400/300', imageHint: 'portátil', locations: [{shopId: '2', price: 1299.99, stock: 10, status: 'activo'}]},
  { name: 'Teléfono Galaxy X', properties: [{key: 'Descripción', value: 'El último smartphone con una pantalla impresionante.'}, {key: 'Almacenamiento', value: '256GB'}, {key: 'Color', value: 'Negro espacial'}], imageSrc: 'https://picsum.photos/seed/prod5/400/300', imageHint: 'smartphone', locations: [{shopId: '2', price: 999.99, stock: 0, status: 'activo'}]},
  { name: 'Auriculares Inalámbricos', properties: [{key: 'Descripción', value: 'Sonido cristalino con cancelación de ruido.'}, {key: 'Batería', value: '24 horas'}, {key: 'Color', value: 'Blanco'}], imageSrc: 'https://picsum.photos/seed/prod6/400/300', imageHint: 'auriculares', locations: [{shopId: '2', price: 179.00, stock: 40, status: 'activo'}, {shopId: '5', price: 185.00, stock: 15, status: 'activo'}]},
  { name: 'Smartwatch 2.0', properties: [{key: 'Descripción', value: 'Monitoriza tu salud y recibe notificaciones en tu muñeca.'}, {key: 'Compatibilidad', value: 'iOS y Android'}, {key: 'Color', value: 'Gris'}], imageSrc: 'https://picsum.photos/seed/prod24/400/300', imageHint: 'smartwatch', locations: [{shopId: '2', price: 249.99, stock: 50, status: 'activo'}]},
  { name: 'Tablet 10 pulgadas', properties: [{key: 'Descripción', value: 'Ideal para consumir contenido multimedia y trabajar.'}, {key: 'Almacenamiento', value: '128GB'}, {key: 'Pantalla', value: 'Full HD'}], imageSrc: 'https://picsum.photos/seed/prod25/400/300', imageHint: 'tablet', locations: [{shopId: '2', price: 450.00, stock: 30, status: 'inactivo'}]},

  // El Pan de Cada Día (org-3)
  { name: 'Croissant de Mantequilla', properties: [{key: 'Descripción', value: 'Hojaldrado, mantecoso y recién horneado a diario.'}, {key: 'Alérgenos', value: 'Gluten, Lácteos'}], imageSrc: 'https://picsum.photos/seed/prod7/400/300', imageHint: 'croissant', locations: [{shopId: '3', price: 3.5, stock: 200, status: 'activo'}]},
  { name: 'Cupcake de Terciopelo', properties: [{key: 'Descripción', value: 'Un capricho decadente con un rico glaseado de queso crema.'}, {key: 'Alérgenos', value: 'Gluten, Lácteos, Huevos'}], imageSrc: 'https://picsum.photos/seed/prod8/400/300', imageHint: 'cupcake', locations: [{shopId: '3', price: 4.75, stock: 75, status: 'activo'}]},
  { name: 'Pan de Masa Madre', properties: [{key: 'Descripción', value: 'Hogaza rústica con una corteza crujiente y miga tierna.'}, {key: 'Ingredientes', value: 'Harina, Agua, Sal'}], imageSrc: 'https://picsum.photos/seed/prod9/400/300', imageHint: 'pan', locations: [{shopId: '3', price: 6.00, stock: 30, status: 'activo'}]},

  // El Rincón del Libro (org-4)
  { name: "El Heredero del Dragón", properties: [{key: 'Descripción', value: 'Un libro de fantasia.'}, {key: 'Autor', value: 'J.R.R. Tolkien'}, {key: 'Género', value: 'Fantasía'}], imageSrc: 'https://picsum.photos/seed/prod10/400/300', imageHint: 'libro', locations: [{shopId: '4', price: 18.99, stock: 40, status: 'activo'}]},
  { name: 'Deriva Cósmica', properties: [{key: 'Descripción', value: 'Un libro de ciencia ficción.'}, {key: 'Autor', value: 'Isaac Asimov'}, {key: 'Género', value: 'Ciencia Ficción'}], imageSrc: 'https://picsum.photos/seed/prod11/400/300', imageHint: 'libro espacio', locations: [{shopId: '4', price: 16.99, stock: 15, status: 'activo'}]},
  { name: 'El Misterio de la Calle Sombra', properties: [{key: 'Descripción', value: 'Una novela de misterio apasionante.'}, {key: 'Autor', value: 'Agatha Christie'}, {key: 'Género', value: 'Misterio'}], imageSrc: 'https://picsum.photos/seed/prod12/400/300', imageHint: 'libro misterio', locations: [{shopId: '4', price: 14.50, stock: 22, status: 'inactivo'}]},
];

let productsStore: Product[] = initialProducts.map((p, i) => ({...p, id: `p${i+1}`}));
let usersStore: AppUser[] = JSON.parse(JSON.stringify(initialUsers));
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
      return JSON.parse(JSON.stringify(shops));
    case 'Editor':
      return JSON.parse(JSON.stringify(shops.filter(shop => shop.organizationId === user.organizationId)));
    case 'Vendedor':
      return JSON.parse(JSON.stringify(shops.filter(shop => user.shopIds.includes(shop.id))));
    default:
      return [];
  }
}

export function getShopById(id: string, user?: AppUser | null): Shop | undefined {
  const shop = shops.find((shop) => shop.id === String(id));
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
    // Admins see all products
    if (user.role === 'Admin') {
        return JSON.parse(JSON.stringify(productsStore));
    }
    // Editors see products available in shops within their organization
    if (user.role === 'Editor') {
        const orgShops = shops.filter(s => s.organizationId === user.organizationId).map(s => s.id);
        return JSON.parse(JSON.stringify(productsStore.filter(p => p.locations.some(loc => orgShops.includes(loc.shopId)))));
    }
    // Vendedores see products available in their assigned shops
    if (user.role === 'Vendedor') {
        return JSON.parse(JSON.stringify(productsStore.filter(p => p.locations.some(loc => user.shopIds.includes(loc.shopId)))));
    }
    return [];
}

export function getProductsForShop(shopId: string, user?: AppUser | null) {
    if(!user) return [];
    const shop = getShopById(shopId, user);
    if (!shop) return [];

    return productsStore.filter(p => p.locations.some(loc => loc.shopId === shopId))
        .map(p => {
            const locationDetails = p.locations.find(loc => loc.shopId === shopId)!;
            return {
                ...p, // master product data
                price: locationDetails.price,
                stock: locationDetails.stock,
                status: locationDetails.status,
            }
        });
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

        // If organization has changed, remove user from old org and add to new one
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
            // Clear shopIds as they belong to the previous organization
            updatedUser.shopIds = [];
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


export function addShop(shopData: Omit<Shop, 'id'>, currentUser: AppUser) {
    const newShop: Shop = {
        ...shopData,
        id: `shop-${Date.now()}`,
        organizationId: currentUser.role === 'Editor' ? currentUser.organizationId! : shopData.organizationId,
    };
    shops.unshift(newShop);

    // If editor creates a shop, assign it to them
    if (currentUser.role === 'Editor') {
        const user = usersStore.find(u => u.id === currentUser.id);
        if (user && !user.shopIds.includes(newShop.id)) {
            user.shopIds.push(newShop.id);
        }
    }
}

export function updateShop(updatedShop: Shop) {
    const index = shops.findIndex(shop => shop.id === updatedShop.id);
    if (index !== -1) {
        shops[index] = {
            ...shops[index],
            ...updatedShop
        };
    }
}

export function addProductToData(newProductData: Omit<Product, 'id' | 'locations'>) {
    const newProduct: Product = {
        ...newProductData,
        id: `p${Date.now()}`,
        imageSrc: newProductData.imageSrc || `https://picsum.photos/seed/new${Date.now()}/400/300`,
        imageHint: newProductData.name || 'nuevo producto',
        locations: [],
    };
    productsStore.unshift(newProduct);
}


export function updateProduct(updatedProduct: Product) {
    const index = productsStore.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        productsStore[index] = updatedProduct;
    }
}

export function deleteProductFromData(productId: string) {
    productsStore = productsStore.filter(p => p.id !== productId);
}


export function addShopAndAssignUsers(shopData: Omit<Shop, 'id'|'organizationId'> & { organizationId: string }, assignedUserIds: string[], currentUser: AppUser) {
    const newShop: Shop = {
        ...shopData,
        id: `shop-${Date.now()}`,
    };

    if (!newShop.organizationId) {
        console.error("Shop must have an organization ID");
        return;
    }

    shops.unshift(newShop);

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
    const shop = shops.find(s => s.id === shopId);
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

export function assignUsersToShop(shopId: string, assignedUserIds: string[]) {
    const shop = shops.find(s => s.id === shopId);
    if (!shop) return;

    // Get all users from the same organization who are vendors or editors
    const orgUsers = usersStore.filter(u => u.organizationId === shop.organizationId && (u.role === 'Vendedor' || u.role === 'Editor'));

    orgUsers.forEach(user => {
        const isAssigned = assignedUserIds.includes(user.id);
        const hasShop = user.shopIds.includes(shopId);

        if (isAssigned && !hasShop) {
            // Add shop to user
            user.shopIds.push(shopId);
        } else if (!isAssigned && hasShop) {
            // Remove shop from user
            user.shopIds = user.shopIds.filter(id => id !== shopId);
        }
    });
}

    
