import {CARD_STATE} from "../functions/enums.mjs";

export function autoExileCard(states, exileType) {
    const store = states.store;
    if (exileType === EXILE_CARDS.inner) {
        if (store.artifactsOffer.length > 3) {
            store.artifactsOffer.splice(2, 2, store.artifactsDeck[0], store.artifactsDeck[1]);
            store.artifactsDeck.splice(0, 2);
        } else  if (store.artifactsOffer.length === 3) {
            store.artifactsOffer.splice(2, 1, store.artifactsDeck[0]);
            store.artifactsDeck.splice(0, 1);
            store.itemsOffer.splice(0, 1, store.itemsDeck[0]);
            store.itemsDeck.splice(0, 1);
        } else {
            store.itemsOffer.splice(store.itemsOffer.length - 4, 2, store.itemsDeck[0], store.itemsDeck[1]);
            store.itemsDeck.splice(0, 2);
        }
    } else if (exileType === EXILE_CARDS.outer) {
        store.artifactsOffer.splice(0, 1, store.artifactsDeck[0]);
        store.artifactsDeck.splice(0, 1);
        store.itemsOffer.splice(store.itemsOffer.length - 1, 1, store.itemsDeck[0]);
        store.itemsDeck.splice(0, 1);
    } else {
        console.error("Unable to process exile type in autoExileCard: " + exileType);
    }
    for (let card of store.itemsOffer) {
        card.state = CARD_STATE.inStore
    }
    for (let card of store.artifactsOffer) {
        card.state = CARD_STATE.inStore
    }
    return states;
}


export const EXILE_CARDS = Object.freeze({
    inner: "exile inner cards",
    outer: "exile outer cards"
})