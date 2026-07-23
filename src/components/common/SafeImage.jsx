import { useState } from 'react';

// Evita caídas si el archivo de imagen no existe
export default function SafeImage({ src, alt, className, fallbackText }) {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
        return (
            <div className={`${className} bg-slate-100 flex items-center justify-center p-2 text-center border border-slate-200/50`}>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">
                    {fallbackText || 'TÓTEM'}
                </span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
        />
    );
}
