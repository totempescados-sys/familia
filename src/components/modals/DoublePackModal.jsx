import { IconInfo } from '../common/icons';

export default function DoublePackModal({ onClose }) {
    return (
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
                        onClick={onClose}
                        className="w-full py-5 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-blue-700 transition-all"
                    >
                        Entendido, completar pack
                    </button>
                </div>
            </div>
        </div>
    );
}
