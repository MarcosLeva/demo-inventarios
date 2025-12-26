
import { Shirt, Laptop, Cookie, BookOpen, Wrench, Sprout, Dumbbell, Guitar, Dog, Coffee, Pill } from 'lucide-react';
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
    Pill
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

export const shops: Shop[] = [
  {
    id: '1',
    name: 'Hilos Urbanos',
    specialization: 'Ropa Moderna',
    logoSrc: 'https://picsum.photos/seed/shop1/400/400',
    logoHint: 'tienda de ropa',
    icon: 'Shirt',
    status: 'activo',
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
      {
        id: 'p13',
        name: 'Chaqueta Bomber',
        description: 'Una chaqueta estilosa para cualquier ocasión.',
        price: 89.90,
        imageSrc: 'https://picsum.photos/seed/prod13/400/300',
        imageHint: 'chaqueta',
        stock: 15,
        status: 'activo',
      },
      {
        id: 'p14',
        name: 'Pantalones Chinos',
        description: 'Pantalones versátiles perfectos para la oficina o el fin de semana.',
        price: 64.50,
        imageSrc: 'https://picsum.photos/seed/prod14/400/300',
        imageHint: 'pantalones',
        stock: 30,
        status: 'activo',
      },
      { id: 'p61', name: 'Gorra de Béisbol', description: 'Gorra de algodón con logo bordado.', price: 19.99, imageSrc: 'https://picsum.photos/seed/prod61/400/300', imageHint: 'gorra', stock: 120, status: 'activo' },
      { id: 'p62', name: 'Cinturón de Cuero', description: 'Cinturón de cuero genuino con hebilla metálica.', price: 34.99, imageSrc: 'https://picsum.photos/seed/prod62/400/300', imageHint: 'cinturon', stock: 80, status: 'activo' },
      { id: 'p63', name: 'Bufanda de Lana', description: 'Bufanda suave y cálida para el invierno.', price: 29.99, imageSrc: 'https://picsum.photos/seed/prod63/400/300', imageHint: 'bufanda', stock: 60, status: 'activo' },
      { id: 'p64', name: 'Calcetines de Diseño', description: 'Pack de 3 pares de calcetines divertidos.', price: 15.99, imageSrc: 'https://picsum.photos/seed/prod64/400/300', imageHint: 'calcetines', stock: 200, status: 'activo' },
      { id: 'p65', name: 'Polo de Piqué', description: 'Polo clásico para un look casual y elegante.', price: 39.99, imageSrc: 'https://picsum.photos/seed/prod65/400/300', imageHint: 'polo', stock: 45, status: 'activo' },
      { id: 'p66', name: 'Bañador Estampado', description: 'Bañador corto con estampado tropical.', price: 29.95, imageSrc: 'https://picsum.photos/seed/prod66/400/300', imageHint: 'bañador', stock: 70, status: 'activo' },
      { id: 'p67', name: 'Jersey de Punto', description: 'Jersey de cuello redondo en varios colores.', price: 49.99, imageSrc: 'https://picsum.photos/seed/prod67/400/300', imageHint: 'jersey', stock: 0, status: 'inactivo' },
      { id: 'p68', name: 'Gafas de Sol', description: 'Gafas de sol con protección UV400.', price: 45.00, imageSrc: 'https://picsum.photos/seed/prod68/400/300', imageHint: 'gafas sol', stock: 90, status: 'activo' },
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
      {
        id: 'p15',
        name: 'Smartwatch 2.0',
        description: 'Monitoriza tu actividad y notificaciones desde tu muñeca.',
        price: 249.00,
        imageSrc: 'https://picsum.photos/seed/prod15/400/300',
        imageHint: 'smartwatch',
        stock: 40,
        status: 'activo',
      },
      {
        id: 'p16',
        name: 'Tableta Gráfica',
        description: 'Ideal para diseñadores y artistas digitales.',
        price: 450.00,
        imageSrc: 'https://picsum.photos/seed/prod16/400/300',
        imageHint: 'tableta gráfica',
        stock: 22,
        status: 'activo',
      },
      { id: 'p69', name: 'Ratón Gaming RGB', description: 'Ratón ergonómico con iluminación personalizable.', price: 59.99, imageSrc: 'https://picsum.photos/seed/prod69/400/300', imageHint: 'ratón gaming', stock: 75, status: 'activo' },
      { id: 'p70', name: 'Teclado Mecánico', description: 'Teclado mecánico con switches Cherry MX.', price: 129.99, imageSrc: 'https://picsum.photos/seed/prod70/400/300', imageHint: 'teclado mecánico', stock: 40, status: 'activo' },
      { id: 'p71', name: 'Monitor 4K 27"', description: 'Monitor de alta resolución para trabajo y ocio.', price: 499.99, imageSrc: 'https://picsum.photos/seed/prod71/400/300', imageHint: 'monitor 4k', stock: 15, status: 'activo' },
      { id: 'p72', name: 'Webcam HD 1080p', description: 'Webcam con micrófono integrado para videollamadas.', price: 49.95, imageSrc: 'https://picsum.photos/seed/prod72/400/300', imageHint: 'webcam', stock: 60, status: 'activo' },
      { id: 'p73', name: 'Disco Duro Externo 2TB', description: 'Almacenamiento portátil USB 3.0.', price: 79.90, imageSrc: 'https://picsum.photos/seed/prod73/400/300', imageHint: 'disco duro', stock: 80, status: 'activo' },
      { id: 'p74', name: 'Router WiFi 6', description: 'Router de alta velocidad para una conexión estable.', price: 159.00, imageSrc: 'https://picsum.photos/seed/prod74/400/300', imageHint: 'router wifi', stock: 30, status: 'activo' },
      { id: 'p75', name: 'Altavoz Bluetooth', description: 'Altavoz portátil con sonido envolvente.', price: 89.99, imageSrc: 'https://picsum.photos/seed/prod75/400/300', imageHint: 'altavoz bluetooth', stock: 0, status: 'inactivo' },
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
      {
        id: 'p17',
        name: 'Tarta de Manzana',
        description: 'La clásica tarta de manzana de la abuela.',
        price: 25.00,
        imageSrc: 'https://picsum.photos/seed/prod17/400/300',
        imageHint: 'tarta manzana',
        stock: 12,
        status: 'activo',
      },
       {
        id: 'p18',
        name: 'Galletas con Chips de Chocolate',
        description: 'Media docena de galletas recién horneadas.',
        price: 9.50,
        imageSrc: 'https://picsum.photos/seed/prod18/400/300',
        imageHint: 'galletas chocolate',
        stock: 0,
        status: 'inactivo',
      },
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
      {
        id: 'p19',
        name: 'Poesía de Medianoche',
        description: 'Una colección de poemas introspectivos.',
        price: 12.00,
        imageSrc: 'https://picsum.photos/seed/prod19/400/300',
        imageHint: 'libro poesía',
        stock: 50,
        status: 'activo',
      },
      {
        id: 'p20',
        name: 'Biografía de un Genio',
        description: 'La vida y obra de una mente brillante.',
        price: 22.50,
        imageSrc: 'https://picsum.photos/seed/prod20/400/300',
        imageHint: 'libro biografía',
        stock: 20,
        status: 'activo',
      },
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
        { id: 'p21', name: 'Filtro de Aceite Gohner G-28', description: 'Alta eficiencia para motores a gasolina. Compatible con modelos 2010-2020.', price: 12.50, imageSrc: 'https://picsum.photos/seed/prod21/400/300', imageHint: 'filtro aceite', stock: 150, status: 'activo' },
        { id: 'p22', name: 'Batería Gohner S-42B20R', description: 'Acumulador de 12V, 45Ah. Larga duración y arranque confiable.', price: 95.00, imageSrc: 'https://picsum.photos/seed/prod22/400/300', imageHint: 'bateria auto', stock: 30, status: 'activo' },
        { id: 'p23', name: 'Balatas Delanteras G-784', description: 'Juego de balatas cerámicas para un frenado silencioso y seguro.', price: 45.99, imageSrc: 'https://picsum.photos/seed/prod23/400/300', imageHint: 'balatas freno', stock: 80, status: 'activo' },
        { id: 'p24', name: 'Anticongelante G-Cool 50/50', description: 'Protección para el sistema de enfriamiento. Garrafa de 1 galón.', price: 18.99, imageSrc: 'https://picsum.photos/seed/prod24/400/300', imageHint: 'anticongelante', stock: 120, status: 'activo' },
        { id: 'p25', name: 'Bujía de Iridio G-Power', description: 'Mejora la eficiencia de combustible y el rendimiento del motor. Pack de 4.', price: 32.00, imageSrc: 'https://picsum.photos/seed/prod25/400/300', imageHint: 'bujias', stock: 0, status: 'inactivo' }
    ]
  },
  {
    id: '6',
    name: 'El Jardín Secreto',
    specialization: 'Artículos de Jardinería',
    logoSrc: 'https://picsum.photos/seed/shop6/400/400',
    logoHint: 'tienda de jardinería',
    icon: 'Sprout',
    status: 'activo',
    inventory: [
        { id: 'p26', name: 'Set de Herramientas de Jardín', description: 'Incluye pala, rastrillo y podadoras.', price: 39.99, imageSrc: 'https://picsum.photos/seed/prod26/400/300', imageHint: 'herramientas jardín', stock: 55, status: 'activo' },
        { id: 'p27', name: 'Semillas de Girasol Gigante', description: 'Paquete para cultivar tus propios girasoles.', price: 5.99, imageSrc: 'https://picsum.photos/seed/prod27/400/300', imageHint: 'semillas girasol', stock: 150, status: 'activo' },
        { id: 'p28', name: 'Maceta de Cerámica', description: 'Elegante maceta para interiores, 25cm de diámetro.', price: 22.50, imageSrc: 'https://picsum.photos/seed/prod28/400/300', imageHint: 'maceta cerámica', stock: 80, status: 'activo' },
        { id: 'p29', name: 'Guantes de Jardinería', description: 'Protege tus manos con estilo y comodidad.', price: 12.99, imageSrc: 'https://picsum.photos/seed/prod29/400/300', imageHint: 'guantes jardín', stock: 120, status: 'activo' },
        { id: 'p30', name: 'Regadera Metálica', description: 'Capacidad de 5 litros, diseño vintage.', price: 28.00, imageSrc: 'https://picsum.photos/seed/prod30/400/300', imageHint: 'regadera', stock: 0, status: 'inactivo' }
    ]
  },
  {
    id: '7',
    name: 'Deporte Total',
    specialization: 'Artículos Deportivos',
    logoSrc: 'https://picsum.photos/seed/shop7/400/400',
    logoHint: 'tienda de deportes',
    icon: 'Dumbbell',
    status: 'activo',
    inventory: [
        { id: 'p31', name: 'Balón de Fútbol Profesional', description: 'Balón oficial de la liga, tamaño 5.', price: 95.00, imageSrc: 'https://picsum.photos/seed/prod31/400/300', imageHint: 'balón fútbol', stock: 40, status: 'activo' },
        { id: 'p32', name: 'Esterilla de Yoga', description: 'Antideslizante y ecológica.', price: 35.00, imageSrc: 'https://picsum.photos/seed/prod32/400/300', imageHint: 'esterilla yoga', stock: 90, status: 'activo' },
        { id: 'p33', name: 'Juego de Mancuernas Ajustables', description: 'De 2.5kg a 24kg. Ahorra espacio.', price: 250.00, imageSrc: 'https://picsum.photos/seed/prod33/400/300', imageHint: 'mancuernas', stock: 15, status: 'activo' },
        { id: 'p34', name: 'Cuerda para Saltar de Velocidad', description: 'Perfecta para cardio y entrenamiento funcional.', price: 18.50, imageSrc: 'https://picsum.photos/seed/prod34/400/300', imageHint: 'cuerda saltar', stock: 200, status: 'activo' },
        { id: 'p35', name: 'Zapatillas de Running', description: 'Máxima amortiguación y soporte.', price: 120.00, imageSrc: 'https://picsum.photos/seed/prod35/400/300', imageHint: 'zapatillas running', stock: 65, status: 'activo' }
    ]
  },
  {
    id: '8',
    name: 'Acordes y Melodías',
    specialization: 'Instrumentos Musicales',
    logoSrc: 'https://picsum.photos/seed/shop8/400/400',
    logoHint: 'tienda de música',
    icon: 'Guitar',
    status: 'inactivo',
    inventory: [
        { id: 'p36', name: 'Guitarra Acústica', description: 'Ideal para principiantes, sonido cálido.', price: 150.00, imageSrc: 'https://picsum.photos/seed/prod36/400/300', imageHint: 'guitarra acústica', stock: 25, status: 'activo' },
        { id: 'p37', name: 'Teclado Electrónico de 61 Teclas', description: 'Con múltiples sonidos y ritmos.', price: 220.00, imageSrc: 'https://picsum.photos/seed/prod37/400/300', imageHint: 'teclado electrónico', stock: 20, status: 'activo' },
        { id: 'p38', name: 'Ukelele Soprano', description: 'Divertido y fácil de tocar.', price: 60.00, imageSrc: 'https://picsum.photos/seed/prod38/400/300', imageHint: 'ukelele', stock: 50, status: 'activo' },
        { id: 'p39', name: 'Micrófono de Condensador USB', description: 'Calidad de estudio para grabaciones en casa.', price: 110.00, imageSrc: 'https://picsum.photos/seed/prod39/400/300', imageHint: 'micrófono usb', stock: 35, status: 'activo' },
        { id: 'p40', name: 'Batería Electrónica Compacta', description: 'Silenciosa y perfecta para practicar.', price: 450.00, imageSrc: 'https://picsum.photos/seed/prod40/400/300', imageHint: 'batería electrónica', stock: 0, status: 'inactivo' }
    ]
  },
  {
    id: '9',
    name: 'La Caja de Herramientas',
    specialization: 'Ferretería y Bricolaje',
    logoSrc: 'https://picsum.photos/seed/shop9/400/400',
    logoHint: 'ferretería',
    icon: 'Wrench',
    status: 'activo',
    inventory: [
        { id: 'p41', name: 'Taladro Inalámbrico 18V', description: 'Potente y versátil, con 2 baterías.', price: 129.99, imageSrc: 'https://picsum.photos/seed/prod41/400/300', imageHint: 'taladro inalámbrico', stock: 40, status: 'activo' },
        { id: 'p42', name: 'Juego de 100 Puntas para Atornillar', description: 'Para todo tipo de tornillos.', price: 25.00, imageSrc: 'https://picsum.photos/seed/prod42/400/300', imageHint: 'puntas atornillar', stock: 150, status: 'activo' },
        { id: 'p43', name: 'Sierra Circular de Mano', description: 'Cortes precisos en madera.', price: 89.90, imageSrc: 'https://picsum.photos/seed/prod43/400/300', imageHint: 'sierra circular', stock: 30, status: 'activo' },
        { id: 'p44', name: 'Caja de Herramientas Metálica', description: 'Resistente y con 5 compartimentos.', price: 65.00, imageSrc: 'https://picsum.photos/seed/prod44/400/300', imageHint: 'caja herramientas', stock: 0, status: 'inactivo' },
        { id: 'p45', name: 'Flexómetro 8 metros', description: 'Cinta métrica resistente a impactos.', price: 15.75, imageSrc: 'https://picsum.photos/seed/prod45/400/300', imageHint: 'flexómetro', stock: 200, status: 'activo' }
    ]
  },
  {
    id: '10',
    name: 'Patitas Felices',
    specialization: 'Tienda de Mascotas',
    logoSrc: 'https://picsum.photos/seed/shop10/400/400',
    logoHint: 'tienda mascotas',
    icon: 'Dog',
    status: 'activo',
    inventory: [
        { id: 'p46', name: 'Pienso para Perro Adulto', description: 'Saco de 15kg, sabor pollo y arroz.', price: 45.00, imageSrc: 'https://picsum.photos/seed/prod46/400/300', imageHint: 'pienso perro', stock: 80, status: 'activo' },
        { id: 'p47', name: 'Arena Aglomerante para Gatos', description: 'Control de olores superior, 10L.', price: 12.50, imageSrc: 'https://picsum.photos/seed/prod47/400/300', imageHint: 'arena gatos', stock: 120, status: 'activo' },
        { id: 'p48', name: 'Rascador para Gatos con Plataformas', description: 'Mantiene las uñas sanas y entretiene.', price: 75.00, imageSrc: 'https://picsum.photos/seed/prod48/400/300', imageHint: 'rascador gatos', stock: 25, status: 'activo' },
        { id: 'p49', name: 'Cama para Mascota Mediana', description: 'Suave y lavable.', price: 32.99, imageSrc: 'https://picsum.photos/seed/prod49/400/300', imageHint: 'cama mascota', stock: 40, status: 'activo' },
        { id: 'p50', name: 'Juguete Interactivo para Perro', description: 'Dispensador de premios para estimular la mente.', price: 19.99, imageSrc: 'https://picsum.photos/seed/prod50/400/300', imageHint: 'juguete perro', stock: 60, status: 'activo' }
    ]
  },
  {
    id: '11',
    name: 'Café del Sol',
    specialization: 'Cafetería de Especialidad',
    logoSrc: 'https://picsum.photos/seed/shop11/400/400',
    logoHint: 'cafetería',
    icon: 'Coffee',
    status: 'activo',
    inventory: [
        { id: 'p51', name: 'Café en Grano de Colombia', description: 'Bolsa de 250g, tueste medio.', price: 12.00, imageSrc: 'https://picsum.photos/seed/prod51/400/300', imageHint: 'café grano', stock: 100, status: 'activo' },
        { id: 'p52', name: 'Prensa Francesa de 1L', description: 'Prepara un café delicioso y con cuerpo.', price: 35.00, imageSrc: 'https://picsum.photos/seed/prod52/400/300', imageHint: 'prensa francesa', stock: 30, status: 'activo' },
        { id: 'p53', name: 'Molinillo de Café Manual', description: 'Muele los granos al momento para máxima frescura.', price: 45.00, imageSrc: 'https://picsum.photos/seed/prod53/400/300', imageHint: 'molinillo café', stock: 25, status: 'activo' },
        { id: 'p54', name: 'Taza de Cerámica Artesanal', description: 'Cada pieza es única.', price: 20.00, imageSrc: 'https://picsum.photos/seed/prod54/400/300', imageHint: 'taza cerámica', stock: 50, status: 'activo' },
        { id: 'p55', name: 'Siropes para Café (Set de 3)', description: 'Vainilla, Caramelo y Avellana.', price: 18.00, imageSrc: 'https://picsum.photos/seed/prod55/400/300', imageHint: 'siropes café', stock: 0, status: 'inactivo' }
    ]
  },
  {
    id: '12',
    name: 'Bienestar y Salud',
    specialization: 'Farmacia y Parafarmacia',
    logoSrc: 'https://picsum.photos/seed/shop12/400/400',
    logoHint: 'farmacia',
    icon: 'Pill',
    status: 'activo',
    inventory: [
        { id: 'p56', name: 'Crema Hidratante Facial SPF 30', description: 'Protección solar y hidratación diaria.', price: 28.50, imageSrc: 'https://picsum.photos/seed/prod56/400/300', imageHint: 'crema facial', stock: 70, status: 'activo' },
        { id: 'p57', name: 'Complejo Vitamínico (60 cápsulas)', description: 'Refuerza tu sistema inmunológico.', price: 19.95, imageSrc: 'https://picsum.photos/seed/prod57/400/300', imageHint: 'vitaminas', stock: 90, status: 'activo' },
        { id: 'p58', name: 'Termómetro Digital', description: 'Lectura rápida y precisa.', price: 9.99, imageSrc: 'https://picsum.photos/seed/prod58/400/300', imageHint: 'termómetro', stock: 150, status: 'activo' },
        { id: 'p59', name: 'Gel de Aloe Vera Puro', description: 'Calma e hidrata la piel irritada. 250ml.', price: 12.80, imageSrc: 'https://picsum.photos/seed/prod59/400/300', imageHint: 'aloe vera', stock: 60, status: 'activo' },
        { id: 'p60', name: 'Tiritas Resistentes al Agua (Caja de 40)', description: 'Surtido de varios tamaños.', price: 4.50, imageSrc: 'https://picsum.photos/seed/prod60/400/300', imageHint: 'tiritas', stock: 300, status: 'activo' }
    ]
  }
];

const users: AppUser[] = [
    { id: 'user-1', name: 'Admin Principal', email: 'admin@example.com', role: 'Admin', status: 'activo', shopIds: [] },
    { id: 'user-2', name: 'Laura Méndez', email: 'laura.mendez@example.com', role: 'Admin', status: 'activo', shopIds: [] },
    { id: 'user-3', name: 'Carlos Pérez', email: 'carlos.perez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['2', '5'] },
    { id: 'user-4', name: 'Ana García', email: 'ana.garcia@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['3', '11'] },
    { id: 'user-5', name: 'Jorge Martín', email: 'jorge.martin@example.com', role: 'Admin', status: 'inactivo', shopIds: [] },
    { id: 'user-6', name: 'Vendedor', email: 'vendedor@example.com', role: 'Vendedor', status: 'activo', shopIds: ['1', '7'] },
    { id: 'user-7', name: 'Sofía Reyes', email: 'sofia.reyes@example.com', role: 'Vendedor', status: 'activo', shopIds: ['4', '8', '9'] },
    { id: 'user-8', name: 'Luis Fernández', email: 'luis.fernandez@example.com', role: 'Vendedor', status: 'activo', shopIds: ['10', '12'] },
    { id: 'user-9', name: 'Elena Jiménez', email: 'elena.jimenez@example.com', role: 'Admin', status: 'activo', shopIds: [] },
    { id: 'user-10', name: 'Miguel Ángel', email: 'miguel.angel@example.com', role: 'Vendedor', status: 'inactivo', shopIds: ['1', '2', '3', '4'] },
    { id: 'user-11', name: 'Patricia Moreno', email: 'patricia.moreno@example.com', role: 'Vendedor', status: 'activo', shopIds: ['6'] },
    { id: 'user-12', name: 'David Navarro', email: 'david.navarro@example.com', role: 'Admin', status: 'activo', shopIds: [] },
];

// In-memory data store
let shopsStore: Shop[] = JSON.parse(JSON.stringify(shops));
let usersStore: AppUser[] = JSON.parse(JSON.stringify(users));

export function getShops(user?: AppUser | null) {
  if (user?.role === 'Vendedor' && user.shopIds.length > 0) {
    return JSON.parse(JSON.stringify(shopsStore.filter(shop => user.shopIds.includes(shop.id))));
  }
  return JSON.parse(JSON.stringify(shopsStore));
}

export function getShopById(id: string | number) {
  const shop = shopsStore.find((shop) => shop.id === String(id));
  if (!shop) return undefined;
  
  // Return a deep copy to avoid direct mutation of the store
  return JSON.parse(JSON.stringify(shop));
}

export function getAllProducts(user?: AppUser | null) {
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

export function getUsers() {
    return JSON.parse(JSON.stringify(usersStore));
}

export function getUserByEmail(email: string): AppUser | undefined {
    const user = usersStore.find(user => user.email === email);
    if (!user) return undefined;
    return JSON.parse(JSON.stringify(user));
}

export function addUser(user: Omit<AppUser, 'id'>) {
    const newUser: AppUser = {
        ...user,
        id: `user-${Date.now()}`,
    }
    usersStore.unshift(newUser);
}

export function updateUser(updatedUser: AppUser) {
    const index = usersStore.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
        usersStore[index] = updatedUser;
    }
}

export function deleteUser(userId: string) {
    usersStore = usersStore.filter(user => user.id !== userId);
}


export function addShop(shop: Omit<Shop, 'id'|'inventory'>) {
    const newShop: Shop = {
        ...shop,
        id: `shop-${Date.now()}`,
        inventory: []
    }
    shopsStore.unshift(newShop);
}

export function updateShop(updatedShop: Shop) {
    const index = shopsStore.findIndex(shop => shop.id === updatedShop.id);
    if (index !== -1) {
        shopsStore[index] = updatedShop;
    }
}

export function addProduct(shopId: string, product: Omit<Product, 'id' | 'imageSrc' | 'imageHint'>) {
    const shop = getShopById(shopId);
    if (shop) {
        const newProduct: Product = {
            ...product,
            id: `p${Date.now()}`,
            imageSrc: `https://picsum.photos/seed/new${Date.now()}/400/300`,
            imageHint: 'nuevo producto',
        };
        const originalShop = shopsStore.find(s => s.id === shopId);
        originalShop?.inventory.unshift(newProduct);
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

    

    
