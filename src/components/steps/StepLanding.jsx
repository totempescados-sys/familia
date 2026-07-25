import SafeImage from '../common/SafeImage';

export default function StepLanding({ onStart, onSkip }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12 animate-fade py-8 pt-0">
            <div className="w-32 h-32 md:w-44 md:h-44 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-lg overflow-hidden transition-transform hover:scale-105">
                <SafeImage src="img/logo.jpg" alt="Logo Tótem" className="w-full h-full object-contain p-2" fallbackText="TÓTEM PESCADOS" />
            </div>
            <div className="space-y-6 text-center">
                <h1 className="font-heading text-5xl sm:text-7xl md:text-[11rem] leading-[0.9] tracking-tighter text-slate-900 uppercase">Menos drama,<br/><span className="text-blue-600 italic">más pescado.</span></h1>
                <p className="text-[10px] md:text-xl font-bold tracking-[0.4em] text-slate-400 uppercase">Configura tu Pack Familiar Personalizado</p>
            </div>
            <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="w-32 h-4 text-blue-300">
                <path d="M0,10 Q12.5,2 25,10 T50,10 T75,10 T100,10 T125,10 T150,10 T175,10 T200,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="space-y-4">
                <button onClick={onStart} className="w-full md:w-auto px-16 py-6 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-[0.5em] shadow-2xl hover:bg-blue-600 transition-all active:scale-95">Ver funcionamiento</button>
                <button onClick={onSkip} className="block w-full text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-colors underline underline-offset-4">Saltar e ir directo a la compra</button>
            </div>
        </div>
    );
}
