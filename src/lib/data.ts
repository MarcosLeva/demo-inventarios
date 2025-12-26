
import { Shirt, Laptop, Cookie, BookOpen, Wrench, Sprout, Dumbbell, Guitar, Dog, Coffee, Pill } from 'lucide-react';
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
};

export type IconMap = typeof icons;
export type IconName = keyof IconMap;

export type Shop = {
  id: string;
  name: string;
  specialization: string;
  logoSrc: string;
  logoHint: string;
  icon: IconName;
  inventory: Product[];
  status: 'activo' | 'inactivo';
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Vendedor';
  status: 'activo' | 'inactivo';
  shopIds: string[];
}

const shops: Shop[] = [
  {
    id: '1',
    name: 'Hilos Urbanos',
    specialization: 'Ropa Moderna',
    logoSrc: 'https://picsum.photos/seed/shop1/400/400',
    logoHint: 'tienda de ropa',
    icon: 'Shirt',
    status: 'activo',
    inventory: [
      { id: 'p1', name: 'Camiseta Clásica de Algodón', properties: [{key: 'Descripción', value: 'Una camiseta cómoda y elegante para el día a día.'}, {key: 'Talla', value: 'M'}, {key: 'Color', value: 'Blanco'}], price: 24.99, imageSrc: 'https://picsum.photos/seed/prod1/400/300', imageHint: 'camiseta', stock: 50, status: 'activo' },
      { id: 'p2', name: 'Vaqueros Slim Fit', properties: [{key: 'Descripción', value: 'Vaqueros duraderos y a la moda que sientan genial.'}, {key: 'Talla', value: '32'}, {key: 'Color', value: 'Azul Oscuro'}], price: 79.99, imageSrc: 'https://picsum.photos/seed/prod2/400/300', imageHint: 'vaqueros', stock: 25, status: 'activo' },
    ],
  },
  {
    id: '2',
    name: 'Refugio Tecnológico',
    specialization: 'Electrónica de Vanguardia',
    logoSrc: 'https://picsum.photos/seed/shop2/400/400',
    logoHint: 'tienda de electrónica',
    icon: 'Laptop',
    status: 'activo',
    inventory: [
      { id: 'p4', name: 'UltraBook Pro', properties: [{key: 'Descripción', value: 'Portátil potente y ligero para profesionales.'}, {key: 'Procesador', value: 'Intel Core i7'}, {key: 'RAM', value: '16GB'}], price: 1299.99, imageSrc: 'https://picsum.photos/seed/prod3/400/300', imageHint: 'portátil', stock: 10, status: 'activo' },
      { id: 'p5', name: 'Teléfono Galaxy X', properties: [{key: 'Descripción', value: 'El último smartphone con una pantalla impresionante.'}, {key: 'Almacenamiento', value: '256GB'}, {key: 'Color', value: 'Negro espacial'}], price: 999.99, imageSrc: 'https://picsum.photos/seed/prod4/400/300', imageHint: 'smartphone', stock: 0, status: 'activo' },
    ],
  },
  {
    id: '3',
    name: 'El Pan de Cada Día',
    specialization: 'Panadería Artesanal',
    logoSrc: 'https://picsum.photos/seed/shop3/400/400',
    logoHint: 'panadería',
    icon: 'Cookie',
    status: 'activo',
    inventory: [
      { id: 'p7', name: 'Croissant de Mantequilla', properties: [{key: 'Descripción', value: 'Hojaldrado, mantecoso y recién horneado a diario.'}, {key: 'Alérgenos', value: 'Gluten, Lácteos'}], price: 3.5, imageSrc: 'https://picsum.photos/seed/prod5/400/300', imageHint: 'croissant', stock: 200, status: 'activo' },
      { id: 'p8', name: 'Cupcake de Terciopelo', properties: [{key: 'Descripción', value: 'Un capricho decadente con un rico glaseado de queso crema.'}, {key: 'Alérgenos', value: 'Gluten, Lácteos, Huevos'}], price: 4.75, imageSrc: 'https://picsum.photos/seed/prod6/400/300', imageHint: 'cupcake', stock: 75, status: 'activo' },
    ],
  },
  {
    id: '4',
    name: 'El Rincón del Libro',
    specialization: 'Literatura Selecta',
    logoSrc: 'https://picsum.photos/seed/shop4/400/400',
    logoHint: 'librería',
    icon: 'BookOpen',
    status: 'inactivo',
    inventory: [
      { id: 'p10', name: "El Heredero del Dragón", properties: [{key: 'Autor', value: 'J.R.R. Tolkien'}, {key: 'Género', value: 'Fantasía'}], price: 18.99, imageSrc: 'https://picsum.photos/seed/prod7/400/300', imageHint: 'libro', stock: 40, status: 'activo' },
      { id: 'p11', name: 'Deriva Cósmica', properties: [{key: 'Autor', value: 'Isaac Asimov'}, {key: 'Género', value: 'Ciencia Ficción'}], price: 16.99, imageSrc: 'https://picsum.photos/seed/prod8/400/300', imageHint: 'libro espacio', stock: 15, status: 'activo' },
    ],
  },
  {
    id: '5',
    name: 'Autopartes Gohner',
    specialization: 'Refacciones y Accesorios Automotrices',
    logoSrc: 'https://picsum.photos/seed/gohner/400/400',
    logoHint: 'autopartes',
    icon: 'Wrench',
    status: 'activo',
    inventory: [
        { id: 'p21', name: 'Filtro de Aceite Gohner G-28', properties: [{key: 'Descripción', value: 'Alta eficiencia para motores a gasolina.'}, {key: 'Compatibilidad', value: 'Modelos 2010-2020'}], price: 12.50, imageSrc: 'https://picsum.photos/seed/prod21/400/300', imageHint: 'filtro aceite', stock: 150, status: 'activo' },
    ]
  },
];

const users: AppUser[] = [
    { id: 'user-1', name: 'Admin Principal', email: 'admin@example.com', role: 'Admin', status: 'activo', shopIds: [] },
    { id: 'user-2', name: 'Laura Méndez', email: 'laura.mendez@example.com', role: 'Admin', status: 'activo', shopIds: [] },
    { id: 'user-admin3', name: 'Ricardo P.', email: 'ricardo@example.com', role: 'Admin', status: 'activo', shopIds: [] },
    { id: 'user-admin4', name: 'Susana H.', email: 'susana@example.com', role: 'Admin', status: 'inactivo', shopIds: [] },
    { id: 'user-admin5', name: 'Felipe N.', email: 'felipe@example.com', role: 'Admin', status: 'activo', shopIds: [] },
    { id: 'user-3', name: 'Carlos Pérez', email: 'carlos.perez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'] },
    { id: 'user-4', name: 'Ana García', email: 'ana.garcia@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['1', '2'] },
    { id: 'user-5', name: 'Jorge Martín', email: 'jorge.martin@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['3'] },
    { id: 'user-6', name: 'Vendedor Ejemplo', email: 'vendedor@example.com', role: 'Vendedor', status: 'activo', shopIds: ['4'] },
    { id: 'user-7', name: 'Sofía Reyes', email: 'sofia.reyes@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1', '3', '4'] },
    { id: 'user-8', name: 'Luis Fernández', email: 'luis.fernandez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['2', '4'] },
    { id: 'user-vendedor1', name: 'Vendedor 1', email: 'vendedor1@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'] },
    { id: 'user-vendedor2', name: 'Vendedor 2', email: 'vendedor2@example.com', role: 'Vendedor', status: 'activo', shopIds: ['2'] },
    { id: 'user-vendedor3', name: 'Vendedor 3', email: 'vendedor3@example.com', role: 'Vendedor', status: 'activo', shopIds: ['3'] },
    { id: 'user-vendedor4', name: 'Vendedor 4', email: 'vendedor4@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['4'] },
    { id: 'user-vendedor5', name: 'Vendedor 5', email: 'vendedor5@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1', '2'] },
    { id: 'user-vendedor6', name: 'Vendedor 6', email: 'vendedor6@example.com', role: 'Vendedor', status: 'activo', shopIds: ['3', '4'] },
    { id: 'user-vendedor7', name: 'Vendedor 7', email: 'vendedor7@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1', '3'] },
    { id: 'user-vendedor8', name: 'Vendedor 8', email: 'vendedor8@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['2', '4'] },
    { id: 'user-vendedor9', name: 'Vendedor 9', email: 'vendedor9@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1', '2', '3'] },
    { id: 'user-vendedor10', name: 'Vendedor 10', email: 'vendedor10@example.com', role: 'Vendedor', status: 'activo', shopIds: ['4', '1'] },
];

let shopsStore: Shop[] = JSON.parse(JSON.stringify(shops));
let usersStore: AppUser[] = JSON.parse(JSON.stringify(users));

export function getShops(user?: AppUser | null) {
  if (!user) return [];
  switch (user.role) {
    case 'Admin':
      return JSON.parse(JSON.stringify(shopsStore));
    case 'Vendedor':
      if (user.shopIds.length > 0) {
        return JSON.parse(JSON.stringify(shopsStore.filter(shop => user.shopIds.includes(shop.id))));
      }
      return [];
    default:
      return [];
  }
}

export function getShopById(id: string) {
  const shop = shopsStore.find((shop) => shop.id === String(id));
  if (!shop) return undefined;
  return JSON.parse(JSON.stringify(shop));
}

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

export function getUsers(user?: AppUser | null) {
    if (!user) return [];
    if (user.role === 'Admin') {
        return JSON.parse(JSON.stringify(usersStore));
    }
    return [JSON.parse(JSON.stringify(user))];
}

export function getUserByEmail(email: string): AppUser | undefined {
    const user = usersStore.find(user => user.email === email);
    if (!user) return undefined;
    return JSON.parse(JSON.stringify(user));
}

export function addUser(user: Omit<AppUser, 'id'>) {
    usersStore.unshift({
        ...user,
        id: `user-${Date.now()}`,
    });
}

export function updateUser(updatedUser: AppUser) {
    const index = usersStore.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
        usersStore[index] = updatedUser;
    }
}

export function deleteUser(userId: string) {
    usersStore = usersStore.filter(u => u.id !== userId);
}


export function addShop(shopData: Omit<Shop, 'id'|'inventory'>) {
    shopsStore.unshift({
        ...shopData,
        id: `shop-${Date.now()}`,
        inventory: []
    });
}

export function updateShop(updatedShop: Shop) {
    const index = shopsStore.findIndex(shop => shop.id === updatedShop.id);
    if (index !== -1) {
        shopsStore[index] = updatedShop;
    }
}

export function addProduct(shopId: string, product: Omit<Product, 'id' | 'imageSrc' | 'imageHint'>) {
    const shop = shopsStore.find(s => s.id === shopId);
    if (shop) {
        const newProduct: Product = {
            ...product,
            id: `p${Date.now()}`,
            imageSrc: `https://picsum.photos/seed/new${Date.now()}/400/300`,
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

export function addShopAndAssignUsers(shopData: Omit<Shop, 'id'|'inventory'>, assignedUserIds: string[]) {
    const newShop: Shop = {
        ...shopData,
        id: `shop-${Date.now()}`,
        inventory: []
    }
    shopsStore.unshift(newShop);

    assignedUserIds.forEach(userId => {
        const user = usersStore.find(u => u.id === userId);
        if (user && !user.shopIds.includes(newShop.id)) {
            user.shopIds.push(newShop.id);
        }
    });
}

    