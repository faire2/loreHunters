import cloneDeep from 'lodash/cloneDeep';
import {CARD_STATE, CARD_TYPE} from "../../data/idLists";
import {shuffleArray} from "./initialStateFunctions";

export function addCardToHand(card, origPlayerState) {
    let tPlayerState = cloneDeep(origPlayerState);

    card.state = CARD_STATE.inHand;
    tPlayerState.hand.push(card);
    return cloneDeep(tPlayerState);
}

export function addCardToDiscardDeck(card, tPlayersState) {
    card.state = CARD_STATE.discard;
    tPlayersState.discardDeck.push(card);
    return tPlayersState;
}

export function drawCards(cardsNum, origPlayerState) {
    let tPlayerState = {...origPlayerState};

    let drawDeck = [...tPlayerState.drawDeck];
    for (let i = 0; i < cardsNum; i++) {
        if (drawDeck.length === 0) {
            tPlayerState = addDiscardToDrawDeck(tPlayerState);
        }
        if (tPlayerState.drawDeck.length > 0) {
            tPlayerState = addCardToHand(drawDeck[0], tPlayerState);
            tPlayerState.drawDeck.splice(0, 1);
        }
    }
    return tPlayerState;
}

export function addDiscardToDrawDeck(origPlayerState) {
    console.log("RESHUFFLING...");
    let tPlayerState = {...origPlayerState};
    tPlayerState.discardDeck = shuffleArray(tPlayerState.discardDeck);
    const tDrawDeck = [...tPlayerState.discardDeck];

    for (let i = 0; i < tDrawDeck.length; i++) {
        let tCard = {...tDrawDeck[i]};
        tCard.state = CARD_STATE.drawDeck;
        tDrawDeck.splice(i, 1, tCard);
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
    if (card !== null) {tPlayerState.destroyedCards.push(card)}
    return tPlayerState;
}