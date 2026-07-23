import { BLOCKS, EXTRAS } from './constants';

export function buildOrderMessage({ userData, packCount, selections, extraSelections, totalPrice }) {
    // BLOQUE DATOS CLIENTE
    const lugarEntrega = userData.deliveryMethod === 'recogida'
        ? `Tienda de recogida: ${userData.pickupLocation}`
        : `Dirección de envío: ${userData.address}`;
    const ofertasWhatsapp = userData.whatsappOptIn
        ? `Quiere ofertas por WhatsApp: SÍ (tienda: ${userData.marketingStore || 'sin especificar'})`
        : `Quiere ofertas por WhatsApp: NO`;
    const bloqueCliente = `BLOQUE DATOS CLIENTE:\n` +
        `Nombre: ${userData.name}\n` +
        `Teléfono: ${userData.phone}\n` +
        `Email: ${userData.email}\n` +
        `Nº de Packs: ${packCount}\n` +
        `Método de Entrega: ${userData.deliveryMethod.toUpperCase()}\n` +
        `${lugarEntrega}\n` +
        `Fecha/Hora: ${userData.pickupDate} - ${userData.pickupTime}\n` +
        `Conservación: ${userData.preservation.toUpperCase()}\n` +
        `Comentarios: ${userData.comments || 'Ninguno'}\n` +
        `${ofertasWhatsapp}`;

    // BLOQUE PEDIDO PESCADO
    const itemsPescado = Object.entries(selections)
        .filter(([_, qty]) => qty > 0)
        .map(([id, qty]) => {
            const item = BLOCKS.flatMap(b => b.items).find(i => i.id === id);
            return `${qty} uds. - ${item.name}`;
        })
        .join('\n');
    const bloquePescado = `BLOQUE PEDIDO PESCADO:\n${itemsPescado || 'Sin selección'}`;

    // BLOQUE EXTRAS
    const itemsExtras = Object.entries(extraSelections)
        .filter(([_, qty]) => qty > 0)
        .map(([id, qty]) => {
            const extra = EXTRAS.find(e => e.id === id);
            return `${qty} uds. - ${extra.name}`;
        })
        .join('\n');
    const bloqueExtras = `BLOQUE EXTRAS:\n${itemsExtras || 'Sin extras'}`;

    return `${bloqueCliente}\n\n${bloquePescado}\n\n${bloqueExtras}\n\nTOTAL: ${totalPrice.toFixed(2)}€`;
}
