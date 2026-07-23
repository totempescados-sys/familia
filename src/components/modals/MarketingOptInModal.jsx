import { STORES } from '../../lib/constants';

export default function MarketingOptInModal({ onSelect }) {
    return (
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
                            onClick={() => onSelect(store.shortName)}
                            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left hover:bg-green-50 hover:border-green-200 transition-all group"
                        >
                            <p className="font-black text-xs uppercase text-slate-800 group-hover:text-green-600">{store.shortName}</p>
                            <p className="text-[9px] text-slate-400 font-medium">{store.name.split(':')[1]}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
