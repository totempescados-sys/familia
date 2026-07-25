import SafeImage from '../common/SafeImage';
import { IconCart } from '../common/icons';
import { BLOCKS, BASE_PACK_PRICE } from '../../lib/constants';
import { calcBlockTotal } from '../../lib/pricing';

export default function StepReview({
    packCount, selections, currentTotalSavings,
    onSetPackCount, onDoublePackSelected, onModifyQty,
    onBack, onNext, canProceed
}) {
    return (
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
                    const currentTotal = calcBlockTotal(selections, block.id);
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
                                            <button onClick={() => onModifyQty(item.id, -1, block.id)} className="font-black text-slate-400 hover:text-red-500">-</button>
                                            <span className="font-black text-[11px] min-w-[12px] text-center">{selections[item.id] || 0}</span>
                                            <button onClick={() => onModifyQty(item.id, 1, block.id)} className="font-black text-slate-400 hover:text-blue-500">+</button>
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
                    <button onClick={() => onSetPackCount(1)} className={`flex-1 sm:flex-none px-4 sm:px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${packCount === 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300'}`}>1 Pack ({BASE_PACK_PRICE}€)</button>
                    <button
                        onClick={() => {
                            if (packCount === 1) onDoublePackSelected();
                        }}
                        className={`flex-1 sm:flex-none px-4 sm:px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${packCount === 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300'}`}
                    >
                        2 Packs ({BASE_PACK_PRICE*2}€)
                    </button>
                </div>
                <p className="text-[10px] font-black text-totemCoral uppercase tracking-[0.2em] animate-savings">¡Ahorro total estimado: {currentTotalSavings}€!</p>
            </div>

            <div className="pt-12 flex items-center justify-between gap-6 px-4">
                <button onClick={onBack} className="text-[10px] font-black uppercase text-slate-300 p-4 hover:text-slate-900 transition-colors">Atrás</button>
                <button
                    onClick={onNext}
                    className="flex-1 px-10 py-5 bg-blue-600 text-white rounded-full font-black text-[11px] uppercase tracking-[0.3em] shadow-xl hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-30"
                    disabled={!canProceed}
                >
                    Siguiente paso
                </button>
            </div>
        </div>
    );
}
