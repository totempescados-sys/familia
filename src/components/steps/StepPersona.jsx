import { PERSONAS } from '../../lib/personas';

export default function StepPersona({ onSelect, onBack }) {
    return (
        <div className="flex-1 flex flex-col bg-blue-600 rounded-[3rem] p-6 md:p-16 text-white animate-slide-right shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-8 relative z-10 h-full flex flex-col justify-center">
                <div className="text-center space-y-2">
                    <h2 className="font-heading text-5xl md:text-8xl leading-none uppercase tracking-tighter">¿Para quién es tu pack?</h2>
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-blue-200">Te sugerimos una combinación, tú decides si la cambias</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PERSONAS.map(persona => (
                        <button
                            key={persona.id}
                            onClick={() => onSelect(persona)}
                            className="duration-card text-left bg-white/10 p-5 rounded-[2rem] border border-white/10 flex items-start gap-4"
                        >
                            <span className="text-3xl leading-none">{persona.emoji}</span>
                            <div>
                                <h4 className="font-black text-xs uppercase tracking-widest">{persona.label}</h4>
                                <p className="text-[10px] opacity-80 mt-1 leading-tight">{persona.description}</p>
                            </div>
                        </button>
                    ))}
                    <button
                        onClick={() => onSelect(null)}
                        className="duration-card text-left bg-white/5 p-5 rounded-[2rem] border border-dashed border-white/20 flex items-start gap-4 sm:col-span-2"
                    >
                        <span className="text-3xl leading-none">🐟</span>
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-widest">Prefiero elegir yo</h4>
                            <p className="text-[10px] opacity-80 mt-1 leading-tight">Empiezo con los bloques en blanco, sin sugerencias</p>
                        </div>
                    </button>
                </div>

                <div className="pt-2">
                    <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 p-4 transition-opacity">Atrás</button>
                </div>
            </div>
        </div>
    );
}
