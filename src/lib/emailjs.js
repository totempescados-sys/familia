import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Envía el email de confirmación de marca al cliente. Nunca debe bloquear
// el pedido: si EmailJS no está configurado todavía o falla, se registra
// en consola y no se lanza ningún error hacia quien la llama.
export async function sendConfirmationEmail({ userData, orderMessage, totalPrice }) {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        console.warn('EmailJS no está configurado todavía (faltan VITE_EMAILJS_* en .env.local) — se omite el email de confirmación.');
        return { sent: false, reason: 'not_configured' };
    }

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            to_name: userData.name,
            to_email: userData.email,
            order_details: orderMessage,
            total: `${totalPrice.toFixed(2)}€`,
        }, { publicKey: PUBLIC_KEY });
        return { sent: true };
    } catch (e) {
        console.error('Fallo al enviar el email de confirmación (el pedido ya está a salvo en Formspree):', e);
        return { sent: false, reason: 'send_error' };
    }
}
