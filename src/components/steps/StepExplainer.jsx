import { IconFish } from '../common/icons';
import { PROFILES } from '../../lib/profiles';
import { BASE_PACK_PRICE } from '../../lib/constants';

export default function StepExplainer({ onBack, onNext, onSelectProfile, showIntro = true, packCount, onSetPackCount, onDoublePackSelected }) {
    return (
        <div className="flex-1 flex flex-col explainer-gradient rounded-[3rem] p-6 md:p-16 text-white animate-slide-right shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 scale-150 rotate-12"><IconFish /></div>

            <div className="max-w-2xl mx-auto space-y-8 relative z-10 h-full flex flex-col justify-center">
                {showIntro ? (
                    <>
                        <div className="text-center space-y-2">
                            <h2 className="font-heading text-5xl md:text-8xl leading-none uppercase tracking-tighter">Cómo crear tu pack</h2>
                            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-blue-200">Personaliza tus 24 raciones en 3 simples pasos secuenciales</p>
                        </div>

                        {/* Flujo visual de bloques secuenciales */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white/10 p-5 rounded-[2rem] border border-white/10 flex items-center gap-5">
                                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0">A</div>
                                <div>
                                    <h4 className="font-black text-xs uppercase tracking-widest">Paso 1: Nuestras Playas <span className="text-blue-200 ml-2">(Escoge 8 raciones)</span></h4>
                                    <p className="text-[10px] md:text-xs opacity-80 mt-1 leading-tight">Lo mejor de la lonja: Gallineta, Clochinas, Trucha, Caballa y Lenguado.</p>
                                </div>
                            </div>

                            <div className="bg-white/10 p-5 rounded-[2rem] border border-white/10 flex items-center gap-5">
                                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0">B</div>
                                <div>
                                    <h4 className="font-black text-xs uppercase tracking-widest">Paso 2: Los Clásicos <span className="text-blue-200 ml-2">(Escoge 10 raciones)</span></h4>
                                    <p className="text-[10px] md:text-xs opacity-80 mt-1 leading-tight">Básicos para el día a día: Merluza, Dorada, Lubina, Emperador, Sepia, etc.</p>
                                </div>
                            </div>

                            <div className="bg-white/10 p-5 rounded-[2rem] border border-white/10 flex items-center gap-5">
                                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0">C</div>
                                <div>
                                    <h4 className="font-black text-xs uppercase tracking-widest">Paso 3: Los Gourmet <span className="text-blue-300 ml-2">(Escoge 6 raciones)</span></h4>
                                    <p className="text-[10px] md:text-xs opacity-90 mt-1 font-bold text-yellow-300 leading-tight">★ Los favoritos: ¡Aquí están el Salmón, Bacalao, Atún, Rape y Calamar!</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 py-4 border-y border-white/10">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-white/20 p-2 rounded-xl flex-shrink-0">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v20M2 12h20" strokeLinecap="round"/></svg>
                                </div>
                                <p className="text-xs md:text-sm font-medium leading-tight">
                                    <strong>Funcionamiento:</strong> Este pack se basa en raciones y no en kilos. Completa las raciones de cada bloque para poder avanzar al siguiente. Así garantizamos un precio cerrado de 118€ sin importar qué elijas.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-white/20 p-2 rounded-xl flex-shrink-0">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                                </div>
                                <p className="text-xs md:text-sm font-medium leading-tight">
                                    <strong>Ahorro de espacio:</strong> Todo viene sin espinas y en sobres especiales para congelar. No ocupa, no mancha. Listo para cocinar.
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center space-y-2">
                        <h2 className="font-heading text-5xl md:text-7xl leading-none uppercase tracking-tighter">Elige cómo montar tu pack</h2>
                    </div>
                )}

                <div className="space-y-4">
                    <h4 className="font-black text-[10px] uppercase text-blue-200 tracking-widest text-center">¿Cuántos packs quieres?</h4>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => onSetPackCount(1)}
                            className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${packCount === 1 ? 'bg-white text-blue-600 shadow-lg' : 'bg-white/10 text-blue-200'}`}
                        >
                            1 Pack ({BASE_PACK_PRICE}€)
                        </button>
                        <button
                            onClick={() => { if (packCount === 1) onDoublePackSelected(); }}
                            className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${packCount === 2 ? 'bg-white text-blue-600 shadow-lg' : 'bg-white/10 text-blue-200'}`}
                        >
                            2 Packs ({BASE_PACK_PRICE * 2}€)
                        </button>
                    </div>
                </div>

                <div className="pt-2 space-y-6">
                    <h4 className="font-black text-[10px] uppercase text-blue-200 tracking-widest text-center">Modo rápido: elige un perfil y te lo dejamos listo para revisar</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {PROFILES.map(profile => (
                            <button
                                key={profile.id}
                                onClick={() => onSelectProfile(profile)}
                                className="duration-card text-left bg-white/10 p-4 rounded-3xl border border-white/5"
                            >
                                <p className="font-black text-[10px] uppercase leading-tight">{profile.name}</p>
                                <p className="text-[9px] opacity-80 mt-1 leading-tight">{profile.desc}</p>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-60">o</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button onClick={onBack} className="w-full sm:w-auto text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 p-4 transition-opacity">Atrás</button>
                        <button onClick={onNext} className="w-full sm:flex-1 py-6 bg-white text-blue-600 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-blue-50 transition-all active:scale-95">Modo manual: elegir pescado a pescado</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
