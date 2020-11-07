import cloneDeep from "lodash/cloneDeep.js";
import {CARD_STATE, CARD_TYPE} from "./enums.mjs";

export function addCardToHand(card, origPlayerState) {
    let tPlayerState = cloneDeep(origPlayerState);
    if (card) {
        card.state = CARD_STATE.inHand;
        tPlayerState.hand.push(card);
    }
    return tPlayerState;
}

export function addCardToPlayedCards(card, tPlayersState) {
    card.state = CARD_STATE.played;
    tPlayersState.activeCards.push(card);
    return tPlayersState;
}

//todo remove guardians as they are part of location now
export function drawCards(cardsNum, origPlayerState) {
    let tPlayerState = cloneDeep(origPlayerState);
    let drawDeck = tPlayerState.drawDeck;
    // if we draw a guardian, it will implement it's lock effect after all cards were drawn
    let lockEffects = [];
    // guardians are then deployed to active cards area with locked cards
    let guardians = [];
    for (let i = 0; i < cardsNum; i++) {
        // todo if there are no cards to draw the effect is forfeit
        /*if (drawDeck.length === 0) {
            tPlayerState = addActiveCardsToDrawDeck(tPlayerState);
            drawDeck = tPlayerState.drawDeck;
        }*/
        if (drawDeck.length > 0) {
            let card = drawDeck[0];
            // guardians go to play area and another card is drawn to hand
            if (card.type === CARD_TYPE.guardian) {
                lockEffects.push(card.lockEffects);
                card.state = CARD_STATE.active;
                guardians.push(card);
                cardsNum += 1;
            } else {
                tPlayerState = addCardToHand(card, tPlayerState);
                console.log("Card added: " + card.id + ". Card state: " + tPlayerState.hand[tPlayerState.hand.length - 1].state);
            }
            drawDeck.splice(0, 1);
            tPlayerState.drawDeck = drawDeck;
        }
    }
    console.log("draw deck length: " + drawDeck.length);
    console.log("*Checking card states in hand:");
    for (let card of tPlayerState.hand) {
        if (card.state !== CARD_STATE.inHand)
            console.log("WRONG CARD STATE: " + card.id);
    }
    return tPlayerState;
}

export function drawInitialCards(deck, cardsToDraw) {
    const drawCards = [];
    for (let i = 0; i < cardsToDraw; i++) {
        const rnPosition = getRandomNumber(deck.length - 1, 1);
        drawCards.push(deck[rnPosition]);
        deck.splice(rnPosition, 1);
    }
    return {deck: deck, drawCards: drawCards}
}

function getRandomNumber(size) {
    return Math.floor(Math.random() * (size)) + 1;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
}

export function addActiveCardsToDrawDeck(origPlayerState) {
    console.log("RESHUFFLING...");
    let tPlayerState = cloneDeep(origPlayerState);
    tPlayerState.activeCards = shuffleArray(tPlayerState.activeCards);
    const tDrawDeck = cloneDeep(tPlayerState.activeCards);

    for (let card of tDrawDeck) {
        card.state = CARD_STATE.drawDeck;
    }

    tPlayerState.activeCards = [];
    tPlayerState.drawDeck = tDrawDeck;
    return tPlayerState;
}

export function addCardToStore(cardType, store) {
    let tCard = "";
    if (cardType === CARD_TYPE.item) {
        tCard = store.itemsDeck[0];
        tCard.state = CARD_STATE.inStore;
        store.itemsOffer.push(tCard);
        store.itemsDeck.splice(0, 1);
    } else if (cardType === CARD_TYPE.artifact) {
        tCard = store.artifactsDeck[0];
        tCard.state = CARD_STATE.inStore;
        store.artifactsOffer.push(tCard);
        store.artifactsDeck.splice(0, 1);
    } else {
        console.log("Unknown card type in addCardToStore: " + cardType);
    }
    return cloneDeep(store);
}

export function removeCard(card, tPlayerState, tStore) {
    console.log("removing card : " + card.name);
    switch (card.state) {
        case CARD_STATE.inHand:
            tPlayerState.hand = spliceCardIfFound(card, tPlayerState.hand);
            break;
        case CARD_STATE.active:
        case CARD_STATE.played:
            tPlayerState.activeCards = spliceCardIfFound(card, tPlayerState.activeCards);
            break;
        case CARD_STATE.drawDeck:
            tPlayerState.drawDeck = spliceCardIfFound(card, tPlayerState.drawDeck);
            break;
        case CARD_STATE.inStore:
        case CARD_STATE.destroyed:
        default:
            console.log("Cannot remove card " + card.id + ", state: " + card.state);
    }
    tStore.destroyedCards.push(card);
    return tPlayerState;
}

export function spliceCardIfFound(card, cardsArr) {
    for (let i = 0; i < cardsArr.length; i++) {
        if (cardsArr[i].id === card.id) {
            cardsArr.splice(i, 1);
            break;
        }
    }
    return cardsArr;
}