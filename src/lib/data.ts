

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
      { id: 'p22', name: 'Chaqueta Bomber', properties: [{key: 'Descripción', value: 'Chaqueta ligera y versátil para entretiempo.'}, {key: 'Talla', value: 'M'}, {key: 'Color', value: 'Negro'}], price: 89.90, imageSrc: 'https://picsum.photos/seed/prod22/400/300', imageHint: 'chaqueta', stock: 20, status: 'activo' },
      { id: 'p23', name: 'Pantalones Chinos', properties: [{key: 'Descripción', value: 'Pantalones elegantes y cómodos para cualquier ocasión.'}, {key: 'Talla', value: '34'}, {key: 'Color', value: 'Beige'}], price: 65.00, imageSrc: 'https://picsum.photos/seed/prod23/400/300', imageHint: 'pantalones', stock: 40, status: 'activo' },
      { id: 'p101', name: 'Polo de Piqué', properties: [{key: 'Descripción', value: 'Un clásico atemporal para un look smart-casual.'}, {key: 'Talla', value: 'M'}, {key: 'Color', value: 'Azul Marino'}], price: 45.00, imageSrc: 'https://picsum.photos/seed/prod101/400/300', imageHint: 'polo', stock: 60, status: 'activo' },
      { id: 'p102', name: 'Vestido de Verano Floral', properties: [{key: 'Descripción', value: 'Ligero y fresco, perfecto para días soleados.'}, {key: 'Talla', value: 'S'}, {key: 'Material', value: 'Viscosa'}], price: 75.50, imageSrc: 'https://picsum.photos/seed/prod102/400/300', imageHint: 'vestido', stock: 35, status: 'activo' },
      { id: 'p103', name: 'Cazadora Vaquera', properties: [{key: 'Descripción', value: 'Un básico imprescindible en cualquier armario.'}, {key: 'Talla', value: 'M'}, {key: 'Color', value: 'Azul Denim'}], price: 95.00, imageSrc: 'https://picsum.photos/seed/prod103/400/300', imageHint: 'cazadora vaquera', stock: 22, status: 'activo' },
      { id: 'p104', name: 'Jersey de Lana Merino', properties: [{key: 'Descripción', value: 'Suave, cálido y transpirable.'}, {key: 'Talla', value: 'L'}, {key: 'Color', value: 'Verde Botella'}], price: 110.00, imageSrc: 'https://picsum.photos/seed/prod104/400/300', imageHint: 'jersey', stock: 18, status: 'activo' },
      { id: 'p105', name: 'Falda Plisada Midi', properties: [{key: 'Descripción', value: 'Elegante y versátil, para looks de día y de noche.'}, {key: 'Talla', value: '38'}, {key: 'Color', value: 'Negro'}], price: 69.90, imageSrc: 'https://picsum.photos/seed/prod105/400/300', imageHint: 'falda', stock: 28, status: 'activo' },
      { id: 'p106', name: 'Camisa de Lino', properties: [{key: 'Descripción', value: 'Fresca y ligera, ideal para el calor.'}, {key: 'Talla', value: 'XL'}, {key: 'Color', value: 'Blanco'}], price: 55.00, imageSrc: 'https://picsum.photos/seed/prod106/400/300', imageHint: 'camisa lino', stock: 45, status: 'activo' },
      { id: 'p107', name: 'Bufanda de Cashmere', properties: [{key: 'Descripción', value: 'Suavidad y lujo para los días fríos.'}, {key: 'Material', value: '100% Cashmere'}, {key: 'Color', value: 'Gris Claro'}], price: 150.00, imageSrc: 'https://picsum.photos/seed/prod107/400/300', imageHint: 'bufanda', stock: 15, status: 'activo' },
      { id: 'p108', name: 'Zapatillas Urbanas', properties: [{key: 'Descripción', value: 'Comodidad y estilo para caminar por la ciudad.'}, {key: 'Talla', value: '42'}, {key: 'Material', value: 'Piel'}], price: 120.00, imageSrc: 'https://picsum.photos/seed/prod108/400/300', imageHint: 'zapatillas', stock: 50, status: 'activo' },
      { id: 'p109', name: 'Gorra de Béisbol', properties: [{key: 'Descripción', value: 'Un accesorio casual para protegerte del sol.'}, {key: 'Talla', value: 'Única'}, {key: 'Color', value: 'Negro'}], price: 29.00, imageSrc: 'https://picsum.photos/seed/prod109/400/300', imageHint: 'gorra', stock: 80, status: 'inactivo' },
      { id: 'p110', name: 'Calcetines de Diseño', properties: [{key: 'Descripción', value: 'Dale un toque de color a tus pies.'}, {key: 'Pack', value: '3 pares'}, {key: 'Talla', value: '40-44'}], price: 19.95, imageSrc: 'https://picsum.photos/seed/prod110/400/300', imageHint: 'calcetines', stock: 120, status: 'activo' },
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
      { id: 'p24', name: 'Smartwatch 2.0', properties: [{key: 'Descripción', value: 'Monitoriza tu salud y recibe notificaciones en tu muñeca.'}, {key: 'Compatibilidad', value: 'iOS y Android'}, {key: 'Color', value: 'Gris'}], price: 249.99, imageSrc: 'https://picsum.photos/seed/prod24/400/300', imageHint: 'smartwatch', stock: 50, status: 'activo' },
      { id: 'p25', name: 'Tablet 10 pulgadas', properties: [{key: 'Descripción', value: 'Ideal para consumir contenido multimedia y trabajar.'}, {key: 'Almacenamiento', value: '128GB'}, {key: 'Pantalla', value: 'Full HD'}], price: 450.00, imageSrc: 'https://picsum.photos/seed/prod25/400/300', imageHint: 'tablet', stock: 30, status: 'inactivo' },
      { id: 'p111', name: 'Cámara Mirrorless Alpha', properties: [{key: 'Descripción', value: 'Captura fotos y vídeos de calidad profesional.'}, {key: 'Sensor', value: 'Full-Frame 24MP'}, {key: 'ISO', value: '100-51200'}], price: 2199.00, imageSrc: 'https://picsum.photos/seed/prod111/400/300', imageHint: 'cámara', stock: 8, status: 'activo' },
      { id: 'p112', name: 'Drone Aéreo Explorer 4K', properties: [{key: 'Descripción', value: 'Graba vídeos aéreos impresionantes en 4K.'}, {key: 'Autonomía', value: '30 min'}, {key: 'Alcance', value: '5 km'}], price: 899.00, imageSrc: 'https://picsum.photos/seed/prod112/400/300', imageHint: 'drone', stock: 15, status: 'activo' },
      { id: 'p113', name: 'Router WiFi 6 Mesh', properties: [{key: 'Descripción', value: 'Cobertura total en tu hogar con la última tecnología WiFi.'}, {key: 'Pack', value: '2 nodos'}, {key: 'Velocidad', value: 'AX3000'}], price: 299.00, imageSrc: 'https://picsum.photos/seed/prod113/400/300', imageHint: 'router', stock: 40, status: 'activo' },
      { id: 'p114', name: 'Teclado Mecánico Gamer', properties: [{key: 'Descripción', value: 'Precisión y velocidad para tus partidas.'}, {key: 'Switches', value: 'Cherry MX Red'}, {key: 'Iluminación', value: 'RGB'}], price: 139.90, imageSrc: 'https://picsum.photos/seed/prod114/400/300', imageHint: 'teclado gamer', stock: 60, status: 'activo' },
      { id: 'p115', name: 'Ratón Inalámbrico Ergonómico', properties: [{key: 'Descripción', value: 'Diseñado para la comodidad durante largas jornadas de trabajo.'}, {key: 'DPI', value: '4000'}, {key: 'Conectividad', value: 'Bluetooth y USB'}], price: 89.99, imageSrc: 'https://picsum.photos/seed/prod115/400/300', imageHint: 'ratón', stock: 100, status: 'activo' },
      { id: 'p116', name: 'Monitor Curvo 34" Ultrawide', properties: [{key: 'Descripción', value: 'Sumérgete en tus juegos y películas.'}, {key: 'Resolución', value: '3440x1440'}, {key: 'Tasa de Refresco', value: '144Hz'}], price: 750.00, imageSrc: 'https://picsum.photos/seed/prod116/400/300', imageHint: 'monitor', stock: 12, status: 'activo' },
      { id: 'p117', name: 'Disco Duro Externo 4TB', properties: [{key: 'Descripción', value: 'Almacena todos tus archivos importantes de forma segura.'}, {key: 'Interfaz', value: 'USB 3.1'}, {key: 'Color', value: 'Negro'}], price: 125.00, imageSrc: 'https://picsum.photos/seed/prod117/400/300', imageHint: 'disco duro', stock: 70, status: 'activo' },
      { id: 'p118', name: 'Proyector Portátil Full HD', properties: [{key: 'Descripción', value: 'Cine en casa en cualquier lugar.'}, {key: 'Lúmenes', value: '500 ANSI'}, {key: 'Batería', value: '3 horas'}], price: 499.00, imageSrc: 'https://picsum.photos/seed/prod118/400/300', imageHint: 'proyector', stock: 25, status: 'activo' },
      { id: 'p119', name: 'Webcam 1080p con Micrófono', properties: [{key: 'Descripción', value: 'Ideal para streaming y videoconferencias.'}, {key: 'Campo de visión', value: '90 grados'}, {key: 'Conexión', value: 'USB-C'}], price: 65.00, imageSrc: 'https://picsum.photos/seed/prod119/400/300', imageHint: 'webcam', stock: 90, status: 'activo' },
      { id: 'p120', name: 'Lector de eBooks', properties: [{key: 'Descripción', value: 'Lee durante horas sin fatiga visual.'}, {key: 'Pantalla', value: '6.8" E-Ink'}, {key: 'Luz', value: 'Cálida ajustable'}], price: 139.00, imageSrc: 'https://picsum.photos/seed/prod120/400/300', imageHint: 'ebook', stock: 55, status: 'activo' },
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
      { id: 'p26', name: 'Tarta de Manzana', properties: [{key: 'Descripción', value: 'La clásica tarta de la abuela con manzanas frescas.'}, {key: 'Tamaño', value: '8 porciones'}], price: 25.00, imageSrc: 'https://picsum.photos/seed/prod26/400/300', imageHint: 'tarta manzana', stock: 15, status: 'activo' },
      { id: 'p27', name: 'Galletas con Chips de Chocolate', properties: [{key: 'Descripción', value: 'La galleta perfecta para mojar en leche.'}, {key: 'Cantidad', value: 'Pack de 6'}], price: 9.50, imageSrc: 'https://picsum.photos/seed/prod27/400/300', imageHint: 'galletas chocolate', stock: 100, status: 'activo' },
      { id: 'p121', name: 'Baguette Parisina', properties: [{key: 'Descripción', value: 'Corteza crujiente y miga alveolada. Hecha a diario.'}, {key: 'Peso', value: '250g'}], price: 2.80, imageSrc: 'https://picsum.photos/seed/prod121/400/300', imageHint: 'baguette', stock: 80, status: 'activo' },
      { id: 'p122', name: 'Napolitana de Chocolate', properties: [{key: 'Descripción', value: 'Hojaldre relleno de dos barras del mejor chocolate.'}, {key: 'Alérgenos', value: 'Gluten, Lácteos'}], price: 3.20, imageSrc: 'https://picsum.photos/seed/prod122/400/300', imageHint: 'napolitana', stock: 150, status: 'activo' },
      { id: 'p123', name: 'Tarta de Queso Vasca', properties: [{key: 'Descripción', value: 'Cremosa por dentro y con un exterior caramelizado único.'}, {key: 'Tamaño', value: '6 porciones'}], price: 28.00, imageSrc: 'https://picsum.photos/seed/prod123/400/300', imageHint: 'tarta de queso', stock: 10, status: 'activo' },
      { id: 'p124', name: 'Muffin de Arándanos', properties: [{key: 'Descripción', value: 'Esponjoso y lleno de arándanos frescos.'}, {key: 'Ingrediente estrella', value: 'Arándanos'}], price: 3.80, imageSrc: 'https://picsum.photos/seed/prod124/400/300', imageHint: 'muffin', stock: 90, status: 'activo' },
      { id: 'p125', name: 'Focaccia de Romero y Sal', properties: [{key: 'Descripción', value: 'Pan plano italiano ideal para acompañar o como base de pizza.'}, {key: 'Toppings', value: 'Romero fresco y sal marina'}], price: 7.50, imageSrc: 'https://picsum.photos/seed/prod125/400/300', imageHint: 'focaccia', stock: 25, status: 'activo' },
      { id: 'p126', name: 'Macarons Surtidos', properties: [{key: 'Descripción', value: 'Caja con una selección de nuestros mejores sabores.'}, {key: 'Cantidad', value: 'Caja de 6'}], price: 12.00, imageSrc: 'https://picsum.photos/seed/prod126/400/300', imageHint: 'macarons', stock: 50, status: 'activo' },
      { id: 'p127', name: 'Empanada de Atún', properties: [{key: 'Descripción', value: 'Receta tradicional con un relleno jugoso y sabroso.'}, {key: 'Tipo', value: 'Salado'}], price: 4.50, imageSrc: 'https://picsum.photos/seed/prod127/400/300', imageHint: 'empanada', stock: 60, status: 'inactivo' },
      { id: 'p128', name: 'Pan de Centeno Integral', properties: [{key: 'Descripción', value: 'Una opción más saludable y con un sabor más profundo.'}, {key: 'Harina', value: '100% Centeno Integral'}], price: 7.00, imageSrc: 'https://picsum.photos/seed/prod128/400/300', imageHint: 'pan centeno', stock: 20, status: 'activo' },
      { id: 'p129', name: 'Brownie de Triple Chocolate', properties: [{key: 'Descripción', value: 'Para los verdaderos amantes del chocolate.'}, {key: 'Chocolate', value: 'Negro, con leche y blanco'}], price: 5.00, imageSrc: 'https://picsum.photos/seed/prod129/400/300', imageHint: 'brownie', stock: 40, status: 'activo' },
      { id: 'p130', name: 'Palmera de Hojaldre Gigante', properties: [{key: 'Descripción', value: 'Crujiente y perfectamente caramelizada.'}, {key: 'Cobertura', value: 'Glaseado / Chocolate'}], price: 3.00, imageSrc: 'https://picsum.photos/seed/prod130/400/300', imageHint: 'palmera', stock: 100, status: 'activo' },
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
      { id: 'p28', name: 'Cien Años de Soledad', properties: [{key: 'Descripción', value: 'Una obra maestra de la literatura universal.'}, {key: 'Autor', value: 'Gabriel García Márquez'}, {key: 'Género', value: 'Realismo Mágico'}], price: 22.50, imageSrc: 'https://picsum.photos/seed/prod28/400/300', imageHint: 'libro clásico', stock: 50, status: 'activo' },
      { id: 'p29', name: 'Dune', properties: [{key: 'Descripción', value: 'La épica saga de ciencia ficción que definió un género.'}, {key: 'Autor', value: 'Frank Herbert'}, {key: 'Género', value: 'Ciencia Ficción'}], price: 24.00, imageSrc: 'https://picsum.photos/seed/prod29/400/300', imageHint: 'libro duna', stock: 35, status: 'activo' },
      { id: 'p131', name: '1984', properties: [{key: 'Descripción', value: 'Una distopía clásica que sigue siendo relevante hoy.'}, {key: 'Autor', value: 'George Orwell'}, {key: 'Género', value: 'Distopía'}], price: 15.00, imageSrc: 'https://picsum.photos/seed/prod131/400/300', imageHint: 'libro 1984', stock: 60, status: 'activo' },
      { id: 'p132', name: 'El Señor de los Anillos', properties: [{key: 'Descripción', value: 'La trilogía completa en una edición de lujo.'}, {key: 'Autor', value: 'J.R.R. Tolkien'}, {key: 'Formato', value: 'Tapa dura'}], price: 89.90, imageSrc: 'https://picsum.photos/seed/prod132/400/300', imageHint: 'libro anillos', stock: 20, status: 'activo' },
      { id: 'p133', name: 'Matar a un Ruiseñor', properties: [{key: 'Descripción', value: 'Una novela icónica sobre la injusticia y la moral.'}, {key: 'Autor', value: 'Harper Lee'}, {key: 'Género', value: 'Ficción Clásica'}], price: 17.50, imageSrc: 'https://picsum.photos/seed/prod133/400/300', imageHint: 'libro ruiseñor', stock: 40, status: 'activo' },
      { id: 'p134', name: 'Sapiens: De animales a dioses', properties: [{key: 'Descripción', value: 'Una breve historia de la humanidad.'}, {key: 'Autor', value: 'Yuval Noah Harari'}, {key: 'Género', value: 'Ensayo'}], price: 23.00, imageSrc: 'https://picsum.photos/seed/prod134/400/300', imageHint: 'libro sapiens', stock: 70, status: 'activo' },
      { id: 'p135', name: 'El Alquimista', properties: [{key: 'Descripción', value: 'Un viaje inspirador sobre seguir tus sueños.'}, {key: 'Autor', value: 'Paulo Coelho'}, {key: 'Género', value: 'Ficción Inspiracional'}], price: 14.00, imageSrc: 'https://picsum.photos/seed/prod135/400/300', imageHint: 'libro alquimista', stock: 100, status: 'activo' },
      { id: 'p136', name: 'La Sombra del Viento', properties: [{key: 'Descripción', value: 'Un misterio literario ambientado en la Barcelona de posguerra.'}, {key: 'Autor', value: 'Carlos Ruiz Zafón'}, {key: 'Género', value: 'Misterio'}], price: 21.90, imageSrc: 'https://picsum.photos/seed/prod136/400/300', imageHint: 'libro viento', stock: 55, status: 'activo' },
      { id: 'p137', name: 'Orgullo y Prejuicio', properties: [{key: 'Descripción', value: 'Un clásico inmortal del romance y la crítica social.'}, {key: 'Autor', value: 'Jane Austen'}, {key: 'Género', value: 'Clásico Romántico'}], price: 16.50, imageSrc: 'https://picsum.photos/seed/prod137/400/300', imageHint: 'libro orgullo', stock: 48, status: 'activo' },
      { id: 'p138', name: 'Fahrenheit 451', properties: [{key: 'Descripción', value: 'Una poderosa historia sobre la censura y el conocimiento.'}, {key: 'Autor', value: 'Ray Bradbury'}, {key: 'Género', value: 'Ciencia Ficción'}], price: 15.90, imageSrc: 'https://picsum.photos/seed/prod138/400/300', imageHint: 'libro fahrenheit', stock: 33, status: 'activo' },
      { id: 'p139', name: 'El Hobbit', properties: [{key: 'Descripción', value: 'La aventura que precede a El Señor de los Anillos.'}, {key: 'Autor', value: 'J.R.R. Tolkien'}, {key: 'Género', value: 'Fantasía'}], price: 19.00, imageSrc: 'https://picsum.photos/seed/prod139/400/300', imageHint: 'libro hobbit', stock: 65, status: 'activo' },
      { id: 'p140', name: 'Crónica de una Muerte Anunciada', properties: [{key: 'Descripción', value: 'Una novela corta que desentraña un crimen inevitable.'}, {key: 'Autor', value: 'Gabriel García Márquez'}, {key: 'Género', value: 'Ficción'}], price: 12.00, imageSrc: 'https://picsum.photos/seed/prod140/400/300', imageHint: 'libro muerte', stock: 0, status: 'inactivo' },
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
      { id: 'p30', name: 'Bujías de Iridio (4-pack)', properties: [{key: 'Descripción', value: 'Mejoran la combustión y la eficiencia del combustible.'}, {key: 'Vida útil', value: '100,000 km'}], price: 35.00, imageSrc: 'https://picsum.photos/seed/prod30/400/300', imageHint: 'bujías', stock: 80, status: 'activo' },
      { id: 'p31', name: 'Anticongelante Concentrado', properties: [{key: 'Descripción', value: 'Protección para el sistema de enfriamiento.'}, {key: 'Contenido', value: '1 Galón'}], price: 22.90, imageSrc: 'https://picsum.photos/seed/prod31/400/300', imageHint: 'anticongelante', stock: 120, status: 'activo' },
      { id: 'p141', name: 'Aceite Sintético 5W-30', properties: [{key: 'Descripción', value: 'Máxima protección y rendimiento para tu motor.'}, {key: 'Contenido', value: '5 Litros'}], price: 45.00, imageSrc: 'https://picsum.photos/seed/prod141/400/300', imageHint: 'aceite motor', stock: 90, status: 'activo' },
      { id: 'p142', name: 'Limpiaparabrisas (Par)', properties: [{key: 'Descripción', value: 'Visibilidad clara en cualquier clima.'}, {key: 'Tamaño', value: '22 pulgadas'}], price: 25.00, imageSrc: 'https://picsum.photos/seed/prod142/400/300', imageHint: 'limpiaparabrisas', stock: 200, status: 'activo' },
      { id: 'p143', name: 'Batería de Coche 600A', properties: [{key: 'Descripción', value: 'Potencia de arranque fiable en frío.'}, {key: 'Garantía', value: '3 años'}], price: 150.00, imageSrc: 'https://picsum.photos/seed/prod143/400/300', imageHint: 'batería coche', stock: 30, status: 'activo' },
      { id: 'p144', name: 'Filtro de Aire de Cabina', properties: [{key: 'Descripción', value: 'Purifica el aire que respiras dentro del vehículo.'}, {key: 'Material', value: 'Carbón activado'}], price: 18.50, imageSrc: 'https://picsum.photos/seed/prod144/400/300', imageHint: 'filtro aire', stock: 110, status: 'activo' },
      { id: 'p145', name: 'Kit de Emergencia para Carretera', properties: [{key: 'Descripción', value: 'Incluye cables pasacorriente, triángulo de seguridad y más.'}, {key: 'Contenido', value: '15 piezas'}], price: 49.99, imageSrc: 'https://picsum.photos/seed/prod145/400/300', imageHint: 'kit emergencia', stock: 50, status: 'activo' },
      { id: 'p146', name: 'Líquido de Frenos DOT 4', properties: [{key: 'Descripción', value: 'Alto punto de ebullición para un frenado seguro.'}, {key: 'Contenido', value: '1 Litro'}], price: 15.00, imageSrc: 'https://picsum.photos/seed/prod146/400/300', imageHint: 'líquido frenos', stock: 130, status: 'activo' },
      { id: 'p147', name: 'Gato Hidráulico de Carretilla', properties: [{key: 'Descripción', value: 'Levanta hasta 2 toneladas de forma segura.'}, {key: 'Capacidad', value: '2 Toneladas'}], price: 85.00, imageSrc: 'https://picsum.photos/seed/prod147/400/300', imageHint: 'gato hidráulico', stock: 25, status: 'activo' },
      { id: 'p148', name: 'Juego de Llaves de Vaso', properties: [{key: 'Descripción', value: 'Set completo para reparaciones básicas y avanzadas.'}, {key: 'Piezas', value: '46 piezas'}], price: 65.00, imageSrc: 'https://picsum.photos/seed/prod148/400/300', imageHint: 'herramientas', stock: 40, status: 'activo' },
      { id: 'p149', name: 'Faro Delantero LED', properties: [{key: 'Descripción', value: 'Mejora la visibilidad y el aspecto de tu coche.'}, {key: 'Compatibilidad', value: 'Universal (H4)'}], price: 75.00, imageSrc: 'https://picsum.photos/seed/prod149/400/300', imageHint: 'faro led', stock: 35, status: 'inactivo' },
      { id: 'p150', name: 'Abrillantador de Neumáticos', properties: [{key: 'Descripción', value: 'Acabado negro intenso y duradero.'}, {key: 'Fórmula', value: 'Base de silicona'}], price: 12.00, imageSrc: 'https://picsum.photos/seed/prod150/400/300', imageHint: 'abrillantador', stock: 150, status: 'activo' },
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
      { id: 'p32', name: 'Monstera Deliciosa', properties: [{key: 'Descripción', value: 'Planta de interior popular por sus hojas perforadas.'}, {key: 'Tamaño', value: 'Mediana'}], price: 45.00, imageSrc: 'https://picsum.photos/seed/prod32/400/300', imageHint: 'monstera', stock: 25, status: 'activo' },
      { id: 'p33', name: 'Sustrato Universal 20L', properties: [{key: 'Descripción', value: 'Mezcla de alta calidad para todo tipo de plantas.'}, {key: 'Volumen', value: '20 Litros'}], price: 12.00, imageSrc: 'https://picsum.photos/seed/prod33/400/300', imageHint: 'sustrato', stock: 200, status: 'activo' },
      { id: 'p151', name: 'Ficus Lyrata (Fiddle Leaf Fig)', properties: [{key: 'Descripción', value: 'Una planta escultural que es tendencia en decoración.'}, {key: 'Altura', value: '1.20m'}], price: 85.00, imageSrc: 'https://picsum.photos/seed/prod151/400/300', imageHint: 'ficus lyrata', stock: 15, status: 'activo' },
      { id: 'p152', name: 'Sansevieria (Planta Serpiente)', properties: [{key: 'Descripción', value: 'Extremadamente resistente y purificadora de aire.'}, {key: 'Mantenimiento', value: 'Bajo'}], price: 25.00, imageSrc: 'https://picsum.photos/seed/prod152/400/300', imageHint: 'sansevieria', stock: 50, status: 'activo' },
      { id: 'p153', name: 'Regadera de Diseño', properties: [{key: 'Descripción', value: 'Funcional y decorativa, de acero inoxidable.'}, {key: 'Capacidad', value: '1.5 Litros'}], price: 35.00, imageSrc: 'https://picsum.photos/seed/prod153/400/300', imageHint: 'regadera', stock: 30, status: 'activo' },
      { id: 'p154', name: 'Fertilizante Líquido para Plantas de Interior', properties: [{key: 'Descripción', value: 'Aporta todos los nutrientes necesarios para un crecimiento sano.'}, {key: 'Contenido', value: '500 ml'}], price: 9.90, imageSrc: 'https://picsum.photos/seed/prod154/400/300', imageHint: 'fertilizante', stock: 100, status: 'activo' },
      { id: 'p155', name: 'Maceta de Cerámica con Plato', properties: [{key: 'Descripción', value: 'Diseño moderno que complementa cualquier planta.'}, {key: 'Diámetro', value: '20 cm'}], price: 28.00, imageSrc: 'https://picsum.photos/seed/prod155/400/300', imageHint: 'maceta', stock: 60, status: 'activo' },
      { id: 'p156', name: 'Kit de Cultivo de Hierbas Aromáticas', properties: [{key: 'Descripción', value: 'Cultiva tu propia albahaca, perejil y cilantro.'}, {key: 'Incluye', value: 'Semillas, sustrato y maceteros'}], price: 24.95, imageSrc: 'https://picsum.photos/seed/prod156/400/300', imageHint: 'kit cultivo', stock: 45, status: 'activo' },
      { id: 'p157', name: 'Tijeras de Podar', properties: [{key: 'Descripción', value: 'Corte limpio y preciso para el cuidado de tus plantas.'}, {key: 'Material', value: 'Acero japonés'}], price: 19.99, imageSrc: 'https://picsum.photos/seed/prod157/400/300', imageHint: 'tijeras podar', stock: 75, status: 'activo' },
      { id: 'p158', name: 'Bonsái de Olmo Chino', properties: [{key: 'Descripción', value: 'Un árbol en miniatura para cultivar la paciencia.'}, {key: 'Edad', value: '5 años'}], price: 55.00, imageSrc: 'https://picsum.photos/seed/prod158/400/300', imageHint: 'bonsai', stock: 12, status: 'activo' },
      { id: 'p159', name: 'Cesta Colgante para Plantas', properties: [{key: 'Descripción', value: 'Ideal para potos, cintas o helechos.'}, {key: 'Material', value: 'Macramé de algodón'}], price: 22.00, imageSrc: 'https://picsum.photos/seed/prod159/400/300', imageHint: 'cesta colgante', stock: 40, status: 'inactivo' },
      { id: 'p160', name: 'Suculentas Surtidas (Pack 3)', properties: [{key: 'Descripción', value: 'Fáciles de cuidar y muy decorativas.'}, {key: 'Variedad', value: 'Echeveria, Sedum, Aloe'}], price: 15.00, imageSrc: 'https://picsum.photos/seed/prod160/400/300', imageHint: 'suculentas', stock: 80, status: 'activo' },
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
      { id: 'p34', name: 'Tapete de Yoga Antideslizante', properties: [{key: 'Descripción', value: '6mm de grosor para máxima comodidad y estabilidad.'}, {key: 'Color', value: 'Azul'}], price: 35.00, imageSrc: 'https://picsum.photos/seed/prod34/400/300', imageHint: 'tapete yoga', stock: 60, status: 'activo' },
      { id: 'p35', name: 'Bandas de Resistencia (Set de 5)', properties: [{key: 'Descripción', value: 'Diferentes niveles de resistencia para un entrenamiento completo.'}, {key: 'Material', value: 'Látex'}], price: 19.99, imageSrc: 'https://picsum.photos/seed/prod35/400/300', imageHint: 'bandas resistencia', stock: 150, status: 'activo' },
      { id: 'p161', name: 'Kettlebell de Competición 16kg', properties: [{key: 'Descripción', value: 'Para entrenamientos funcionales de alta intensidad.'}, {key: 'Material', value: 'Hierro fundido'}], price: 65.00, imageSrc: 'https://picsum.photos/seed/prod161/400/300', imageHint: 'kettlebell', stock: 30, status: 'activo' },
      { id: 'p162', name: 'Barra de Dominadas para Puerta', properties: [{key: 'Descripción', value: 'Entrena tu espalda y brazos sin salir de casa.'}, {key: 'Montaje', value: 'Sin tornillos'}], price: 39.90, imageSrc: 'https://picsum.photos/seed/prod162/400/300', imageHint: 'barra dominadas', stock: 50, status: 'activo' },
      { id: 'p163', name: 'Rueda Abdominal (Ab Roller)', properties: [{key: 'Descripción', value: 'Fortalece tu core de manera efectiva.'}, {key: 'Incluye', value: 'Alfombrilla para rodillas'}], price: 24.95, imageSrc: 'https://picsum.photos/seed/prod163/400/300', imageHint: 'rueda abdominal', stock: 80, status: 'activo' },
      { id: 'p164', name: 'Comba de Velocidad para Crossfit', properties: [{key: 'Descripción', value: 'Cuerda de acero ajustable para saltos dobles.'}, {key: 'Rodamientos', value: 'Alta velocidad'}], price: 18.00, imageSrc: 'https://picsum.photos/seed/prod164/400/300', imageHint: 'comba crossfit', stock: 120, status: 'activo' },
      { id: 'p165', name: 'Foam Roller (Rodillo de Espuma)', properties: [{key: 'Descripción', value: 'Ideal para la recuperación muscular y liberación miofascial.'}, {key: 'Longitud', value: '45 cm'}], price: 29.00, imageSrc: 'https://picsum.photos/seed/prod165/400/300', imageHint: 'foam roller', stock: 90, status: 'activo' },
      { id: 'p166', name: 'Guantes de Entrenamiento', properties: [{key: 'Descripción', value: 'Protegen tus manos y mejoran el agarre.'}, {key: 'Talla', value: 'L'}], price: 22.00, imageSrc: 'https://picsum.photos/seed/prod166/400/300', imageHint: 'guantes gimnasio', stock: 70, status: 'activo' },
      { id: 'p167', name: 'Shaker para Proteínas', properties: [{key: 'Descripción', value: 'Mezcla tus batidos sin grumos.'}, {key: 'Capacidad', value: '700 ml'}], price: 9.99, imageSrc: 'https://picsum.photos/seed/prod167/400/300', imageHint: 'shaker', stock: 200, status: 'activo' },
      { id: 'p168', name: 'Banco de Pesas Ajustable', properties: [{key: 'Descripción', value: 'Múltiples posiciones para una gran variedad de ejercicios.'}, {key: 'Posiciones', value: 'Plano, inclinado, declinado'}], price: 189.00, imageSrc: 'https://picsum.photos/seed/prod168/400/300', imageHint: 'banco pesas', stock: 15, status: 'activo' },
      { id: 'p169', name: 'TRX (Entrenamiento en Suspensión)', properties: [{key: 'Descripción', value: 'Sistema de entrenamiento que utiliza tu propio peso corporal.'}, {key: 'Anclaje', value: 'Puerta y exterior'}], price: 150.00, imageSrc: 'https://picsum.photos/seed/prod169/400/300', imageHint: 'trx', stock: 25, status: 'inactivo' },
      { id: 'p170', name: 'Cinturón de Levantamiento', properties: [{key: 'Descripción', value: 'Proporciona soporte lumbar en levantamientos pesados.'}, {key: 'Material', value: 'Cuero'}], price: 45.00, imageSrc: 'https://picsum.photos/seed/prod170/400/300', imageHint: 'cinturón gym', stock: 40, status: 'activo' },
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
      { id: 'p36', name: 'Teclado Electrónico 61 Teclas', properties: [{key: 'Descripción', value: 'Sensible al tacto, con cientos de sonidos y ritmos.'}, {key: 'Incluye', value: 'Adaptador y atril'}], price: 180.00, imageSrc: 'https://picsum.photos/seed/prod36/400/300', imageHint: 'teclado musical', stock: 15, status: 'activo' },
      { id: 'p37', name: 'Ukelele de Caoba', properties: [{key: 'Descripción', value: 'Instrumento divertido y fácil de aprender.'}, {key: 'Tamaño', value: 'Soprano'}], price: 59.95, imageSrc: 'https://picsum.photos/seed/prod37/400/300', imageHint: 'ukelele', stock: 30, status: 'inactivo' },
      { id: 'p171', name: 'Guitarra Eléctrica tipo Strat', properties: [{key: 'Descripción', value: 'Un icono del rock con un sonido versátil.'}, {key: 'Color', value: 'Sunburst'}], price: 350.00, imageSrc: 'https://picsum.photos/seed/prod171/400/300', imageHint: 'guitarra eléctrica', stock: 10, status: 'activo' },
      { id: 'p172', name: 'Bajo Eléctrico tipo Jazz', properties: [{key: 'Descripción', value: 'Sonido potente y definido, ideal para cualquier estilo.'}, {key: 'Cuerdas', value: '4'}], price: 399.00, imageSrc: 'https://picsum.photos/seed/prod172/400/300', imageHint: 'bajo eléctrico', stock: 7, status: 'activo' },
      { id: 'p173', name: 'Amplificador de Guitarra 15W', properties: [{key: 'Descripción', value: 'Perfecto para practicar en casa con gran sonido.'}, {key: 'Canales', value: 'Clean y Overdrive'}], price: 99.00, imageSrc: 'https://picsum.photos/seed/prod173/400/300', imageHint: 'amplificador', stock: 25, status: 'activo' },
      { id: 'p174', name: 'Micrófono de Condensador USB', properties: [{key: 'Descripción', value: 'Graba voces e instrumentos con calidad de estudio.'}, {key: 'Patrón Polar', value: 'Cardioide'}], price: 129.00, imageSrc: 'https://picsum.photos/seed/prod174/400/300', imageHint: 'micrófono', stock: 35, status: 'activo' },
      { id: 'p175', name: 'Interfaz de Audio 2i2', properties: [{key: 'Descripción', value: 'Conecta tus micrófonos e instrumentos al ordenador.'}, {key: 'Preamps', value: '2'}], price: 160.00, imageSrc: 'https://picsum.photos/seed/prod175/400/300', imageHint: 'interfaz audio', stock: 20, status: 'activo' },
      { id: 'p176', name: 'Pedal de Efectos (Distorsión)', properties: [{key: 'Descripción', value: 'Desde un crunch suave a una distorsión potente.'}, {key: 'Tipo', value: 'Analógico'}], price: 75.00, imageSrc: 'https://picsum.photos/seed/prod176/400/300', imageHint: 'pedal guitarra', stock: 50, status: 'activo' },
      { id: 'p177', name: 'Juego de Cuerdas para Guitarra Acústica', properties: [{key: 'Descripción', value: 'Calibre 12-53, sonido brillante y duradero.'}, {key: 'Material', value: 'Fósforo Bronce'}], price: 12.50, imageSrc: 'https://picsum.photos/seed/prod177/400/300', imageHint: 'cuerdas guitarra', stock: 150, status: 'activo' },
      { id: 'p178', name: 'Afinador Cromático de Pinza', properties: [{key: 'Descripción', value: 'Afina cualquier instrumento de cuerda de forma rápida y precisa.'}, {key: 'Pantalla', value: 'LCD a color'}], price: 15.00, imageSrc: 'https://picsum.photos/seed/prod178/400/300', imageHint: 'afinador', stock: 200, status: 'activo' },
      { id: 'p179', name: 'Batería Electrónica Compacta', properties: [{key: 'Descripción', value: 'Practica en silencio con pads de malla sensibles.'}, {key: 'Módulos', value: '15 kits de batería'}], price: 450.00, imageSrc: 'https://picsum.photos/seed/prod179/400/300', imageHint: 'batería electrónica', stock: 8, status: 'activo' },
      { id: 'p180', name: 'Violín de Estudio 4/4', properties: [{key: 'Descripción', value: 'Ideal para estudiantes, incluye estuche, arco y resina.'}, {key: 'Madera', value: 'Arce'}], price: 199.00, imageSrc: 'https://picsum.photos/seed/prod180/400/300', imageHint: 'violín', stock: 12, status: 'activo' },
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
      { id: 'p38', name: 'Rascador para Gato con Torre', properties: [{key: 'Descripción', value: 'Mantiene a tu gato entretenido y sus uñas sanas.'}, {key: 'Altura', value: '120 cm'}], price: 85.00, imageSrc: 'https://picsum.photos/seed/prod38/400/300', imageHint: 'rascador gato', stock: 20, status: 'activo' },
      { id: 'p39', name: 'Juguete Interactivo para Perro', properties: [{key: 'Descripción', value: 'Dispensador de premios para estimular la mente de tu perro.'}, {key: 'Material', value: 'Caucho resistente'}], price: 18.00, imageSrc: 'https://picsum.photos/seed/prod39/400/300', imageHint: 'juguete perro', stock: 90, status: 'activo' },
      { id: 'p181', name: 'Arena Aglomerante para Gato', properties: [{key: 'Descripción', value: 'Control de olores superior y fácil de limpiar.'}, {key: 'Peso', value: '10 Litros'}], price: 15.00, imageSrc: 'https://picsum.photos/seed/prod181/400/300', imageHint: 'arena gato', stock: 100, status: 'activo' },
      { id: 'p182', name: 'Cama para Perro Ortopédica', properties: [{key: 'Descripción', value: 'Soporte extra para las articulaciones de perros mayores.'}, {key: 'Tamaño', value: 'Grande'}], price: 75.00, imageSrc: 'https://picsum.photos/seed/prod182/400/300', imageHint: 'cama perro', stock: 30, status: 'activo' },
      { id: 'p183', name: 'Comida Húmeda para Gato (Pack 12)', properties: [{key: 'Descripción', value: 'Paté de atún y salmón en salsa.'}, {key: 'Variedad', value: 'Pescado'}], price: 18.90, imageSrc: 'https://picsum.photos/seed/prod183/400/300', imageHint: 'comida gato', stock: 80, status: 'activo' },
      { id: 'p184', name: 'Correa Retráctil 5m', properties: [{key: 'Descripción', value: 'Libertad controlada para tus paseos.'}, {key: 'Soporta hasta', value: '25 kg'}], price: 28.00, imageSrc: 'https://picsum.photos/seed/prod184/400/300', imageHint: 'correa perro', stock: 60, status: 'activo' },
      { id: 'p185', name: 'Fuente de Agua para Mascotas', properties: [{key: 'Descripción', value: 'Estimula a tu mascota a beber más agua.'}, {key: 'Capacidad', value: '2 Litros'}], price: 45.00, imageSrc: 'https://picsum.photos/seed/prod185/400/300', imageHint: 'fuente agua', stock: 40, status: 'activo' },
      { id: 'p186', name: 'Champú Antipulgas para Perro', properties: [{key: 'Descripción', value: 'Limpia y protege a tu mascota de parásitos.'}, {key: 'Contenido', value: '500 ml'}], price: 16.50, imageSrc: 'https://picsum.photos/seed/prod186/400/300', imageHint: 'champú perro', stock: 90, status: 'activo' },
      { id: 'p187', name: 'Snacks Dentales para Perro', properties: [{key: 'Descripción', value: 'Ayudan a mantener una buena higiene bucal.'}, {key: 'Cantidad', value: 'Bolsa de 25'}], price: 12.00, imageSrc: 'https://picsum.photos/seed/prod187/400/300', imageHint: 'snacks perro', stock: 150, status: 'activo' },
      { id: 'p188', name: 'Transportín para Viaje', properties: [{key: 'Descripción', value: 'Aprobado para viajes en avión (consultar aerolínea).'}, {key: 'Tamaño', value: 'Mediano'}], price: 60.00, imageSrc: 'https://picsum.photos/seed/prod188/400/300', imageHint: 'transportín', stock: 25, status: 'inactivo' },
      { id: 'p189', name: 'Juguete con Catnip para Gato', properties: [{key: 'Descripción', value: 'Un ratón relleno de hierba gatera para máxima diversión.'}, {key: 'Material', value: 'Tela resistente'}], price: 6.50, imageSrc: 'https://picsum.photos/seed/prod189/400/300', imageHint: 'juguete gato', stock: 200, status: 'activo' },
      { id: 'p190', name: 'Bebedero y Comedero Automático', properties: [{key: 'Descripción', value: 'Programa las comidas de tu mascota.'}, {key: 'Programas', value: 'Hasta 4 comidas al día'}], price: 95.00, imageSrc: 'https://picsum.photos/seed/prod190/400/300', imageHint: 'comedero automático', stock: 18, status: 'activo' },
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
      { id: 'p40', name: 'Prensa Francesa', properties: [{key: 'Descripción', value: 'Para un café con cuerpo y sabor intenso.'}, {key: 'Capacidad', value: '1 Litro'}], price: 32.00, imageSrc: 'https://picsum.photos/seed/prod40/400/300', imageHint: 'prensa francesa', stock: 40, status: 'activo' },
      { id: 'p41', name: 'Molinillo de Café Manual', properties: [{key: 'Descripción', value: 'Muele tu café al instante para máxima frescura.'}, {key: 'Muelas', value: 'Cerámica'}], price: 45.00, imageSrc: 'https://picsum.photos/seed/prod41/400/300', imageHint: 'molinillo café', stock: 30, status: 'activo' },
      { id: 'p191', name: 'Café en Grano de Etiopía Yirgacheffe', properties: [{key: 'Descripción', value: 'Notas florales y cítricas, tostado ligero.'}, {key: 'Origen', value: 'Etiopía'}, {key: 'Presentación', value: '500g'}], price: 18.00, imageSrc: 'https://picsum.photos/seed/prod191/400/300', imageHint: 'café etiopía', stock: 60, status: 'activo' },
      { id: 'p192', name: 'Cafetera Italiana (Moka)', properties: [{key: 'Descripción', value: 'El método clásico para un espresso intenso en casa.'}, {key: 'Tazas', value: '6 tazas'}], price: 28.00, imageSrc: 'https://picsum.photos/seed/prod192/400/300', imageHint: 'cafetera moka', stock: 50, status: 'activo' },
      { id: 'p193', name: 'Hervidor de Agua Eléctrico con Cuello de Cisne', properties: [{key: 'Descripción', value: 'Control preciso de la temperatura para métodos de vertido.'}, {key: 'Capacidad', value: '0.8 Litros'}], price: 75.00, imageSrc: 'https://picsum.photos/seed/prod193/400/300', imageHint: 'hervidor', stock: 25, status: 'activo' },
      { id: 'p194', name: 'Chemex para 6 Tazas', properties: [{key: 'Descripción', value: 'Para un café limpio, puro y sin sedimentos.'}, {key: 'Material', value: 'Vidrio y madera'}], price: 55.00, imageSrc: 'https://picsum.photos/seed/prod194/400/300', imageHint: 'chemex', stock: 20, status: 'activo' },
      { id: 'p195', name: 'Báscula de Café con Temporizador', properties: [{key: 'Descripción', value: 'La herramienta esencial para un café perfecto.'}, {key: 'Precisión', value: '0.1 gramos'}], price: 35.00, imageSrc: 'https://picsum.photos/seed/prod195/400/300', imageHint: 'báscula café', stock: 45, status: 'activo' },
      { id: 'p196', name: 'Filtros de Papel para Chemex', properties: [{key: 'Descripción', value: 'Filtros patentados para una extracción perfecta.'}, {key: 'Cantidad', value: '100 unidades'}], price: 12.00, imageSrc: 'https://picsum.photos/seed/prod196/400/300', imageHint: 'filtros café', stock: 150, status: 'activo' },
      { id: 'p197', name: 'Taza de Cerámica Artesanal', properties: [{key: 'Descripción', value: 'Cada taza es única. Hecha por artesanos locales.'}, {key: 'Capacidad', value: '300 ml'}], price: 22.00, imageSrc: 'https://picsum.photos/seed/prod197/400/300', imageHint: 'taza cerámica', stock: 60, status: 'activo' },
      { id: 'p198', name: 'Suscripción Mensual de Café', properties: [{key: 'Descripción', value: 'Recibe cada mes un café diferente del mundo.'}, {key: 'Frecuencia', value: 'Mensual'}], price: 20.00, imageSrc: 'https://picsum.photos/seed/prod198/400/300', imageHint: 'suscripción café', stock: 1000, status: 'activo' },
      { id: 'p199', name: 'Café Descafeinado en Grano', properties: [{key: 'Descripción', value: 'Todo el sabor, sin la cafeína. Proceso de agua.'}, {key: 'Origen', value: 'Colombia'}, {key: 'Presentación', value: '500g'}], price: 16.00, imageSrc: 'https://picsum.photos/seed/prod199/400/300', imageHint: 'café descafeinado', stock: 70, status: 'inactivo' },
      { id: 'p200', name: 'Termo de Viaje para Café', properties: [{key: 'Descripción', value: 'Mantiene tu bebida caliente por horas.'}, {key: 'Material', value: 'Acero inoxidable'}], price: 30.00, imageSrc: 'https://picsum.photos/seed/prod200/400/300', imageHint: 'termo café', stock: 80, status: 'activo' },
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
      { id: 'p42', name: 'Protector Solar SPF 50+', properties: [{key: 'Descripción', value: 'Alta protección contra rayos UVA/UVB, resistente al agua.'}, {key: 'Contenido', value: '200 ml'}], price: 21.00, imageSrc: 'https://picsum.photos/seed/prod42/400/300', imageHint: 'protector solar', stock: 180, status: 'activo' },
      { id: 'p43', name: 'Crema Hidratante Facial', properties: [{key: 'Descripción', value: 'Hidratación profunda por 24 horas para piel seca.'}, {key: 'Ingrediente clave', value: 'Ácido Hialurónico'}], price: 30.00, imageSrc: 'https://picsum.photos/seed/prod43/400/300', imageHint: 'crema facial', stock: 100, status: 'activo' },
      { id: 'p201', name: 'Ibuprofeno 400mg', properties: [{key: 'Descripción', value: 'Alivio del dolor y la fiebre.'}, {key: 'Contenido', value: '24 comprimidos'}], price: 5.90, imageSrc: 'https://picsum.photos/seed/prod201/400/300', imageHint: 'ibuprofeno', stock: 300, status: 'activo' },
      { id: 'p202', name: 'Termómetro Digital', properties: [{key: 'Descripción', value: 'Medición rápida y precisa de la temperatura corporal.'}, {key: 'Punta', value: 'Flexible'}], price: 9.95, imageSrc: 'https://picsum.photos/seed/prod202/400/300', imageHint: 'termómetro', stock: 80, status: 'activo' },
      { id: 'p203', name: 'Mascarillas Quirúrgicas (Caja 50)', properties: [{key: 'Descripción', value: 'Protección respiratoria de 3 capas.'}, {key: 'Certificación', value: 'CE'}], price: 12.00, imageSrc: 'https://picsum.photos/seed/prod203/400/300', imageHint: 'mascarillas', stock: 500, status: 'activo' },
      { id: 'p204', name: 'Gel Hidroalcohólico de Manos', properties: [{key: 'Descripción', value: 'Desinfección de manos sin necesidad de agua.'}, {key: 'Contenido', value: '500 ml'}], price: 6.50, imageSrc: 'https://picsum.photos/seed/prod204/400/300', imageHint: 'gel manos', stock: 400, status: 'activo' },
      { id: 'p205', name: 'Suplemento de Melatonina', properties: [{key: 'Descripción', value: 'Ayuda a conciliar el sueño y regular el ritmo circadiano.'}, {key: 'Contenido', value: '60 cápsulas'}], price: 18.00, imageSrc: 'https://picsum.photos/seed/prod205/400/300', imageHint: 'melatonina', stock: 120, status: 'activo' },
      { id: 'p206', name: 'Cepillo de Dientes Eléctrico', properties: [{key: 'Descripción', value: 'Limpieza profesional en casa.'}, {key: 'Tecnología', value: 'Sónica'}], price: 59.90, imageSrc: 'https://picsum.photos/seed/prod206/400/300', imageHint: 'cepillo dientes', stock: 50, status: 'activo' },
      { id: 'p207', name: 'Tiritas Resistentes al Agua', properties: [{key: 'Descripción', value: 'Surtido de apósitos para pequeñas heridas.'}, {key: 'Cantidad', value: '40 unidades'}], price: 4.50, imageSrc: 'https://picsum.photos/seed/prod207/400/300', imageHint: 'tiritas', stock: 600, status: 'activo' },
      { id: 'p208', name: 'Complejo Vitamínico B', properties: [{key: 'Descripción', value: 'Contribuye al funcionamiento normal del sistema nervioso.'}, {key: 'Contenido', value: '90 comprimidos'}], price: 19.90, imageSrc: 'https://picsum.photos/seed/prod208/400/300', imageHint: 'vitamina b', stock: 110, status: 'activo' },
      { id: 'p209', name: 'Tensiómetro de Brazo Digital', properties: [{key: 'Descripción', value: 'Monitoriza tu presión arterial en casa de forma fiable.'}, {key: 'Memoria', value: '120 lecturas'}], price: 45.00, imageSrc: 'https://picsum.photos/seed/prod209/400/300', imageHint: 'tensiómetro', stock: 60, status: 'inactivo' },
      { id: 'p210', name: 'Crema para Dolores Musculares', properties: [{key: 'Descripción', value: 'Efecto calor para aliviar contracturas y dolores.'}, {key: 'Contenido', value: '100g'}], price: 14.00, imageSrc: 'https://picsum.photos/seed/prod210/400/300', imageHint: 'crema dolor', stock: 130, status: 'activo' },
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
    { id: 'user-4', name: 'Ana García', email: 'ana.garcia@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['1', '6'], organizationId: 'org-1' },
    { id: 'user-5', name: 'Jorge Martín', email: 'jorge.martin@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['2', '5', '7'], organizationId: 'org-2' },
    { id: 'user-6', name: 'Vendedor Ejemplo', email: 'vendedor@example.com', role: 'Vendedor', status: 'activo', shopIds: ['4', '11', '8'], organizationId: 'org-4' },
    { id: 'user-7', name: 'Sofía Reyes', email: 'sofia.reyes@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1', '6'], organizationId: 'org-1' },
    { id: 'user-8', name: 'Luis Fernández', email: 'luis.fernandez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['2', '5', '7'], organizationId: 'org-2' },
    { id: 'user-vendedor1', name: 'Vendedor 1', email: 'vendedor1@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
    { id: 'user-vendedor2', name: 'Vendedor 2', email: 'vendedor2@example.com', role: 'Vendedor', status: 'activo', shopIds: ['2', '7', '5'], organizationId: 'org-2' },
    { id: 'user-vendedor3', name: 'Vendedor 3', email: 'vendedor3@example.com', role: 'Vendedor', status: 'activo', shopIds: ['3', '9', '10'], organizationId: 'org-3' },
    { id: 'user-vendedor4', name: 'Vendedor 4', email: 'vendedor4@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['4', '8'], organizationId: 'org-4' },
    { id: 'user-vendedor5', name: 'Vendedor 5', email: 'vendedor5@example.com', role: 'Vendedor', status: 'activo', shopIds: ['6'], organizationId: 'org-1' },
    { id: 'user-vendedor6', name: 'Vendedor 6', email: 'vendedor6@example.com', role: 'Vendedor', status: 'activo', shopIds: ['5', '7'], organizationId: 'org-2' },
    { id: 'user-vendedor7', name: 'Vendedor 7', email: 'vendedor7@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1'], organizationId: 'org-1' },
    { id: 'user-vendedor8', name: 'Vendedor 8', email: 'vendedor8@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['2'], organizationId: 'org-2' },
    { id: 'user-vendedor9', name: 'Vendedor 9', email: 'vendedor9@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1', '6'], organizationId: 'org-1' },
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
        shopsStore[index] = {
            ...shopsStore[index],
            ...updatedShop
        };
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

export function assignUsersToShop(shopId: string, assignedUserIds: string[]) {
    const shop = shopsStore.find(s => s.id === shopId);
    if (!shop) return;

    // Get all vendors from the same organization
    const orgVendors = usersStore.filter(u => u.organizationId === shop.organizationId && u.role === 'Vendedor');

    orgVendors.forEach(vendor => {
        const isAssigned = assignedUserIds.includes(vendor.id);
        const hasShop = vendor.shopIds.includes(shopId);

        if (isAssigned && !hasShop) {
            // Add shop to user
            vendor.shopIds.push(shopId);
        } else if (!isAssigned && hasShop) {
            // Remove shop from user
            vendor.shopIds = vendor.shopIds.filter(id => id !== shopId);
        }
    });
}
