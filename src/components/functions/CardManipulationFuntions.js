import {CARD_STATE, CARD_TYPE} from "../../data/cards";

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
}

export function addCardToHand(card, tPlayerState) {
    card.state = CARD_STATE.inHand;
    tPlayerState.hand.push(card);
    return tPlayerState
}

export function addCardToDiscardDeck(card, tPlayersState) {
    card.state = CARD_STATE.discard;
    tPlayersState.discardDeck.push(card);
    return tPlayersState;
}

export function drawCards(cardsNum, tPlayerState) {
    let drawDeck = tPlayerState.drawDeck;
    for (let i = 0; i < cardsNum; i++) {
        if (drawDeck === 0) {
            tPlayerState = addDiscardToDrawDeck(tPlayerState);
        }
        tPlayerState = addCardToHand(drawDeck[0], tPlayerState);
        tPlayerState.drawDeck.splice(0, 1);
    }
    return tPlayerState;
}

export function addDiscardToDrawDeck(tPlayerState) {
    tPlayerState.discardDeck = shuffleArray(tPlayerState.discardDeck);
    tPlayerState.drawDeck = [...tPlayerState.discardDeck];

    for (let card of tPlayerState.drawDeck) {
        card.state = CARD_STATE.drawDeck;
    }
    tPlayerState.discardDeck = [];
    return tPlayerState;
}

export function addCardToStore(cardType, store) {
    let tCard = "";
    if (cardType === CARD_TYPE.item) {
        tCard = store.itemsDeck[0];
        store.itemsDeck.splice(0, 1);
    } else if (cardType === CARD_TYPE.artifact) {
        //todo implement
    } else {
        console.log("Unknown card type in addCardToStore: " + cardType);
    }
    tCard.state = CARD_STATE.inStore;
    const tStore = {...store};
    tStore.itemsStore.push(tCard);
    return tStore;
}

export function destroyCard(cardState, cardIndex, tPlayerState) {
    switch (cardState) {
        case CARD_STATE.inHand:
            tPlayerState.hand.splice(cardIndex, 1);
            break;
        case CARD_STATE.active:
            tPlayerState.activeCard = false;
            break;
        case CARD_STATE.discard:
            tPlayerState.discardDeck.splice(cardIndex, 1);
            break;
        case CARD_STATE.inStore:
        case CARD_STATE.destroyed:
            break;
        default:
            console.log("Cannot process state " + cardState + " while removing card.");
    }
    return tPlayerState;
}