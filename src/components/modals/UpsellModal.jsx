import SafeImage from '../common/SafeImage';

export default function UpsellModal({
    onClose, visibleExtras, extraSelections, setExtraSelections,
    hasMoreExtras, extraPage, setExtraPage,
    totalPrice, basePrice, shippingPrice, isSubmitting, onSubmit
}) {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[400] flex items-center justify-center p-2 sm:p-4 animate-fade">
            <div className="w-full max-w-lg bg-white rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-modal">
                <div className="p-6 sm:p-8 bg-blue-600 text-white text-center relative flex-shrink-0">
                    <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 hover:text-white p-2 transition-transform hover:scale-110">
                        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="3" fill="none"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                    <h3 className="text-3xl sm:text-4xl font-heading uppercase italic tracking-tighter leading-none">¿Un capricho más?</h3>
                    <p className="text-[10px] text-blue-100 font-bold uppercase mt-2 tracking-widest">Complementa tu pack familiar</p>
                </div>
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 bg-slate-50">
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
                    <button onClick={onSubmit} disabled={isSubmitting} className="w-full py-5 sm:py-6 bg-slate-900 text-white rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-[0.4em] shadow-xl hover:bg-blue-600 active:scale-95 disabled:bg-slate-300">
                        {isSubmitting ? 'ENVIANDO...' : 'RESERVAR PACK'}
                    </button>
                </div>
            </div>
        </div>
    );
}
