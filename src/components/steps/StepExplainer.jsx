import { IconFish, IconPerson } from '../common/icons';

export default function StepExplainer({ onBack, onNext }) {
    return (
        <div className="flex-1 flex flex-col bg-blue-600 rounded-[3rem] p-6 md:p-16 text-white animate-slide-right shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 scale-150 rotate-12"><IconFish /></div>

            <div className="max-w-2xl mx-auto space-y-8 relative z-10 h-full flex flex-col justify-center">
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

                <div className="pt-2 space-y-6">
                    <h4 className="font-black text-[10px] uppercase text-blue-200 tracking-widest text-center">Calcula la duración según tu hogar:</h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        <div onClick={onNext} className="duration-card bg-white/10 p-4 rounded-3xl border border-white/5 group">
                            <div className="flex justify-center mb-2"><IconPerson qty={1} color="#fff"/></div>
                            <p className="font-black text-[8px] uppercase leading-tight">1 persona<br/>2 Meses</p>
                        </div>
                        <div onClick={onNext} className="duration-card bg-white/10 p-4 rounded-3xl border border-white/5 group">
                            <div className="flex justify-center mb-2"><IconPerson qty={2} color="#fff"/></div>
                            <p className="font-black text-[8px] uppercase leading-tight">2 personas<br/>1 Mes</p>
                        </div>
                        <div onClick={onNext} className="duration-card bg-white/10 p-4 rounded-3xl border border-white/5 group">
                            <div className="flex justify-center mb-2"><IconPerson qty={4} color="#fff"/></div>
                            <p className="font-black text-[8px] uppercase leading-tight">4 personas<br/>2 Semanas</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <button onClick={onBack} className="w-full sm:w-auto text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 p-4 transition-opacity">Atrás</button>
                        <button onClick={onNext} className="w-full sm:flex-1 py-6 bg-white text-blue-600 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-blue-50 transition-all active:scale-95">Empezar selección (Bloque A)</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
