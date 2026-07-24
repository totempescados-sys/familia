import SafeImage from '../common/SafeImage';
import { BLOCKS, PAIRED_FISH } from '../../lib/constants';
import { calcBlockTotal } from '../../lib/pricing';

export default function StepBlockSelector({ step, packCount, selections, randomChefTips, onModifyQty, onBack, onNext, nextButtonRef }) {
    const block = BLOCKS[step - 2];
    const currentLimit = block.baseLimit * packCount;
    const isBlockFull = calcBlockTotal(selections, block.id) === currentLimit;

    return (
        <div className="max-w-2xl mx-auto w-full space-y-10 animate-slide-right mb-12">
            <div className="text-center space-y-3 px-2">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-3 py-1 bg-blue-50 rounded-full inline-block">SELECCIÓN {block.id}</span>
                <div className="mb-4">
                    <h2 className="font-heading text-5xl sm:text-6xl md:text-9xl uppercase leading-none text-slate-900 tracking-tighter">{block.title}</h2>
                    <p className="text-[10px] md:text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">{block.subtitle}</p>
                </div>
                <div className={`inline-block px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white transition-all duration-300 ${isBlockFull ? 'bg-green-600 shadow-lg' : 'bg-red-500 shadow-lg'}`}>
                    {calcBlockTotal(selections, block.id)} de {currentLimit} raciones
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
                            <button onClick={() => onModifyQty(item.id, -1, block.id)} className="w-10 h-10 font-black text-xl hover:text-red-500 transition-colors">-</button>
                            <span className="w-6 text-center font-black text-sm">{selections[item.id] || 0}</span>
                            <button onClick={() => onModifyQty(item.id, 1, block.id)} className="w-10 h-10 font-black text-xl hover:text-blue-500 transition-colors">+</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pt-8 flex items-center justify-between gap-6 px-2">
                <button onClick={onBack} className="text-[10px] font-black uppercase text-slate-300 p-4 hover:text-slate-900 transition-colors">Atrás</button>
                <button
                    ref={nextButtonRef}
                    onClick={onNext}
                    disabled={!isBlockFull}
                    className="flex-1 md:flex-none px-12 py-5 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest disabled:opacity-20 shadow-xl transition-all active:scale-95"
                >
                    Confirmar bloque
                </button>
            </div>
        </div>
    );
}
