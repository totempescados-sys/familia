import { useState, useEffect, useRef, useMemo } from 'react';

// --- COMPONENTE SEGURO DE IMAGEN (Evita caídas si el archivo no existe) ---
const SafeImage = ({ src, alt, className, fallbackText }) => {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
        return (
            <div className={`${className} bg-slate-100 flex items-center justify-center p-2 text-center border border-slate-200/50`}>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">
                    {fallbackText || 'TÓTEM'}
                </span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
        />
    );
};

// --- ICONOS ---
const IconFish = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.2" className="opacity-20"><path d="M2 12c.5-2 3-5 10-5 3.5 0 6.5 1.5 8 3.5.5.5 1 1 1.5 1.5l-1.5 1.5c-1.5 2-4.5 3.5-8 3.5-7 0-9.5-3-10-5Z"/><path d="M22 12c-1.5 1-2 4-2 4 s-3-1-3-4 3-4 3-4 0 3 2 4Z"/><circle cx="16" cy="11" r="1" fill="currentColor"/></svg>;
const IconPerson = ({qty, color="currentColor"}) => (
    <div className="flex -space-x-1" style={{color}}>
        {[...Array(qty)].map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        ))}
    </div>
);
const IconWhatsApp = ({size=18, color="currentColor"}) => <svg viewBox="0 0 24 24" width={size} height={size} fill={color}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045a11.811 11.811 0 001.592 5.96L0 24l6.117-1.605a11.782 11.782 0 005.925 1.598h.005c6.635 0 12.043-5.411 12.046-12.046a11.818 11.818 0 00-3.52-8.511z"/></svg>;
const IconSparkles = () => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-white"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/></svg>;
const IconSnow = () => <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"/></svg>;
const IconCart = ({className}) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
);
const IconArrowLeft = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const IconInfo = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;

const Header = ({ currentStep, setStep, savings }) => {
    if (currentStep === 0 || currentStep === 7) return null;

    const steps = [
        { id: 1, label: 'Inicio' },
        { id: 2, label: 'Bloque A' },
        { id: 3, label: 'Bloque B' },
        { id: 4, label: 'Bloque C' },
        { id: 5, label: 'Revisión' },
        { id: 6, label: 'Envío' }
    ];

    const activeIndex = steps.findIndex(s => s.id === currentStep);
    const progress = activeIndex === -1 ? (currentStep > 6 ? 100 : 0) : (activeIndex / (steps.length - 1)) * 100;

    return (
        <div className="fixed top-0 left-0 w-full z-[250] bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm animate-fade">
            <div className="max-w-4xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setStep(currentStep - 1)}
                            className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                            title="Volver atrás"
                        >
                            <IconArrowLeft />
                        </button>
                        <span className="text-[9px] font-black uppercase text-blue-600 tracking-widest hidden sm:inline">Configurando tu pack</span>
                    </div>

                    {(currentStep >= 2 && currentStep <= 5) && (
                        <div className="animate-savings bg-green-600 text-white px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 border border-green-400">
                            <IconSparkles />
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[7px] font-black uppercase tracking-widest opacity-80">Ahorro</span>
                                <span className="text-[10px] font-black tracking-tight">{savings}€</span>
                            </div>
                        </div>
                    )}

                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="progress-bar-segment h-full bg-blue-600 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

const FORMSPREE_ID = 'xbdqwvpa';
const PAIRED_FISH = ['trucha', 'dorada', 'lubina', 'merluza', 'salmon', 'rape'];
const SAVINGS_PER_SERVING = 0.51;
const BASE_PACK_PRICE = 118;
const DELIVERY_RADIUS_KM = 10.5;

const STORES = [
    { id: 'quart', name: 'Valencia: C/ Quart, 139', lat: 39.4699, lon: -0.3763, shortName: 'Valencia', whatsapp: '34960690910' },
    { id: 'sedavi', name: 'Sedaví: Mercado municipal (C/9 Octubre 4A)', lat: 39.4243, lon: -0.3846, shortName: 'Sedaví', whatsapp: '34961212490' }
];

const BLOCKS = [
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

const EXTRAS = [
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

function App() {
    const [step, setStep] = useState(0);
    const [packCount, setPackCount] = useState(1);
    const [selections, setSelections] = useState({});
    const [extraSelections, setExtraSelections] = useState({});
    const [extraPage, setExtraPage] = useState(0);
    const [userData, setUserData] = useState({
        name: '', email: '', phone: '', deliveryMethod: 'recogida',
        pickupLocation: STORES[0].name, pickupDate: '', pickupTime: '',
        address: '', comments: '',
        whatsappOptIn: false, marketingStore: '',
        preservation: 'fresco',
        termsAccepted: false
    });
    const [addressVerified, setAddressVerified] = useState(false);
    const [showUpsell, setShowUpsell] = useState(false);
    const [showMarketingModal, setShowMarketingModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showDoublePackModal, setShowDoublePackModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [addressSearchError, setAddressSearchError] = useState(false);
    const [error, setError] = useState('');
    const [userGeo, setUserGeo] = useState(null);

    const errorTimer = useRef(null);
    const searchTimeout = useRef(null);
    const upsellScrollRef = useRef(null);
    const nextButtonRef = useRef(null);

    useEffect(() => {
        const rootEl = document.getElementById('root');
        if (rootEl) {
            setTimeout(() => rootEl.classList.add('loaded'), 50);
        }
    }, []);

    useEffect(() => {
        const savedData = localStorage.getItem('totem_pack_draft');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setSelections(parsed.selections || {});
                setExtraSelections(parsed.extraSelections || {});
                setUserData(prev => ({ ...prev, ...parsed.userData }));
                setPackCount(parsed.packCount || 1);
                if (parsed.step > 0 && parsed.step < 7) setStep(parsed.step);
            } catch (e) {
                localStorage.removeItem('totem_pack_draft');
            }
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('totem_pack_draft', JSON.stringify({
                selections, extraSelections, userData, packCount, step
            }));
        }, 1000);
        return () => clearTimeout(timer);
    }, [selections, extraSelections, userData, packCount, step]);

    useEffect(() => {
        if (step >= 2 && step <= 4) {
            const block = BLOCKS[step - 2];
            const currentLimit = block.baseLimit * packCount;
            const isBlockFull = calcBlockTotal(block.id) === currentLimit;

            if (isBlockFull) {
                setTimeout(() => {
                    if (nextButtonRef.current) {
                        nextButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 200);
            }
        }
    }, [selections, step, packCount]);

    const randomChefTips = useMemo(() => {
        const map = {};
        BLOCKS.forEach(b => {
            b.items.forEach(item => {
                const randomIndex = Math.floor(Math.random() * item.tips.length);
                map[item.id] = item.tips[randomIndex];
            });
        });
        return map;
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (step === 6 && !userGeo && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUserGeo({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude,
                        mapsLink: `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`
                    });
                },
                null, { enableHighAccuracy: true }
            );
        }
    }, [step]);

    useEffect(() => {
        if (error) {
            if (errorTimer.current) clearTimeout(errorTimer.current);
            errorTimer.current = setTimeout(() => setError(''), 5000);
        }
        return () => { if (errorTimer.current) clearTimeout(errorTimer.current); };
    }, [error]);

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    };

    const sortedStores = useMemo(() => {
        if (!userGeo) return STORES;
        return [...STORES].sort((a, b) => {
            const distA = getDistance(userGeo.lat, userGeo.lon, a.lat, a.lon);
            const distB = getDistance(userGeo.lat, userGeo.lon, b.lat, b.lon);
            return distA - distB;
        });
    }, [userGeo]);

    useEffect(() => {
        if (userData.deliveryMethod === 'recogida') {
            setUserData(prev => ({ ...prev, pickupLocation: sortedStores[0].name }));
        }
    }, [sortedStores]);

    function getFutureDates(startOffset) {
        const dates = [];
        const today = new Date();
        let dayCounter = startOffset;
        while (dates.length < 12 && dayCounter < 120) {
            const date = new Date(today);
            date.setDate(today.getDate() + dayCounter);
            const isHolidayCV = (d) => {
                const m = d.getMonth() + 1;
                const day = d.getDate();
                const holidays = ['1-1','1-6','3-19','4-18','4-21','5-1','8-15','10-9','10-12','11-1','12-6','12-8','12-25'];
                return holidays.includes(`${m}-${day}`);
            };
            const isAugust = date.getMonth() === 7; // Cerrado por vacaciones en agosto
            if (!isAugust && date.getDay() >= 2 && date.getDay() <= 6 && !isHolidayCV(date)) {
                const label = date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
                dates.push({ value: label, label: label.charAt(0).toUpperCase() + label.slice(1) });
            }
            dayCounter++;
        }
        return dates;
    }

    const pickupDates = useMemo(() => getFutureDates(userData.preservation === 'congelado' ? 2 : 1), [userData.preservation]);
    const deliveryDates = useMemo(() => getFutureDates(userData.preservation === 'congelado' ? 3 : 2), [userData.preservation]);

    const pickupTimes = useMemo(() => {
        const slots = [];
        for (let h = 10; h < 14; h++) { slots.push(`${h}:00`, `${h}:30`); }
        slots.push('14:00'); return slots;
    }, []);

    const deliveryTimes = [
        { v: '08:00 - 10:00', l: '08:00 a 10:00 (OCUPADA)', d: true },
        { v: '10:00 - 12:00', l: '10:00 a 12:00 (OCUPADA)', d: true },
        { v: '12:00 - 14:00', l: '12:00 a 14:00 (DISPONIBLE)', d: false }
    ];

    const handleAddressInput = (val) => {
        setUserData(p => ({ ...p, address: val }));
        setAddressVerified(false);
        setAddressSearchError(false);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        if (val.length < 4) return setShowSuggestions(false);
        searchTimeout.current = setTimeout(async () => {
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(val)}&countrycodes=es&limit=4`);
                if (!res.ok) throw new Error('Nominatim error');
                const data = await res.json();
                setSuggestions(data);
                setShowSuggestions(true);
            } catch(e) {
                setSuggestions([]);
                setShowSuggestions(false);
                setAddressSearchError(true);
            }
        }, 400);
    };

    const onSelectAddress = (s) => {
        // Se acepta la dirección si está dentro del radio de CUALQUIERA de las dos tiendas
        const nearestDist = Math.min(...STORES.map(store => getDistance(store.lat, store.lon, parseFloat(s.lat), parseFloat(s.lon))));
        if (nearestDist <= DELIVERY_RADIUS_KM) {
            setUserData(p => ({ ...p, address: s.display_name }));
            setAddressVerified(true);
            setError('');
        } else {
            setAddressVerified(false);
            setError(`LO SENTIMOS: ESTA DIRECCIÓN ESTÁ A ${Math.round(nearestDist)}KM DE LA TIENDA MÁS CERCANA (LÍMITE ${DELIVERY_RADIUS_KM}KM).`);
            setUserData(p => ({ ...p, address: '' }));
        }
        setShowSuggestions(false);
    };

    const handleNameChange = (val) => {
        setUserData(prev => ({ ...prev, name: val }));
        const savedProfile = localStorage.getItem('totem_user_profile');
        if (savedProfile) {
            try {
                const profile = JSON.parse(savedProfile);
                if (profile && profile.name && val.length >= 3 && profile.name.toLowerCase().startsWith(val.toLowerCase())) {
                    if (!userData.phone || !userData.email) {
                        setUserData(prev => ({
                            ...prev,
                            name: profile.name,
                            phone: profile.phone,
                            email: profile.email
                        }));
                    }
                }
            } catch (e) {
                localStorage.removeItem('totem_user_profile');
            }
        }
    };

    const calcBlockTotal = (id) => {
        const block = BLOCKS.find(b => b.id === id);
        return block.items.reduce((s, i) => s + (selections[i.id] || 0), 0);
    };

    const totalServingsSelected = useMemo(() => {
        return Object.values(selections).reduce((a, b) => a + b, 0);
    }, [selections]);

    const currentTotalSavings = useMemo(() => {
        return (totalServingsSelected * SAVINGS_PER_SERVING).toFixed(2);
    }, [totalServingsSelected]);

    const modifyQty = (itemId, delta, blockId) => {
        const stepVal = PAIRED_FISH.includes(itemId) ? 2 : 1;
        const block = BLOCKS.find(b => b.id === blockId);
        const currentLimit = block.baseLimit * packCount;
        let blocked = false;

        // Se calcula todo dentro del updater funcional para que los clics rápidos
        // (varios seguidos antes de que React repinte) no se pierdan por leer un
        // estado desactualizado.
        setSelections(prev => {
            const currentTotal = block.items.reduce((s, i) => s + (prev[i.id] || 0), 0);
            if (delta > 0 && (currentTotal + stepVal) > currentLimit) {
                blocked = true;
                return prev;
            }
            const newValue = Math.max(0, (prev[itemId] || 0) + (delta > 0 ? stepVal : -stepVal));
            return { ...prev, [itemId]: newValue };
        });

        if (blocked) {
            setError('¡SELECCIÓN COMPLETA! YA TIENES TODAS LAS RACIONES DE ESTE BLOQUE.');
        }
    };

    const basePrice = packCount * BASE_PACK_PRICE;
    const extrasPrice = EXTRAS.reduce((s, e) => s + (e.price * (extraSelections[e.id] || 0)), 0);
    const shippingPrice = userData.deliveryMethod === 'domicilio' ? 10 : 0;
    const totalPrice = basePrice + extrasPrice + shippingPrice;

    const validateAllBlocks = () => {
        return BLOCKS.every(b => calcBlockTotal(b.id) === (b.baseLimit * packCount));
    };

    const handleWhatsAppOptIn = (checked) => {
        setUserData(prev => ({ ...prev, whatsappOptIn: checked }));
        if (checked) setShowMarketingModal(true);
    };

    const handlePreservationChange = (method) => {
        setUserData(prev => ({ ...prev, preservation: method, pickupDate: '', pickupTime: '' }));
    };

    const validateFormAndShowExtras = () => {
        if (!userData.name.trim()) return setError('EL NOMBRE ES OBLIGATORIO.');
        if (!userData.phone || userData.phone.length < 9) return setError('TELÉFONO INVÁLIDO.');
        if (userData.whatsappOptIn && !userData.marketingStore) return setShowMarketingModal(true);
        if (userData.deliveryMethod === 'domicilio' && (!userData.address || !addressVerified)) {
            return setError('DEBES SELECCIONAR UNA DIRECCIÓN VÁLIDA DENTRO DEL RADIO DE ENTREGA.');
        }
        if (!userData.pickupDate || !userData.pickupTime) return setError('COMPLETA LA FECHA Y HORA.');
        if (!userData.termsAccepted) return setError('DEBES ACEPTAR LAS CONDICIONES.');

        localStorage.setItem('totem_user_profile', JSON.stringify({
            name: userData.name,
            phone: userData.phone,
            email: userData.email
        }));

        setShowUpsell(true);
    };

    const submitFinalOrder = async () => {
        setIsSubmitting(true);

        // BLOQUE DATOS CLIENTE
        const lugarEntrega = userData.deliveryMethod === 'recogida'
            ? `Tienda de recogida: ${userData.pickupLocation}`
            : `Dirección de envío: ${userData.address}`;
        const ofertasWhatsapp = userData.whatsappOptIn
            ? `Quiere ofertas por WhatsApp: SÍ (tienda: ${userData.marketingStore || 'sin especificar'})`
            : `Quiere ofertas por WhatsApp: NO`;
        const bloqueCliente = `BLOQUE DATOS CLIENTE:\n` +
            `Nombre: ${userData.name}\n` +
            `Teléfono: ${userData.phone}\n` +
            `Email: ${userData.email}\n` +
            `Nº de Packs: ${packCount}\n` +
            `Método de Entrega: ${userData.deliveryMethod.toUpperCase()}\n` +
            `${lugarEntrega}\n` +
            `Fecha/Hora: ${userData.pickupDate} - ${userData.pickupTime}\n` +
            `Conservación: ${userData.preservation.toUpperCase()}\n` +
            `Comentarios: ${userData.comments || 'Ninguno'}\n` +
            `${ofertasWhatsapp}`;

        // BLOQUE PEDIDO PESCADO
        const itemsPescado = Object.entries(selections)
            .filter(([_, qty]) => qty > 0)
            .map(([id, qty]) => {
                const item = BLOCKS.flatMap(b => b.items).find(i => i.id === id);
                return `${qty} uds. - ${item.name}`;
            })
            .join('\n');
        const bloquePescado = `BLOQUE PEDIDO PESCADO:\n${itemsPescado || 'Sin selección'}`;

        // BLOQUE EXTRAS
        const itemsExtras = Object.entries(extraSelections)
            .filter(([_, qty]) => qty > 0)
            .map(([id, qty]) => {
                const extra = EXTRAS.find(e => e.id === id);
                return `${qty} uds. - ${extra.name}`;
            })
            .join('\n');
        const bloqueExtras = `BLOQUE EXTRAS:\n${itemsExtras || 'Sin extras'}`;

        // Mensaje final consolidado
        const mensajeCompleto = `${bloqueCliente}\n\n${bloquePescado}\n\n${bloqueExtras}\n\nTOTAL: ${totalPrice.toFixed(2)}€`;

        try {
            const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    _subject: `Nuevo pedido: ${userData.name} (${packCount} pack/s)`,
                    Detalle_Pedido: mensajeCompleto,
                    email: userData.email,
                    nombre: userData.name,
                    telefono: userData.phone
                })
            });

            if (!res.ok) {
                throw new Error(`Formspree respondió ${res.status}`);
            }

            localStorage.removeItem('totem_pack_draft');
            setShowUpsell(false);
            setStep(7);
        } catch(e) {
            setError('FALLO AL PROCESAR EL PEDIDO. INTÉNTALO DE NUEVO O CONTÁCTANOS POR WHATSAPP.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateWhatsAppLink = () => {
        const valenciaData = STORES.find(s => s.id === 'quart');
        const sedaviData = STORES.find(s => s.id === 'sedavi');
        let targetPhone = valenciaData.whatsapp;

        if (userData.deliveryMethod === 'recogida' && userData.pickupLocation) {
            if (userData.pickupLocation.toLowerCase().includes('sedaví')) {
                targetPhone = sedaviData.whatsapp;
            } else {
                targetPhone = valenciaData.whatsapp;
            }
        }
        else if (userData.marketingStore) {
            if (userData.marketingStore.toLowerCase() === 'sedaví') {
                targetPhone = sedaviData.whatsapp;
            } else {
                targetPhone = valenciaData.whatsapp;
            }
        }
        else if (userGeo) {
            const distVal = getDistance(userGeo.lat, userGeo.lon, valenciaData.lat, valenciaData.lon);
            const distSed = getDistance(userGeo.lat, userGeo.lon, sedaviData.lat, sedaviData.lon);
            targetPhone = distSed < distVal ? sedaviData.whatsapp : valenciaData.whatsapp;
        }

        const text = `¡Hola Tótem! He realizado mi pedido de Pack Familiar:\n\n👤 *Cliente:* ${userData.name}\n📦 *Packs:* ${packCount}\n💰 *Total:* ${totalPrice.toFixed(2)}€\n📍 *Método:* ${userData.deliveryMethod.toUpperCase()}\n🐟 *Pescado:* ${Object.entries(selections).filter(([_,v])=>v>0).map(([k,v])=> `${BLOCKS.flatMap(b=>b.items).find(i=>i.id===k).name}(${v})`).join(', ')}`;
        return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
    };

    const visibleExtras = useMemo(() => {
        const start = extraPage * 3;
        return EXTRAS.slice(start, start + 3);
    }, [extraPage]);

    const hasMoreExtras = (extraPage + 1) * 3 < EXTRAS.length;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 pt-32 md:pt-40 min-h-screen-ios flex flex-col relative">

            <Header currentStep={step} setStep={setStep} savings={currentTotalSavings} />

            {error && (
                <div className="fixed top-24 right-6 left-6 md:left-auto md:w-80 glass border-l-4 border-red-500 p-4 rounded-2xl shadow-2xl z-[300] animate-error">
                    <p className="text-[10px] font-black uppercase text-red-600 leading-tight tracking-widest">{error}</p>
                </div>
            )}

            {step === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12 animate-fade py-8 pt-0">
                    <div className="w-32 h-32 md:w-44 md:h-44 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-lg overflow-hidden transition-transform hover:scale-105">
                        <SafeImage src="img/logo.jpg" alt="Logo Tótem" className="w-full h-full object-contain p-2" fallbackText="TÓTEM PESCADOS" />
                    </div>
                    <div className="space-y-6 text-center">
                        <h1 className="font-heading text-5xl sm:text-7xl md:text-[11rem] leading-[0.9] tracking-tighter text-slate-900 uppercase">Menos drama,<br/><span className="text-blue-600 italic">más pescado.</span></h1>
                        <p className="text-[10px] md:text-xl font-bold tracking-[0.4em] text-slate-400 uppercase">Configura tu Pack Familiar Personalizado</p>
                    </div>
                    <button onClick={() => setStep(1)} className="w-full md:w-auto px-16 py-6 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-[0.5em] shadow-2xl hover:bg-blue-600 transition-all active:scale-95">Ver funcionamiento</button>
                </div>
            )}

            {step === 1 && (
                <div className="flex-1 flex flex-col bg-blue-600 rounded-[3rem] p-6 md:p-16 text-white animate-slide-right shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 scale-150 rotate-12"><IconFish /></div>

                    <div className="max-w-2xl mx-auto space-y-8 relative z-10 h-full flex flex-col justify-center">
                        <div className="text-center space-y-2">
                            <h2 className="font-heading text-5xl md:text-8xl leading-none uppercase tracking-tighter">Cómo crear tu pack</h2>
                            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-blue-200">Personaliza tus 24 raciones en 3 simples pasos secuenciales</p>
                        </div>

                        {/* Flujo visual de bloques secuenciales */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white/10 p-5 rounded-[2rem] border border-white/10 flex items-center gap-5">
                                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0">A</div>
                                <div>
                                    <h4 className="font-black text-xs uppercase tracking-widest">Paso 1: Nuestras Playas <span className="text-blue-200 ml-2">(Escoge 8 raciones)</span></h4>
                                    <p className="text-[10px] md:text-xs opacity-80 mt-1 leading-tight">Lo mejor de la lonja: Gallineta, Clochinas, Trucha, Caballa y Lenguado.</p>
                                </div>
                            </div>

                            <div className="bg-white/10 p-5 rounded-[2rem] border border-white/10 flex items-center gap-5">
                                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0">B</div>
                                <div>
                                    <h4 className="font-black text-xs uppercase tracking-widest">Paso 2: Los Clásicos <span className="text-blue-200 ml-2">(Escoge 10 raciones)</span></h4>
                                    <p className="text-[10px] md:text-xs opacity-80 mt-1 leading-tight">Básicos para el día a día: Merluza, Dorada, Lubina, Emperador, Sepia, etc.</p>
                                </div>
                            </div>

                            <div className="bg-white/10 p-5 rounded-[2rem] border border-white/10 flex items-center gap-5">
                                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0">C</div>
                                <div>
                                    <h4 className="font-black text-xs uppercase tracking-widest">Paso 3: Los Gourmet <span className="text-blue-300 ml-2">(Escoge 6 raciones)</span></h4>
                                    <p className="text-[10px] md:text-xs opacity-90 mt-1 font-bold text-yellow-300 leading-tight">★ Los favoritos: ¡Aquí están el Salmón, Bacalao, Atún, Rape y Calamar!</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 py-4 border-y border-white/10">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-white/20 p-2 rounded-xl flex-shrink-0">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v20M2 12h20" strokeLinecap="round"/></svg>
                                </div>
                                <p className="text-xs md:text-sm font-medium leading-tight">
                                    <strong>Funcionamiento:</strong> Este pack se basa en raciones y no en kilos. Completa las raciones de cada bloque para poder avanzar al siguiente. Así garantizamos un precio cerrado de 118€ sin importar qué elijas.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-white/20 p-2 rounded-xl flex-shrink-0">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                                </div>
                                <p className="text-xs md:text-sm font-medium leading-tight">
                                    <strong>Ahorro de espacio:</strong> Todo viene sin espinas y en sobres especiales para congelar. No ocupa, no mancha. Listo para cocinar.
                                </p>
                            </div>
                        </div>

                        <div className="pt-2 space-y-6">
                            <h4 className="font-black text-[10px] uppercase text-blue-200 tracking-widest text-center">Calcula la duración según tu hogar:</h4>
                            <div className="grid grid-cols-3 gap-3 text-center">
                                <div onClick={() => setStep(2)} className="duration-card bg-white/10 p-4 rounded-3xl border border-white/5 group">
                                    <div className="flex justify-center mb-2"><IconPerson qty={1} color="#fff"/></div>
                                    <p className="font-black text-[8px] uppercase leading-tight">1 persona<br/>2 Meses</p>
                                </div>
                                <div onClick={() => setStep(2)} className="duration-card bg-white/10 p-4 rounded-3xl border border-white/5 group">
                                    <div className="flex justify-center mb-2"><IconPerson qty={2} color="#fff"/></div>
                                    <p className="font-black text-[8px] uppercase leading-tight">2 personas<br/>1 Mes</p>
                                </div>
                                <div onClick={() => setStep(2)} className="duration-card bg-white/10 p-4 rounded-3xl border border-white/5 group">
                                    <div className="flex justify-center mb-2"><IconPerson qty={4} color="#fff"/></div>
                                    <p className="font-black text-[8px] uppercase leading-tight">4 personas<br/>2 Semanas</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                                <button onClick={() => setStep(0)} className="w-full sm:w-auto text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 p-4 transition-opacity">Atrás</button>
                                <button onClick={() => setStep(2)} className="w-full sm:flex-1 py-6 bg-white text-blue-600 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-blue-50 transition-all active:scale-95">Empezar selección (Bloque A)</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(step >= 2 && step <= 4) && (
                <div className="max-w-2xl mx-auto w-full space-y-10 animate-slide-right mb-12">
                    {(() => {
                        const block = BLOCKS[step - 2];
                        const currentLimit = block.baseLimit * packCount;
                        const isBlockFull = calcBlockTotal(block.id) === currentLimit;
                        return (
                            <>
                                <div className="text-center space-y-3 px-2">
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-3 py-1 bg-blue-50 rounded-full inline-block">SELECCIÓN {block.id}</span>
                                    <div className="mb-4">
                                        <h2 className="font-heading text-5xl sm:text-6xl md:text-9xl uppercase leading-none text-slate-900 tracking-tighter">{block.title}</h2>
                                        <p className="text-[10px] md:text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">{block.subtitle}</p>
                                    </div>
                                    <div className={`inline-block px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white transition-all duration-300 ${isBlockFull ? 'bg-green-600 shadow-lg' : 'bg-red-500 shadow-lg'}`}>
                                        {calcBlockTotal(block.id)} de {currentLimit} raciones
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {block.items.map(item => (
                                        <div key={item.id} className={`fish-card flex flex-col sm:flex-row sm:items-center gap-5 p-5 bg-white border rounded-[2.5rem] shadow-sm transition-all ${ (selections[item.id] || 0) > 0 ? 'border-blue-200 bg-blue-50/20' : 'border-slate-100' }`}>
                                            <div className="flex items-center gap-5 flex-1">
                                                <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-slate-50 flex-shrink-0 shadow-inner border border-slate-100">
                                                    <SafeImage src={item.img} alt={item.name} className="w-full h-full object-cover" fallbackText={item.name} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-black text-sm uppercase text-slate-800">{item.name}</h3>
                                                    {item.id === 'clochina' && (
                                                        <p className="text-[9px] font-bold text-green-600 uppercase mt-1 leading-tight">Se recomienda el consumo el mismo día de la recepción</p>
                                                    )}
                                                    {PAIRED_FISH.includes(item.id) && (
                                                        <p className="text-[9px] font-bold text-green-600 uppercase mt-1">Disfrútalo de dos en dos</p>
                                                    )}
                                                    <div className="mt-2 pt-2 border-t border-slate-100/50">
                                                        <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest">Tip del chef:</p>
                                                        <p className="text-[10px] text-slate-500 font-medium italic leading-tight">{randomChefTips[item.id]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end gap-6 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                                <button onClick={() => modifyQty(item.id, -1, block.id)} className="w-10 h-10 font-black text-xl hover:text-red-500 transition-colors">-</button>
                                                <span className="w-6 text-center font-black text-sm">{selections[item.id] || 0}</span>
                                                <button onClick={() => modifyQty(item.id, 1, block.id)} className="w-10 h-10 font-black text-xl hover:text-blue-500 transition-colors">+</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-8 flex items-center justify-between gap-6 px-2">
                                    <button onClick={() => setStep(step - 1)} className="text-[10px] font-black uppercase text-slate-300 p-4 hover:text-slate-900 transition-colors">Atrás</button>
                                    <button
                                        ref={nextButtonRef}
                                        onClick={() => setStep(step + 1)}
                                        disabled={!isBlockFull}
                                        className="flex-1 md:flex-none px-12 py-5 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest disabled:opacity-20 shadow-xl transition-all active:scale-95"
                                    >
                                        Confirmar bloque
                                    </button>
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}

            {step === 5 && (
                <div className="max-w-2xl mx-auto w-full space-y-10 animate-slide-right pb-12">
                    <div className="text-center space-y-2 px-2">
                        <h2 className="font-heading text-5xl sm:text-7xl md:text-8xl uppercase text-slate-900 tracking-tighter flex items-center justify-center gap-4">
                            <IconCart className="w-10 h-10 md:w-14 md:h-14 text-blue-600 mt-1" />
                            Tu Selección
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revisa los detalles antes de finalizar</p>
                    </div>

                    <div className="space-y-8 px-2">
                        {BLOCKS.map(block => {
                            const currentLimit = block.baseLimit * packCount;
                            const currentTotal = calcBlockTotal(block.id);
                            const itemsToDisplay = packCount === 2 ? block.items : block.items.filter(i => (selections[i.id] || 0) > 0);

                            return (
                                <div key={block.id} className="space-y-4">
                                    <div className="flex items-center justify-between px-6">
                                        <h4 className="font-black text-[11px] uppercase text-slate-400 tracking-widest">Bloque {block.id}: {block.title}</h4>
                                        <span className={`font-black text-[10px] ${currentTotal < currentLimit ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
                                            {currentTotal} / {currentLimit}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {itemsToDisplay.map(item => (
                                            <div key={item.id} className={`flex items-center gap-4 p-3 rounded-[1.5rem] border shadow-sm transition-all ${selections[item.id] > 0 ? 'bg-white border-slate-100' : 'bg-slate-50/50 border-slate-100 opacity-60'}`}>
                                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0">
                                                    <SafeImage src={item.img} alt={item.name} className="w-full h-full object-cover" fallbackText={item.name} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-black text-[10px] uppercase text-slate-800 break-words leading-tight">{item.name}</p>
                                                </div>
                                                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1 px-3 flex-shrink-0 border border-slate-200">
                                                    <button onClick={() => modifyQty(item.id, -1, block.id)} className="font-black text-slate-400 hover:text-red-500">-</button>
                                                    <span className="font-black text-[11px] min-w-[12px] text-center">{selections[item.id] || 0}</span>
                                                    <button onClick={() => modifyQty(item.id, 1, block.id)} className="font-black text-slate-400 hover:text-blue-500">+</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-white border-2 border-blue-600 rounded-[3rem] p-6 sm:p-8 shadow-xl text-center space-y-4 mx-2">
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-black text-xl">{packCount}</div>
                            <h3 className="font-black text-sm uppercase tracking-tight">Cantidad de Packs</h3>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <button onClick={() => setPackCount(1)} className={`flex-1 sm:flex-none px-4 sm:px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${packCount === 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300'}`}>1 Pack ({BASE_PACK_PRICE}€)</button>
                            <button
                                onClick={() => {
                                    if(packCount === 1) {
                                        setPackCount(2);
                                        setShowDoublePackModal(true);
                                    }
                                }}
                                className={`flex-1 sm:flex-none px-4 sm:px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${packCount === 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300'}`}
                            >
                                2 Packs ({BASE_PACK_PRICE*2}€)
                            </button>
                        </div>
                        <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] animate-savings">¡Ahorro total estimado: {currentTotalSavings}€!</p>
                    </div>

                    <div className="pt-12 flex items-center justify-between gap-6 px-4">
                        <button onClick={() => setStep(4)} className="text-[10px] font-black uppercase text-slate-300 p-4 hover:text-slate-900 transition-colors">Atrás</button>
                        <button
                            onClick={() => validateAllBlocks() ? setStep(6) : setError('AÚN TE QUEDAN RACIONES POR SELECCIONAR PARA COMPLETAR TUS PACKS.')}
                            className="flex-1 px-10 py-5 bg-blue-600 text-white rounded-full font-black text-[11px] uppercase tracking-[0.3em] shadow-xl hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-30"
                            disabled={!validateAllBlocks()}
                        >
                            Siguiente paso
                        </button>
                    </div>
                </div>
            )}

            {showDoublePackModal && (
                <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[600] flex items-center justify-center p-4 animate-fade">
                    <div className="w-full max-w-sm bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-modal">
                        <div className="p-8 bg-totemDark text-white text-center relative">
                            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/10 shadow-lg">
                                <IconInfo />
                            </div>
                            <h3 className="text-4xl font-heading uppercase italic tracking-tighter leading-none">¡Doble Pack!</h3>
                            <p className="text-[9px] text-blue-400 font-bold uppercase mt-2 tracking-widest">Has seleccionado 2 packs (48 raciones)</p>
                        </div>
                        <div className="p-8 space-y-6 text-center">
                            <p className="text-slate-600 text-xs font-medium leading-relaxed">
                                Ahora puedes seleccionar las <span className="font-black text-blue-600">24 raciones adicionales</span> directamente desde el resumen de tu pedido.
                            </p>
                            <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest leading-tight">
                                Hemos desbloqueado todos los productos para que puedas "rellenar" tu selección cómodamente.
                            </p>
                            <button
                                onClick={() => setShowDoublePackModal(false)}
                                className="w-full py-5 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-blue-700 transition-all"
                            >
                                Entendido, completar pack
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {step === 6 && (
                <form className="max-w-lg mx-auto w-full space-y-10 animate-fade pb-12 px-2" onSubmit={(e)=>e.preventDefault()}>
                    <div className="text-center space-y-1">
                        <h2 className="font-heading text-5xl sm:text-7xl uppercase text-slate-900 tracking-tighter leading-none">Finalizar Pedido</h2>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Información de entrega y contacto</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 px-5 uppercase tracking-widest">Nombre y Apellidos</label>
                                <input
                                    name="name"
                                    autoComplete="name"
                                    className="w-full bg-white border border-slate-100 p-5 rounded-3xl outline-none font-bold text-sm uppercase focus:ring-2 ring-blue-500 shadow-sm"
                                    placeholder="Ej: Juan Pérez"
                                    value={userData.name}
                                    onChange={e => handleNameChange(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 px-5 uppercase tracking-widest">Móvil</label>
                                    <input
                                        name="tel"
                                        autoComplete="tel"
                                        className="w-full bg-white border border-slate-100 p-5 rounded-3xl outline-none font-bold text-sm uppercase focus:ring-2 ring-blue-500 shadow-sm"
                                        placeholder="600 000 000"
                                        type="tel"
                                        value={userData.phone}
                                        onChange={e=>setUserData({...userData, phone: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 px-5 uppercase tracking-widest">Email</label>
                                    <input
                                        name="email"
                                        autoComplete="email"
                                        className="w-full bg-white border border-slate-100 p-5 rounded-3xl outline-none font-bold text-sm uppercase focus:ring-2 ring-blue-500 shadow-sm"
                                        placeholder="email@ejemplo.com"
                                        type="email"
                                        value={userData.email}
                                        onChange={e=>setUserData({...userData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <label className="text-[9px] font-black text-slate-400 px-1 uppercase tracking-widest mb-3 block text-center">Estado de Conservación</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" onClick={() => handlePreservationChange('fresco')} className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 relative ${userData.preservation === 'fresco' ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-slate-50 bg-white opacity-60'}`}>
                                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-lg">💧</div>
                                    <div className="text-center"><p className="font-black text-[9px] uppercase text-slate-800">Fresco</p><p className="text-[8px] text-slate-400 font-medium">Congélalo.</p></div>
                                </button>
                                <button type="button" onClick={() => handlePreservationChange('congelado')} className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 relative ${userData.preservation === 'congelado' ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-slate-50 bg-white opacity-60'}`}>
                                    <div className="absolute -top-2 -right-1 bg-totemGold text-white text-[7px] px-2 py-0.5 rounded-full font-black animate-pulse shadow-lg uppercase tracking-widest">Recomendado</div>
                                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm"><IconSnow /></div>
                                    <div className="text-center"><p className="font-black text-[9px] uppercase text-slate-800">Ultracongelado</p><p className="text-[8px] text-slate-400 font-medium">Lo congelamos.</p></div>
                                </button>
                            </div>
                        </div>

                        <div className="pt-4 space-y-4">
                            <label className="text-[9px] font-black text-slate-400 px-1 uppercase tracking-widest block text-center">Método de entrega</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" onClick={()=> setUserData({...userData, deliveryMethod:'recogida', pickupDate:'', pickupTime:''})} className={`p-5 rounded-3xl border-2 transition-all font-black text-[10px] uppercase flex flex-col items-center gap-1 ${userData.deliveryMethod==='recogida'?'border-blue-600 bg-blue-50 text-blue-600 shadow-md':'border-slate-50 text-slate-300 bg-white'}`}>
                                    <span>Recogida</span>
                                    <span className="text-[7px] opacity-60 font-bold">En tienda</span>
                                </button>
                                <button type="button" onClick={()=> setUserData({...userData, deliveryMethod:'domicilio', pickupDate:'', pickupTime:''})} className={`p-5 rounded-3xl border-2 transition-all font-black text-[10px] uppercase flex flex-col items-center gap-1 ${userData.deliveryMethod==='domicilio'?'border-blue-600 bg-blue-50 text-blue-600 shadow-md':'border-slate-50 text-slate-300 bg-white'}`}>
                                    <span>Envío (+10€)</span>
                                    <span className="text-[7px] text-blue-500 font-black tracking-widest italic animate-pulse">RADIO 10KM VALENCIA</span>
                                </button>
                            </div>
                        </div>

                        {userData.deliveryMethod === 'recogida' ? (
                            <div className="space-y-4 animate-fade">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 px-5 uppercase tracking-widest">Tienda de recogida</label>
                                    <select className="w-full bg-white border border-slate-100 p-5 rounded-3xl outline-none font-bold text-sm shadow-sm cursor-pointer" value={userData.pickupLocation} onChange={e=>setUserData({...userData, pickupLocation: e.target.value})}>
                                        {sortedStores.map(store => (<option key={store.id} value={store.name}>{store.name}</option>))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <select className="w-full bg-white border border-slate-100 p-5 rounded-3xl outline-none font-bold text-[10px] uppercase shadow-sm cursor-pointer" value={userData.pickupDate} onChange={e=>setUserData({...userData, pickupDate: e.target.value})}><option value="">¿Qué día?</option>{pickupDates.map((d,i)=><option key={i} value={d.value}>{d.label}</option>)}</select>
                                    <select className="w-full bg-white border border-slate-100 p-5 rounded-3xl outline-none font-bold text-[10px] uppercase shadow-sm cursor-pointer" value={userData.pickupTime} onChange={e=>setUserData({...userData, pickupTime: e.target.value})}><option value="">¿A qué hora?</option>{pickupTimes.map((t,i)=><option key={i} value={t}>{t}</option>)}</select>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-fade">
                                <div className="space-y-1 relative">
                                    <label className="text-[9px] font-black text-slate-400 px-5 uppercase tracking-widest flex items-center justify-between">
                                        <span>Dirección de envío</span>
                                        <span className="text-[7px] text-blue-600 italic">Solo radio 10km de Valencia</span>
                                    </label>
                                    <input
                                        name="address"
                                        autoComplete="street-address"
                                        className={`w-full bg-white border p-5 rounded-3xl outline-none font-bold text-sm shadow-sm transition-all ${addressVerified ? 'border-green-300 ring-2 ring-green-100' : 'border-slate-100'}`}
                                        placeholder="Calle, número, ciudad..."
                                        value={userData.address}
                                        onChange={e=>handleAddressInput(e.target.value)}
                                    />
                                    {showSuggestions && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 z-50 bg-white shadow-2xl rounded-3xl border border-slate-50 mt-2 overflow-hidden">
                                            {suggestions.map((s,i)=>(
                                                <button key={i} type="button" onClick={()=>onSelectAddress(s)} className="w-full text-left p-4 text-[10px] font-bold uppercase border-b border-slate-50 hover:bg-blue-50 leading-tight transition-colors">
                                                    {s.display_name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {addressVerified && (
                                        <p className="text-[8px] font-black text-green-600 uppercase tracking-widest mt-2 px-4">✓ Dirección en rango de entrega permitido</p>
                                    )}
                                    {addressSearchError && !showSuggestions && (
                                        <p className="text-[8px] font-black text-red-500 uppercase tracking-widest mt-2 px-4">No se pudo buscar la dirección. Comprueba tu conexión e inténtalo de nuevo.</p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <select className="w-full bg-white border border-slate-100 p-5 rounded-3xl outline-none font-bold text-[10px] uppercase shadow-sm cursor-pointer" value={userData.pickupDate} onChange={e=>setUserData({...userData, pickupDate: e.target.value})}><option value="">Día de entrega</option>{deliveryDates.map((d,i)=><option key={i} value={d.value}>{d.label}</option>)}</select>
                                    <select className="w-full bg-white border border-slate-100 p-5 rounded-3xl outline-none font-bold text-[10px] uppercase shadow-sm cursor-pointer" value={userData.pickupTime} onChange={e=>setUserData({...userData, pickupTime: e.target.value})}><option value="">Horario</option>{deliveryTimes.map((t,i)=><option key={i} value={t.v} disabled={t.d}>{t.l}</option>)}</select>
                                </div>
                            </div>
                        )}

                        <textarea className="w-full bg-white border border-slate-100 p-5 rounded-3xl outline-none font-medium text-xs resize-none h-28 uppercase shadow-sm" placeholder="Comentarios o peticiones especiales..." value={userData.comments} onChange={e=>setUserData({...userData, comments: e.target.value})} />

                        <div className="space-y-3">
                            <div className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-start gap-4">
                                <div className="relative flex items-center h-5 mt-1">
                                    <input type="checkbox" id="wa-opt" checked={userData.whatsappOptIn} onChange={e => handleWhatsAppOptIn(e.target.checked)} className="w-6 h-6 text-blue-600 border-slate-200 rounded-lg cursor-pointer" />
                                </div>
                                <div className="text-left flex-1 min-w-0">
                                    <label htmlFor="wa-opt" className="text-[10px] font-black text-slate-800 uppercase flex items-center gap-2 cursor-pointer">Recibir Ofertas <IconWhatsApp color="#22c55e" /></label>
                                    <p className="text-[9px] text-slate-400 font-medium leading-tight mt-1">Ofertas de lonja en tu móvil.</p>
                                </div>
                                {userData.whatsappOptIn && userData.marketingStore && (
                                    <button type="button" onClick={() => setShowMarketingModal(true)} className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[8px] font-black uppercase flex-shrink-0">{userData.marketingStore}</button>
                                )}
                            </div>

                            <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl flex items-start gap-4">
                                <div className="relative flex items-center h-5 mt-1">
                                    <input type="checkbox" id="terms" checked={userData.termsAccepted} onChange={e => setUserData({...userData, termsAccepted: e.target.checked})} className="w-6 h-6 text-blue-600 border-slate-300 rounded-lg cursor-pointer" />
                                </div>
                                <div className="text-left">
                                    <label htmlFor="terms" className="text-[10px] font-black text-slate-800 uppercase cursor-pointer">Acepto los <button type="button" onClick={() => setShowTermsModal(true)} className="text-blue-600 underline">Términos</button></label>
                                    <p className="text-[8px] text-slate-400 font-medium leading-tight mt-1">Pedido sujeto a disponibilidad diaria.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 bg-slate-900 rounded-[3rem] text-center shadow-2xl space-y-2">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Importe Total</span>
                        <p className="text-6xl sm:text-7xl font-heading text-white leading-none tracking-tighter">{totalPrice.toFixed(2)}€</p>
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-6 px-2">
                        <button type="button" onClick={() => setStep(5)} className="text-[10px] font-black uppercase text-slate-300 p-4 hover:text-slate-900 transition-colors">Atrás</button>
                        <button type="button" onClick={validateFormAndShowExtras} disabled={!userData.termsAccepted} className={`flex-1 py-7 text-white rounded-full font-black text-xs uppercase tracking-[0.4em] shadow-xl transition-all active:scale-95 ${userData.termsAccepted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300 opacity-50 cursor-not-allowed'}`}>Extras</button>
                    </div>
                </form>
            )}

            {showTermsModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[600] flex items-center justify-center p-4 animate-fade">
                    <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-modal">
                        <div className="p-8 bg-slate-900 text-white text-center flex-shrink-0">
                            <h3 className="text-3xl font-heading uppercase tracking-tighter">Condiciones</h3>
                        </div>
                        <div className="p-8 overflow-y-auto flex-1 space-y-6 text-slate-600">
                            <section className="space-y-2">
                                <h4 className="font-black text-xs uppercase text-slate-900">1. Reserva Personalizada</h4>
                                <p className="text-[11px] leading-relaxed font-medium">Este pedido constituye una reserva en firme. Debido a la naturaleza del producto, el peso final de las raciones puede variar ligeramente según la pieza seleccionada en lonja.</p>
                            </section>
                            <section className="space-y-2">
                                <h4 className="font-black text-xs uppercase text-slate-900">2. Proceso de Congelación</h4>
                                <p className="text-[11px] leading-relaxed font-medium">La opción "Ya Congelado" utiliza un proceso de abatimiento profesional de temperatura. Este proceso requiere un mínimo de 48h para garantizar que la estructura celular del pescado no se dañe.</p>
                            </section>
                            <section className="space-y-2">
                                <h4 className="font-black text-xs uppercase text-slate-900">3. Política de Entrega</h4>
                                <p className="text-[11px] leading-relaxed font-medium">El cliente debe estar disponible en la franja horaria acordada. En caso de ausencia, el repartidor contactará telefónicamente. Pasados 10 min, el pedido volverá a tienda.</p>
                            </section>
                        </div>
                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex-shrink-0">
                            <button onClick={() => setShowTermsModal(false)} className="w-full py-4 bg-blue-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg">Cerrar</button>
                        </div>
                    </div>
                </div>
            )}

            {showMarketingModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[500] flex items-center justify-center p-4 animate-fade">
                    <div className="w-full max-w-xs bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-modal">
                        <div className="p-8 bg-green-600 text-white text-center">
                            <h3 className="text-3xl font-heading uppercase italic tracking-tighter leading-none">Ofertas WhatsApp</h3>
                            <p className="text-[10px] text-green-100 font-bold uppercase mt-2 tracking-widest">Elige tu tienda Tótem</p>
                        </div>
                        <div className="p-6 space-y-3">
                            {STORES.map(store => (
                                <button
                                    key={store.id}
                                    onClick={() => { setUserData(p => ({ ...p, marketingStore: store.shortName })); setShowMarketingModal(false); }}
                                    className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left hover:bg-green-50 hover:border-green-200 transition-all group"
                                >
                                    <p className="font-black text-xs uppercase text-slate-800 group-hover:text-green-600">{store.shortName}</p>
                                    <p className="text-[9px] text-slate-400 font-medium">{store.name.split(':')[1]}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {showUpsell && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[400] flex items-center justify-center p-2 sm:p-4 animate-fade">
                    <div className="w-full max-w-lg bg-white rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-modal">
                        <div className="p-6 sm:p-8 bg-blue-600 text-white text-center relative flex-shrink-0">
                            <button onClick={() => setShowUpsell(false)} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 hover:text-white p-2 transition-transform hover:scale-110">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="3" fill="none"><path d="M18 6 6 18M6 6l12 12"/></svg>
                            </button>
                            <h3 className="text-3xl sm:text-4xl font-heading uppercase italic tracking-tighter leading-none">¿Un capricho más?</h3>
                            <p className="text-[10px] text-blue-100 font-bold uppercase mt-2 tracking-widest">Complementa tu pack familiar</p>
                        </div>
                        <div ref={upsellScrollRef} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 bg-slate-50">
                            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                {visibleExtras.map(e => (
                                    <div key={e.id} className="flex bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-3 items-center gap-4">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-[1.5rem] overflow-hidden bg-slate-100 border border-slate-100 shadow-inner flex-shrink-0">
                                            <SafeImage src={e.img} alt={e.name} className="w-full h-full object-cover" fallbackText={e.name} />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between min-h-[70px] sm:min-h-[80px]">
                                            <div className="mb-2">
                                                <p className="font-black text-[11px] sm:text-xs uppercase text-slate-800 leading-tight">{e.name}</p>
                                                <p className="text-[8px] sm:text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-0.5">{e.sub}</p>
                                            </div>
                                            <div className="flex items-center justify-between gap-2 mt-auto">
                                                <p className="text-xs sm:text-sm font-black text-slate-900 leading-none">+{e.price.toFixed(2)}€</p>
                                                <div className="flex items-center gap-2 sm:gap-4 bg-slate-50 border border-slate-100 rounded-xl p-1 shadow-sm">
                                                    <button onClick={()=> setExtraSelections(p=>({...p, [e.id]: Math.max(0, (p[e.id]||0)-1)})) } className="w-7 h-7 sm:w-8 sm:h-8 font-black text-slate-400 hover:text-red-500 transition-colors">-</button>
                                                    <span className="w-4 text-center font-black text-[10px] sm:text-xs">{extraSelections[e.id] || 0}</span>
                                                    <button onClick={()=> setExtraSelections(p=>({...p, [e.id]: (p[e.id]||0)+1})) } className="w-7 h-7 sm:w-8 sm:h-8 font-black text-slate-400 hover:text-blue-500 transition-colors">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2 pt-2">
                                {hasMoreExtras ? (
                                    <button onClick={() => setExtraPage(p => p + 1)} className="w-full py-4 bg-white border-2 border-dashed border-blue-200 rounded-[2rem] text-[10px] font-black uppercase text-blue-600 hover:bg-blue-50 transition-all">
                                        Ver más productos
                                    </button>
                                ) : (
                                    extraPage > 0 && (
                                        <button onClick={() => setExtraPage(0)} className="w-full py-4 bg-white border-2 border-dashed border-slate-300 rounded-[2rem] text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 transition-all">
                                            Volver al inicio
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="p-6 sm:p-8 bg-white border-t border-slate-100 flex flex-col gap-4 flex-shrink-0">
                            <div className="flex justify-between items-end font-black px-2">
                                <div className="text-left leading-none">
                                    <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Total Final</p>
                                    <p className="text-3xl sm:text-4xl text-slate-900 tracking-tighter">{totalPrice.toFixed(2)}€</p>
                                </div>
                                <div className="text-right text-blue-600 font-bold text-[8px] sm:text-[9px] uppercase">
                                    Extras: +{(totalPrice - basePrice - shippingPrice).toFixed(2)}€
                                </div>
                            </div>
                            <button onClick={submitFinalOrder} disabled={isSubmitting} className="w-full py-5 sm:py-6 bg-slate-900 text-white rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-[0.4em] shadow-xl hover:bg-blue-600 active:scale-95 disabled:bg-slate-300">
                                {isSubmitting ? 'ENVIANDO...' : 'RESERVAR PACK'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {step === 7 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade px-6 pt-0">
                    <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center shadow-inner border border-green-100 scale-125 mb-4 animate-bounce"><svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="4" fill="none"><path d="M20 6 9 17l-5-5"/></svg></div>
                    <h2 className="font-heading text-6xl sm:text-8xl uppercase leading-none tracking-tighter text-slate-900">¡Recibido!</h2>
                    <div className="max-w-xs space-y-4">
                        <p className="text-slate-400 font-bold text-[11px] leading-relaxed uppercase tracking-widest border-y border-slate-100 py-6">
                            Tu reserva ha sido procesada con éxito. Te llamaremos en menos de 24h para confirmar los detalles finales y coordinar la entrega o recogida de tu pack.
                        </p>
                        <a href={generateWhatsAppLink()} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-3 py-5 bg-[#25d366] text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl transition-transform hover:scale-105 active:scale-95">
                            <IconWhatsApp size={22} fill="#fff" /> Contactar ahora
                        </a>
                    </div>
                    <button onClick={()=>{ localStorage.removeItem('totem_pack_draft'); window.location.reload(); }} className="text-[10px] font-black uppercase tracking-[0.4em] border-b-2 border-slate-900 pb-1 mt-6 opacity-40 hover:opacity-100 transition-all">Nueva reserva</button>
                </div>
            )}
        </div>
    );
}

export default App;
