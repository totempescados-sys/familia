import { useState, useEffect, useRef, useMemo } from 'react';

import Header from './components/common/Header';
import StepLanding from './components/steps/StepLanding';
import StepExplainer from './components/steps/StepExplainer';
import StepBlockSelector from './components/steps/StepBlockSelector';
import StepReview from './components/steps/StepReview';
import StepCheckoutForm from './components/steps/StepCheckoutForm';
import StepSuccess from './components/steps/StepSuccess';
import DoublePackModal from './components/modals/DoublePackModal';
import TermsModal from './components/modals/TermsModal';
import MarketingOptInModal from './components/modals/MarketingOptInModal';
import UpsellModal from './components/modals/UpsellModal';

import { FORMSPREE_ID, PAIRED_FISH, STORES, BLOCKS, EXTRAS, DELIVERY_RADIUS_KM } from './lib/constants';
import { getDistance } from './lib/distance';
import { calcBlockTotal, validateAllBlocks, currentTotalSavings, computePrices } from './lib/pricing';
import { generateWhatsAppLink } from './lib/whatsapp';
import { buildOrderMessage } from './lib/order';

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
            const isBlockFull = calcBlockTotal(selections, block.id) === currentLimit;

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

    const { basePrice, extrasPrice, shippingPrice, totalPrice } = computePrices(packCount, extraSelections, userData.deliveryMethod);

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

        const mensajeCompleto = buildOrderMessage({ userData, packCount, selections, extraSelections, totalPrice });

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

    const visibleExtras = useMemo(() => {
        const start = extraPage * 3;
        return EXTRAS.slice(start, start + 3);
    }, [extraPage]);

    const hasMoreExtras = (extraPage + 1) * 3 < EXTRAS.length;

    const savings = currentTotalSavings(selections);
    const canProceedFromReview = validateAllBlocks(selections, packCount);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 pt-32 md:pt-40 min-h-screen-ios flex flex-col relative">

            <Header currentStep={step} setStep={setStep} savings={savings} />

            {error && (
                <div className="fixed top-24 right-6 left-6 md:left-auto md:w-80 glass border-l-4 border-red-500 p-4 rounded-2xl shadow-2xl z-[300] animate-error">
                    <p className="text-[10px] font-black uppercase text-red-600 leading-tight tracking-widest">{error}</p>
                </div>
            )}

            {step === 0 && <StepLanding onStart={() => setStep(1)} />}

            {step === 1 && <StepExplainer onBack={() => setStep(0)} onNext={() => setStep(2)} />}

            {(step >= 2 && step <= 4) && (
                <StepBlockSelector
                    step={step}
                    packCount={packCount}
                    selections={selections}
                    randomChefTips={randomChefTips}
                    onModifyQty={modifyQty}
                    onBack={() => setStep(step - 1)}
                    onNext={() => setStep(step + 1)}
                    nextButtonRef={nextButtonRef}
                />
            )}

            {step === 5 && (
                <StepReview
                    packCount={packCount}
                    selections={selections}
                    currentTotalSavings={savings}
                    onSetPackCount={setPackCount}
                    onDoublePackSelected={() => { setPackCount(2); setShowDoublePackModal(true); }}
                    onModifyQty={modifyQty}
                    onBack={() => setStep(4)}
                    onNext={() => canProceedFromReview ? setStep(6) : setError('AÚN TE QUEDAN RACIONES POR SELECCIONAR PARA COMPLETAR TUS PACKS.')}
                    canProceed={canProceedFromReview}
                />
            )}

            {showDoublePackModal && <DoublePackModal onClose={() => setShowDoublePackModal(false)} />}

            {step === 6 && (
                <StepCheckoutForm
                    userData={userData}
                    setUserData={setUserData}
                    addressVerified={addressVerified}
                    sortedStores={sortedStores}
                    pickupDates={pickupDates}
                    deliveryDates={deliveryDates}
                    pickupTimes={pickupTimes}
                    suggestions={suggestions}
                    showSuggestions={showSuggestions}
                    addressSearchError={addressSearchError}
                    onAddressInput={handleAddressInput}
                    onSelectAddress={onSelectAddress}
                    onNameChange={handleNameChange}
                    onPreservationChange={handlePreservationChange}
                    onWhatsAppOptIn={handleWhatsAppOptIn}
                    onShowMarketingModal={() => setShowMarketingModal(true)}
                    onShowTermsModal={() => setShowTermsModal(true)}
                    totalPrice={totalPrice}
                    onBack={() => setStep(5)}
                    onSubmit={validateFormAndShowExtras}
                />
            )}

            {showTermsModal && <TermsModal onClose={() => setShowTermsModal(false)} />}

            {showMarketingModal && (
                <MarketingOptInModal
                    onSelect={(shortName) => { setUserData(p => ({ ...p, marketingStore: shortName })); setShowMarketingModal(false); }}
                />
            )}

            {showUpsell && (
                <UpsellModal
                    onClose={() => setShowUpsell(false)}
                    visibleExtras={visibleExtras}
                    extraSelections={extraSelections}
                    setExtraSelections={setExtraSelections}
                    hasMoreExtras={hasMoreExtras}
                    extraPage={extraPage}
                    setExtraPage={setExtraPage}
                    totalPrice={totalPrice}
                    basePrice={basePrice}
                    shippingPrice={shippingPrice}
                    isSubmitting={isSubmitting}
                    onSubmit={submitFinalOrder}
                />
            )}

            {step === 7 && (
                <StepSuccess
                    whatsAppLink={generateWhatsAppLink({ userData, userGeo, selections, packCount, totalPrice })}
                    onReset={() => { localStorage.removeItem('totem_pack_draft'); window.location.reload(); }}
                />
            )}
        </div>
    );
}

export default App;
