import {shuffleArray} from "./CardManipulationFuntions";
import {ARTIFACTS, CARD_STATE, CARD_TYPE, ITEMS} from "../../data/cards";
import {GLOBAL_VARS} from "../../App";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATIONS} from "../../data/locations";

/* INITIAL PLAYER STATE */
export function getInitialPlayerStates() {
    let playerStates = [];

    for (let i = 0; i < GLOBAL_VARS.numOfPlayers; i++) {
        let playerState = {
            finishedRound: false,
            resources: {
                coins: 20,
                explore: 20,
                texts: 0,
                weapons: 0,
                jewels: 0,
                shinies: 20,
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
            destroyedCards: [],
            color: GLOBAL_VARS.playerColors[i],
        };

        const initialCards = shuffleArray([...GLOBAL_VARS.initialCards]);
        const cardsSetup = drawCards(initialCards, GLOBAL_VARS.handSize);
        const hand = [];
        const drawDeck = [];
        /*cardsSetup.drawCards.push(ITEMS.whip);*/

        for (let card of cardsSetup.deck) {
            card.state = CARD_STATE.drawDeck;
            drawDeck.push(card);
        }

        for (let card of cardsSetup.drawCards) {
            card.state = CARD_STATE.inHand;
            hand.push(card);
        }

        playerState.hand = hand;
        playerState.drawDeck = drawDeck;
        playerStates.push(playerState);
    }
    return playerStates;
}

/* INITIAL STORE */
export function getInitialStoreItems() {
    /* all items, each item is represented only once! */
    let items = shuffleArray(Object.keys(ITEMS).map(key => {
        return ITEMS[key];
    }));
    items = items.filter(card => card.type !== CARD_TYPE.basic);

    let artifacts = shuffleArray(Object.keys(ARTIFACTS).map(key => {
        ARTIFACTS[key].state = CARD_STATE.inStore;
        return ARTIFACTS[key];
    }));

    let itemsSetup = drawCards(items, GLOBAL_VARS.storeSize);
    itemsSetup.drawCards.push(ARTIFACTS.amuletOfCharm);
    artifacts.splice(0, 1);

    for (let card of itemsSetup.drawCards) {
        card.state = CARD_STATE.inStore;
    }
    return {offer: itemsSetup.drawCards, itemsDeck: itemsSetup.deck, artifactsDeck: artifacts}
}

/* INITIAL LOCATIONS */
export function getInitialLocations() {
    let locations = LOCATIONS;
    for (let i = 0; i < locations.length; i++) {
        let location = locations[i];
        location.state = (location.level === LOCATION_LEVEL["1"]) ? LOCATION_STATE.explored : LOCATION_STATE.unexplored;
        location.index = i;
    }
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