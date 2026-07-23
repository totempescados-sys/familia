import { BLOCKS, EXTRAS, SAVINGS_PER_SERVING, BASE_PACK_PRICE } from './constants';

export function calcBlockTotal(selections, blockId) {
    const block = BLOCKS.find(b => b.id === blockId);
    return block.items.reduce((s, i) => s + (selections[i.id] || 0), 0);
}

export function validateAllBlocks(selections, packCount) {
    return BLOCKS.every(b => calcBlockTotal(selections, b.id) === (b.baseLimit * packCount));
}

export function totalServingsSelected(selections) {
    return Object.values(selections).reduce((a, b) => a + b, 0);
}

export function currentTotalSavings(selections) {
    return (totalServingsSelected(selections) * SAVINGS_PER_SERVING).toFixed(2);
}

export function computePrices(packCount, extraSelections, deliveryMethod) {
    const basePrice = packCount * BASE_PACK_PRICE;
    const extrasPrice = EXTRAS.reduce((s, e) => s + (e.price * (extraSelections[e.id] || 0)), 0);
    const shippingPrice = deliveryMethod === 'domicilio' ? 10 : 0;
    const totalPrice = basePrice + extrasPrice + shippingPrice;
    return { basePrice, extrasPrice, shippingPrice, totalPrice };
}
