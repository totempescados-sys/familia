import { IconWhatsApp } from '../common/icons';

export default function StepSuccess({ whatsAppLink, onReset }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade px-6 pt-0">
            <div className="w-24 h-24 bg-[#ffe8e2] text-totemCoral rounded-full flex items-center justify-center shadow-inner border border-[#ffcfc2] scale-125 mb-4 animate-bounce"><svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="4" fill="none"><path d="M20 6 9 17l-5-5"/></svg></div>
            <h2 className="font-heading text-6xl sm:text-8xl uppercase leading-none tracking-tighter text-slate-900">¡Recibido!</h2>
            <div className="max-w-xs space-y-4">
                <p className="text-slate-400 font-bold text-[11px] leading-relaxed uppercase tracking-widest border-y border-slate-100 py-6">
                    Tu reserva ha sido procesada con éxito. Te llamaremos en menos de 24h para confirmar los detalles finales y coordinar la entrega o recogida de tu pack.
                </p>
                <a href={whatsAppLink} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-3 py-5 bg-[#25d366] text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl transition-transform hover:scale-105 active:scale-95">
                    <IconWhatsApp size={22} fill="#fff" /> Contactar ahora
                </a>
            </div>
            <button onClick={onReset} className="text-[10px] font-black uppercase tracking-[0.4em] border-b-2 border-slate-900 pb-1 mt-6 opacity-40 hover:opacity-100 transition-all">Nueva reserva</button>
        </div>
    );
}
