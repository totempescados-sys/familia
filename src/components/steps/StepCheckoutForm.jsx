import { IconWhatsApp, IconSnow } from '../common/icons';

const DELIVERY_TIMES = [
    { v: '08:00 - 10:00', l: '08:00 a 10:00 (OCUPADA)', d: true },
    { v: '10:00 - 12:00', l: '10:00 a 12:00 (OCUPADA)', d: true },
    { v: '12:00 - 14:00', l: '12:00 a 14:00 (DISPONIBLE)', d: false }
];

export default function StepCheckoutForm({
    userData, setUserData, addressVerified, sortedStores,
    pickupDates, deliveryDates, pickupTimes,
    suggestions, showSuggestions, addressSearchError,
    onAddressInput, onSelectAddress, onNameChange,
    onPreservationChange, onWhatsAppOptIn,
    onShowMarketingModal, onShowTermsModal,
    totalPrice, onBack, onSubmit,
    honeypot, onHoneypotChange
}) {
    return (
        <form className="max-w-lg mx-auto w-full space-y-10 animate-fade pb-12 px-2" onSubmit={(e)=>e.preventDefault()}>
            <div className="text-center space-y-1">
                <h2 className="font-heading text-5xl sm:text-7xl uppercase text-slate-900 tracking-tighter leading-none">Finalizar Pedido</h2>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Información de entrega y contacto</p>
            </div>

            {/* Trampa antispam: invisible para personas, algunos bots simples la rellenan igualmente */}
            <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={e => onHoneypotChange(e.target.value)}
                />
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
                            onChange={e => onNameChange(e.target.value)}
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
                        <button type="button" onClick={() => onPreservationChange('fresco')} className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 relative ${userData.preservation === 'fresco' ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-slate-50 bg-white opacity-60'}`}>
                            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-lg">💧</div>
                            <div className="text-center"><p className="font-black text-[9px] uppercase text-slate-800">Fresco</p><p className="text-[8px] text-slate-400 font-medium">Congélalo.</p></div>
                        </button>
                        <button type="button" onClick={() => onPreservationChange('congelado')} className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 relative ${userData.preservation === 'congelado' ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-slate-50 bg-white opacity-60'}`}>
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
                                onChange={e=>onAddressInput(e.target.value)}
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
                            <select className="w-full bg-white border border-slate-100 p-5 rounded-3xl outline-none font-bold text-[10px] uppercase shadow-sm cursor-pointer" value={userData.pickupTime} onChange={e=>setUserData({...userData, pickupTime: e.target.value})}><option value="">Horario</option>{DELIVERY_TIMES.map((t,i)=><option key={i} value={t.v} disabled={t.d}>{t.l}</option>)}</select>
                        </div>
                    </div>
                )}

                <textarea className="w-full bg-white border border-slate-100 p-5 rounded-3xl outline-none font-medium text-xs resize-none h-28 uppercase shadow-sm" placeholder="Comentarios o peticiones especiales..." value={userData.comments} onChange={e=>setUserData({...userData, comments: e.target.value})} />

                <div className="space-y-3">
                    <div className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-start gap-4">
                        <div className="relative flex items-center h-5 mt-1">
                            <input type="checkbox" id="wa-opt" checked={userData.whatsappOptIn} onChange={e => onWhatsAppOptIn(e.target.checked)} className="w-6 h-6 text-blue-600 border-slate-200 rounded-lg cursor-pointer" />
                        </div>
                        <div className="text-left flex-1 min-w-0">
                            <label htmlFor="wa-opt" className="text-[10px] font-black text-slate-800 uppercase flex items-center gap-2 cursor-pointer">Recibir Ofertas <IconWhatsApp color="#22c55e" /></label>
                            <p className="text-[9px] text-slate-400 font-medium leading-tight mt-1">Ofertas de lonja en tu móvil.</p>
                        </div>
                        {userData.whatsappOptIn && userData.marketingStore && (
                            <button type="button" onClick={onShowMarketingModal} className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[8px] font-black uppercase flex-shrink-0">{userData.marketingStore}</button>
                        )}
                    </div>

                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl flex items-start gap-4">
                        <div className="relative flex items-center h-5 mt-1">
                            <input type="checkbox" id="terms" checked={userData.termsAccepted} onChange={e => setUserData({...userData, termsAccepted: e.target.checked})} className="w-6 h-6 text-blue-600 border-slate-300 rounded-lg cursor-pointer" />
                        </div>
                        <div className="text-left">
                            <label htmlFor="terms" className="text-[10px] font-black text-slate-800 uppercase cursor-pointer">Acepto los <button type="button" onClick={onShowTermsModal} className="text-blue-600 underline">Términos</button></label>
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
                <button type="button" onClick={onBack} className="text-[10px] font-black uppercase text-slate-300 p-4 hover:text-slate-900 transition-colors">Atrás</button>
                <button type="button" onClick={onSubmit} disabled={!userData.termsAccepted} className={`flex-1 py-7 text-white rounded-full font-black text-xs uppercase tracking-[0.4em] shadow-xl transition-all active:scale-95 ${userData.termsAccepted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300 opacity-50 cursor-not-allowed'}`}>Extras</button>
            </div>
        </form>
    );
}
