import { IconArrowLeft, IconSparkles } from './icons';

export default function Header({ currentStep, setStep, savings }) {
    if (currentStep === 0 || currentStep === 8) return null;

    const steps = [
        { id: 1, label: 'Inicio' },
        { id: 2, label: 'Perfil' },
        { id: 3, label: 'Bloque A' },
        { id: 4, label: 'Bloque B' },
        { id: 5, label: 'Bloque C' },
        { id: 6, label: 'Revisión' },
        { id: 7, label: 'Envío' }
    ];

    const activeIndex = steps.findIndex(s => s.id === currentStep);
    const progress = activeIndex === -1 ? (currentStep > 7 ? 100 : 0) : (activeIndex / (steps.length - 1)) * 100;

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

                    {(currentStep >= 3 && currentStep <= 6) && (
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
}
