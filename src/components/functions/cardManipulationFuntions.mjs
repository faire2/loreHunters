import cloneDeep from 'lodash/cloneDeep.js';
import {ARTIFACT_IDs, CARD_STATE, CARD_TYPE, GUARDIAN_IDs, ITEM_IDs} from "../../data/idLists.mjs";
import {shuffleArray} from "./initialStateFunctions.mjs";

export function addCardToHand(card, origPlayerState) {
    let tPlayerState = cloneDeep(origPlayerState);
    if (card) {
        card.state = CARD_STATE.inHand;
        tPlayerState.hand.push(card);
    }
    return tPlayerState;
}

export function addCardToDiscardDeck(card, tPlayersState) {
    let idCard = getIdCard(card)
    idCard.state = CARD_STATE.discard;
    tPlayersState.discardDeck.push(idCard);
    return tPlayersState;
}

export function drawCards(cardsNum, origPlayerState) {
    let tPlayerState = cloneDeep(origPlayerState);
    let drawDeck = tPlayerState.drawDeck;
    for (let i = 0; i < cardsNum; i++) {
        if (drawDeck.length === 0) {
            tPlayerState = addDiscardToDrawDeck(tPlayerState);
            drawDeck = tPlayerState.drawDeck;
        }
        if (drawDeck.length > 0) {
            let card = drawDeck[0];
            // guardians go to play area and another card is drawn to hand
            if (card.type === CARD_TYPE.guardian) {
                card.state = CARD_STATE.active;
                tPlayerState.activeCards.push(card);
                cardsNum += 1;
            } else {
                tPlayerState = addCardToHand(card, tPlayerState);
            }
            drawDeck.splice(0, 1);
            tPlayerState.drawDeck = drawDeck;
        }
        console.log("draw deck length: " + drawDeck.length);
    }
    return tPlayerState;
}

export function addDiscardToDrawDeck(origPlayerState) {
    console.log("RESHUFFLING...");
    let tPlayerState = cloneDeep(origPlayerState);
    tPlayerState.discardDeck = shuffleArray(tPlayerState.discardDeck);
    const tDrawDeck = [...tPlayerState.discardDeck];

    for (let card of tDrawDeck) {
        card.state = CARD_STATE.drawDeck;
    }

    tPlayerState.discardDeck = [];
    tPlayerState.drawDeck = tDrawDeck;
    return tPlayerState;
}

export function addCardToStore(cardType, store) {
    let tCard = "";
    if (cardType === CARD_TYPE.item) {
        tCard = store.itemsDeck[0];
        store.itemsDeck.splice(0, 1);
        store.itemsOffer.push(tCard)
    } else if (cardType === CARD_TYPE.artifact) {
        tCard = store.artifactsDeck[0];
        store.artifactsDeck.splice(0, 1);
        store.artifactsOffer.push(tCard);
    } else {
        console.log("Unknown card type in addCardToStore: " + cardType);
    }
    tCard.state = CARD_STATE.inStore;
    const tStore = cloneDeep(store);
    return tStore;
}

export function destroyCard(cardState, cardIndex, tPlayerState) {
    let card = null;
    console.log("destroying card");
    console.log(cardState);
    switch (cardState) {
        case CARD_STATE.inHand:
            card = tPlayerState.hand[cardIndex];
            tPlayerState.hand.splice(cardIndex, 1);
            break;
        case CARD_STATE.active:
            card = tPlayerState.activeCard;
            tPlayerState.activeCard = false;
            break;
        case CARD_STATE.discard:
            card = tPlayerState.discardDeck[cardIndex];
            tPlayerState.discardDeck.splice(cardIndex, 1);
            break;
        case CARD_STATE.inStore:
        case CARD_STATE.destroyed:
        default:
            console.log("Cannot process state " + cardState + " while removing card.");
    }
    if (card !== null) {
        tPlayerState.destroyedCards.push(card)
    }
    return tPlayerState;
}

export function getIdCard(jsxCard) {
    const cardId = jsxCard.id;
    switch (jsxCard.type) {
        case (CARD_TYPE.basic):
        case (CARD_TYPE.item):
            return ITEM_IDs[cardId];
        case (CARD_TYPE.artifact):
            return ARTIFACT_IDs[cardId];
        case (CARD_TYPE.guardian):
            return GUARDIAN_IDs[cardId];
        default:
            console.log("Cannot determine idCard: " + jsxCard.id);
    }
}