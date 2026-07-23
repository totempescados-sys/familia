export const FORMSPREE_ID = 'xbdqwvpa';
export const PAIRED_FISH = ['trucha', 'dorada', 'lubina', 'merluza', 'salmon', 'rape'];
export const SAVINGS_PER_SERVING = 0.51;
export const BASE_PACK_PRICE = 118;
export const DELIVERY_RADIUS_KM = 10.5;

export const STORES = [
    { id: 'quart', name: 'Valencia: C/ Quart, 139', lat: 39.4699, lon: -0.3763, shortName: 'Valencia', whatsapp: '34960690910' },
    { id: 'sedavi', name: 'Sedaví: Mercado municipal (C/9 Octubre 4A)', lat: 39.4243, lon: -0.3846, shortName: 'Sedaví', whatsapp: '34961212490' }
];

export const BLOCKS = [
    { id: 'A', title: 'Nuestras playas', subtitle: 'Lo mejor de cada lonja (Bloque A)', baseLimit: 8, items: [
        { id: 'gallineta', name: 'Gallineta', img: 'img/gallineta.jpg', tips: ['Al horno en papillote', 'Frita con ajos tiernos', 'Ideal para un suquet suave'] },
        { id: 'clochina', name: 'Clochina valenciana', img: 'img/clochina.jpg', tips: ['Al vapor con limón', 'Con un chorrito de vino blanco', 'Al vapor con pimienta en grano'] },
        { id: 'trucha', name: 'Trucha', img: 'img/trucha.jpg', tips: ['Frita con jamón', 'A la navarra', 'Perfecta en la airfryer'] },
        { id: 'caballa', name: 'Caballa', img: 'img/caballa.jpg', tips: ['A la plancha con ajo y perejil', 'Asada con patatas', 'Maridada en vinagre'] },
        { id: 'lenguado', name: 'Lenguado', img: 'img/lenguado.jpg', tips: ['Meunière (con mantequilla y limón)', 'Vuelta y vuelta a la plancha', 'Al horno con vino blanco'] }
    ]},
    { id: 'B', title: 'Los clásicos', subtitle: 'Los que nunca fallan (Bloque B)', baseLimit: 10, items: [
        { id: 'esgarraet', name: 'Esgarraet', img: 'img/esgarraet.jpg', tips: ['Acompañar con un buen pan tostado', 'Añadir un chorrito de AOVE extra', 'Servir a temperatura ambiente'], ready: true },
        { id: 'langostino', name: 'Langostino cocido', img: 'img/langostino_cocido.jpg', tips: ['Servir frío con salsa rosa', 'Ideal para ensaladillas gourmet', 'Consumir con unas gotas de limón'] },
        { id: 'merluza', name: 'Merluza', img: 'img/merluza.jpg', tips: ['A la romana (rebozada)', 'Al vapor con verduras', 'En salsa verde con almejas'] },
        { id: 'dorada', name: 'Dorada', img: 'img/dorada.jpg', tips: ['A la espalda en plancha', 'A la sal en el horno', 'Al horno con rodajas de limón'] },
        { id: 'lubina', name: 'Lubina', img: 'img/lubina.jpg', tips: ['En airfryer (12-15 min)', 'Al horno con patatas panadera', 'A la espalda con ajitos fritos'] },
        { id: 'emperador', name: 'Emperador', img: 'img/emperador.jpg', tips: ['Vuelta y vuelta con salsa verde', 'A la plancha con limón', 'En datos para brochetas'] },
        { id: 'sepia', name: 'Sepia', img: 'img/sepia.jpg', tips: ['Plancha muy fuerte con picada', 'Guisada con patatas', 'A la sucia (con su propia intención)'] }
    ]},
    { id: 'C', title: 'Los gourmet', subtitle: 'La elección más selecta (Bloque C)', baseLimit: 6, items: [
        { id: 'bacalao', name: 'Bacalao', img: 'img/bacalao.jpg', tips: ['Confitado a baja temperatura', 'Al pil-pil tradicional', 'Al horno con costra de alioli'] },
        { id: 'salmon', name: 'Salmón', img: 'img/salmon.jpg', tips: ['A la plancha skin-side down', 'En la airfryer con especias', 'Al horno con costra de sésamo'] },
        { id: 'atun', name: 'Atún', img: 'img/atun.jpg', tips: ['Solo sellar fuerte por fuera', 'En tataki con soja', 'A la plancha vuelta y vuelta'] },
        { id: 'rape', name: 'Cola de rape', img: 'img/rape.jpg', tips: ['Ideal para arroces y guisos', 'A la plancha con pimentón', 'Al horno con salsa de almendras'] },
        { id: 'calamar', name: 'Calamar playa', img: 'img/calamar.jpg', tips: ['Plancha rápida (2 min por lado)', 'A la andaluza (enharinado)', 'Salteado con ajos tiernos'] }
    ]}
];

export const EXTRAS = [
    { id: 'tellinas', name: 'Tellinas congeladas', sub: '250gr', price: 8.95, img: 'img/tellinas.jpg' },
    { id: 'albondiga', name: 'Albondiga de bacalao artesana', sub: '4 uds', price: 3.99, img: 'img/albondigas.jpg' },
    { id: 'tortitas', name: 'Tortitas de camarón', sub: '4 uds', price: 1.20, img: 'img/tortitas.jpg' },
    { id: 'caldo', name: 'Arreglo para caldo', sub: '1 kg.', price: 3.50, img: 'img/arreglo_caldo.jpg' },
    { id: 'gambon', name: 'Cola de gambón pelada', sub: '250 gr', price: 7.50, img: 'img/gambon.jpg' },
    { id: 'emperador_extra', name: 'Taquitos de emperador', sub: 'Porción', price: 2.50, img: 'img/taquitos_emperador.jpg' },
    { id: 'zamburinas', name: 'Zamburiñas', sub: '4 uds', price: 8.00, img: 'img/zamburinas.jpg' },
    { id: 'huevas', name: 'Huevas de sepia', sub: '250gr', price: 4.99, img: 'img/huevas_sepia.jpg' },
    { id: 'pulpo', name: 'Pata de pulpo', sub: 'unidad', price: 11.50, img: 'img/pulpo.jpg' }
];
