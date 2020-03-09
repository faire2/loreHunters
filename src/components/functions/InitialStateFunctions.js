import {shuffleArray} from "./CardManipulationFuntions";
import {CARD_STATE, CARD_TYPE, CARDS} from "../../data/cards";
import {GLOBAL_VARS} from "../../App";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATIONS} from "../../data/locations";

/* INITIAL PLAYER STATE */
export function getInitialPlayerState() {
    let playerState = {
        resources: {
            coins: 2,
            explore: 0,
            texts: 0,
            weapons: 0,
            jewels: 0,
            shiny: 0,
            walk: 0,
            jeep: 0,
            ship: 0,
            plane: 0
        },
        availableAdventurers: GLOBAL_VARS.adventurers,
        hand: [],
        activeCard: false,
        drawDeck: [],
        discardDeck: [],
        playedCards: [],
        destroyedCards: []
    };

    const initialCards = shuffleArray(GLOBAL_VARS.initialCards);

    const cardsSetup = drawCards(initialCards, GLOBAL_VARS.handSize);
    for (let card of cardsSetup.drawCards) {
        card.state = CARD_STATE.inHand;
    }

    playerState.hand = cardsSetup.drawCards;
    playerState.drawDeck = cardsSetup.deck;
    return playerState;
}

/* INITIAL STORE */
export function getInitialStoreItems() {
    /* all items, each item is represented only once! */
    let items = shuffleArray(Object.keys(CARDS).map(key => {
        return CARDS[key]
    }));
    items = items.filter(card => card.type !== CARD_TYPE.basic);

    let itemsSetup = drawCards(items, GLOBAL_VARS.storeSize);
    for (let card of itemsSetup.drawCards) {
        card.state = CARD_STATE.inStore;
    }
    return {itemsStore: itemsSetup.drawCards, itemsDeck: itemsSetup.deck}
}

/* INITIAL LOCATIONS */
export function getInitialLocations() {
    let locations = LOCATIONS;
    for (let i = 0; i < locations.length; i++) {
        let location = locations[i];
        location.state = (location.level === LOCATION_LEVEL["1"]) ? LOCATION_STATE.explored : LOCATION_STATE.unexplored;
        location.index = i;
    }
    console.log(locations);
    return locations;
}

function drawCards(deck, cardsToDraw) {
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