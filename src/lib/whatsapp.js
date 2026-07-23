import { STORES, BLOCKS } from './constants';
import { getDistance } from './distance';

export function generateWhatsAppLink({ userData, userGeo, selections, packCount, totalPrice }) {
    const valenciaData = STORES.find(s => s.id === 'quart');
    const sedaviData = STORES.find(s => s.id === 'sedavi');
    let targetPhone = valenciaData.whatsapp;

    if (userData.deliveryMethod === 'recogida' && userData.pickupLocation) {
        if (userData.pickupLocation.toLowerCase().includes('sedaví')) {
            targetPhone = sedaviData.whatsapp;
        } else {
            targetPhone = valenciaData.whatsapp;
        }
    }
    else if (userData.marketingStore) {
        if (userData.marketingStore.toLowerCase() === 'sedaví') {
            targetPhone = sedaviData.whatsapp;
        } else {
            targetPhone = valenciaData.whatsapp;
        }
    }
    else if (userGeo) {
        const distVal = getDistance(userGeo.lat, userGeo.lon, valenciaData.lat, valenciaData.lon);
        const distSed = getDistance(userGeo.lat, userGeo.lon, sedaviData.lat, sedaviData.lon);
        targetPhone = distSed < distVal ? sedaviData.whatsapp : valenciaData.whatsapp;
    }

    const text = `¡Hola Tótem! He realizado mi pedido de Pack Familiar:\n\n👤 *Cliente:* ${userData.name}\n📦 *Packs:* ${packCount}\n💰 *Total:* ${totalPrice.toFixed(2)}€\n📍 *Método:* ${userData.deliveryMethod.toUpperCase()}\n🐟 *Pescado:* ${Object.entries(selections).filter(([_,v])=>v>0).map(([k,v])=> `${BLOCKS.flatMap(b=>b.items).find(i=>i.id===k).name}(${v})`).join(', ')}`;
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}
