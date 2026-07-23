export default function TermsModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[600] flex items-center justify-center p-4 animate-fade">
            <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-modal">
                <div className="p-8 bg-slate-900 text-white text-center flex-shrink-0">
                    <h3 className="text-3xl font-heading uppercase tracking-tighter">Condiciones</h3>
                </div>
                <div className="p-8 overflow-y-auto flex-1 space-y-6 text-slate-600">
                    <section className="space-y-2">
                        <h4 className="font-black text-xs uppercase text-slate-900">1. Reserva Personalizada</h4>
                        <p className="text-[11px] leading-relaxed font-medium">Este pedido constituye una reserva en firme. Debido a la naturaleza del producto, el peso final de las raciones puede variar ligeramente según la pieza seleccionada en lonja.</p>
                    </section>
                    <section className="space-y-2">
                        <h4 className="font-black text-xs uppercase text-slate-900">2. Proceso de Congelación</h4>
                        <p className="text-[11px] leading-relaxed font-medium">La opción "Ya Congelado" utiliza un proceso de abatimiento profesional de temperatura. Este proceso requiere un mínimo de 48h para garantizar que la estructura celular del pescado no se dañe.</p>
                    </section>
                    <section className="space-y-2">
                        <h4 className="font-black text-xs uppercase text-slate-900">3. Política de Entrega</h4>
                        <p className="text-[11px] leading-relaxed font-medium">El cliente debe estar disponible en la franja horaria acordada. En caso de ausencia, el repartidor contactará telefónicamente. Pasados 10 min, el pedido volverá a tienda.</p>
                    </section>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex-shrink-0">
                    <button onClick={onClose} className="w-full py-4 bg-blue-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg">Cerrar</button>
                </div>
            </div>
        </div>
    );
}
