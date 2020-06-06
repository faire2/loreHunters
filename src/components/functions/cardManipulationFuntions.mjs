import cloneDeep from 'lodash/cloneDeep.js';
import {ARTIFACT_IDs, EXPEDITIONS_IDs, GUARDIAN_IDs, ITEM_IDs} from "../../data/idLists.mjs";
import {EFFECT} from "../../data/effects.mjs";
import {CARD_STATE, CARD_TYPE} from "./enums.mjs";

export function addCardToHand(card, origPlayerState) {
    let tPlayerState = cloneDeep(origPlayerState);
    if (card) {
        card.state = CARD_STATE.inHand;
        tPlayerState.hand.push(card);
    }
    return tPlayerState;
}

export function addCardToDiscardDeck(card, tPlayersState) {
    let idCard = getIdCard(card);
    idCard.state = CARD_STATE.discard;
    tPlayersState.discardDeck.push(idCard);
    return tPlayersState;
}

export function drawCards(cardsNum, origPlayerState) {
    let tPlayerState = cloneDeep(origPlayerState);
    let drawDeck = tPlayerState.drawDeck;
    // if we draw a guardian, it will implement it's lock effect after all cards were drawn
    let lockEffects = [];
    // guardians are then deployed to active cards area with locked cards
    let guardians = [];
    for (let i = 0; i < cardsNum; i++) {
        if (drawDeck.length === 0) {
            tPlayerState = addDiscardToDrawDeck(tPlayerState);
            drawDeck = tPlayerState.drawDeck;
        }
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
    tPlayerState = activateGuardianAndLockEffects(tPlayerState, guardians, lockEffects);
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

export function addDiscardToDrawDeck(origPlayerState) {
    console.log("RESHUFFLING...");
    let tPlayerState = cloneDeep(origPlayerState);
    tPlayerState.discardDeck = shuffleArray(tPlayerState.discardDeck);
    const tDrawDeck = cloneDeep(tPlayerState.discardDeck);

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

export function removeCard(card, tPlayerState) {
    console.log("removing card : " + card.name);
    switch (card.state) {
        case CARD_STATE.inHand:
            tPlayerState.hand = spliceCardIfFound(card, tPlayerState.hand);
            break;
        case CARD_STATE.active:
            tPlayerState.activeCards = spliceCardIfFound(card, tPlayerState.activeCards);
            break;
        case CARD_STATE.discard:
            tPlayerState.discardDeck = spliceCardIfFound(card, tPlayerState.discardDeck);
            break;
        case CARD_STATE.drawDeck:
            tPlayerState.drawDeck = spliceCardIfFound(card, tPlayerState.drawDeck);
            break;
        case CARD_STATE.inStore:
        case CARD_STATE.destroyed:
        default:
            console.log("Cannot remove card " + card.id + ", state: " + card.state);
    }
    tPlayerState.destroyedCards.push(getIdCard(card));
    return tPlayerState;
}

export function getIdCard(jsxCard) {
    const cardId = jsxCard.id;
    if (ITEM_IDs[cardId]) {
        return ITEM_IDs[cardId]
    } else if (ARTIFACT_IDs[cardId]) {
        return ARTIFACT_IDs[cardId]
    } else if (GUARDIAN_IDs[cardId]) {
        return GUARDIAN_IDs[cardId]
    } else if (EXPEDITIONS_IDs[cardId]) {
        return EXPEDITIONS_IDs[cardId]
    } else {
        console.log("Unhable to get IdCard for: " + jsxCard.id);
    }
}

export function activateGuardianAndLockEffects(tPlayerState, guardians, lockEffects) {
    for (let i = 0; i < guardians.length; i++) {
        guardians[i].state = CARD_STATE.active;
        tPlayerState.activeCards.push(guardians[i]);
        guardians[i].locked = [];
        for (let effect of lockEffects[i]) {
            switch (effect) {
                case EFFECT.lockCard:
                    // if guardians come at the beginning of the round, the card is locked when the whole hand is drawn
                    if (tPlayerState.hand.length > 0) {
                        const randomCardIndex = Math.floor(Math.random() * (tPlayerState.hand.length));
                        let lockedCard = tPlayerState.hand[randomCardIndex];
                        lockedCard.state = CARD_STATE.locked;
                        tPlayerState.activeCards.push(lockedCard);
                        tPlayerState.hand.splice(randomCardIndex, 1);
                        guardians[i].locked.push(effect);
                    } else {
                        console.log("Unable to lock card while drawing. Player hand: " + tPlayerState.hand);
                    }
                    break;
                case EFFECT.lockAdventurer:
                    if (tPlayerState.availableAdventurers > 0) {
                        tPlayerState.availableAdventurers -= 1;
                        guardians[i].locked.push(effect);
                    } else {
                        console.log("Unable to lock adventurer while drawing. Adventurers: " + tPlayerState.availableAdventurers);
                    }
                    break;
                case EFFECT.lockCoin:
                    if (tPlayerState.resources.coins > 0) {
                        tPlayerState.resources.coins -= 1;
                        guardians[i].locked.push(effect);
                    } else {
                        console.log("Unable to lock coins while drawing. Resources: " + tPlayerState.resources);
                    }
                    break;
                case EFFECT.lockExplore:
                    if (tPlayerState.resources.explore > 0) {
                        tPlayerState.resources.explore -= 1;
                        guardians[i].locked.push(effect);
                    } else {
                        console.log("Unable to lock explore while drawing. Resources: " + tPlayerState.resources);
                    }
                    break;
                case EFFECT.lockText:
                    if (tPlayerState.resources.texts > 0) {
                        tPlayerState.resources.texts -= 1;
                        guardians[i].locked.push(effect);
                    } else {
                        console.log("Unable to lock weapons while drawing. Resources: " + tPlayerState.resources);
                    }
                    break;
                case EFFECT.lockWeapon:
                    if (tPlayerState.resources.weapons > 0) {
                        tPlayerState.resources.weapons -= 1;
                        guardians[i].locked.push(effect);
                    } else {
                        console.log("Unable to lock weapons while drawing. Resources: " + tPlayerState.resources);
                    }
                    break;
                case EFFECT.lockJewel:
                    if (tPlayerState.resources.jewels > 0) {
                        tPlayerState.resources.jewels -= 1;
                        guardians[i].locked.push(effect);
                    } else {
                        console.log("Unable to lock weapons while drawing. Resources: " + tPlayerState.resources);
                    }
                    break;
                default:
                    console.log("Cannot process lock effect in drawCards: " + lockEffects[i]);
            }
        }
    }
    return tPlayerState
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