import {shuffleArray} from "./cardManipulationFuntions.js";
import {ARTIFACTS, CARD_STATE, CARD_TYPE, GUARDIANS, ITEMS} from "../../data/cards.mjs";
import {LOCATION_LEVEL, LOCATION_STATE, LOCATIONS} from "../../data/locations.mjs";
import React from "react";
import {cloneDeep} from "lodash";



/* INITIAL PLAYER STATE */
export default function getInitialPlayerStates() {
    let playerStates = [];

    for (let i = 0; i < GLOBAL_VARS.numOfPlayers; i++) {
        let playerState = {
            finishedRound: false,
            resources: {
                coins: 20,
                explore: 20,
                texts: 2,
                weapons: 0,
                jewels: 0,
                shinies: 20,
                walk: 0,
                jeep: 0,
                ship: 0,
                plane: 0
            },
            activeEffects: [],
            availableAdventurers: GLOBAL_VARS.adventurers,
            hand: [],
            activeCard: false,
            drawDeck: [],
            discardDeck: [],
            playedCards: [],
            destroyedCards: [],
            color: GLOBAL_VARS.playerColors[i],
            actions: 1,
            guardians: [],
        };

        const initialCards = shuffleArray([...GLOBAL_VARS.initialCards]);
        const cardsSetup = drawCards(initialCards, GLOBAL_VARS.handSize);
        const hand = [];
        const drawDeck = [];

        /*cardsSetup.drawCards.push(ARTIFACTS.ringOfLight);*/

        for (let card of cardsSetup.deck) {
            drawDeck.push(card);
        }

        for (let card of cardsSetup.drawCards) {
            card.state = CARD_STATE.inHand;
            hand.push(card);
        }

        let guardians = [];

        for (let key in GUARDIANS) {
            guardians.push(GUARDIANS[key]);
        }

        playerState.hand = hand;
        playerState.drawDeck = drawDeck;
        playerState.guardians = shuffleArray(guardians);
        playerStates.push(playerState);
    }
    // bug was causing draw deck status for 1st player to be "in hand"
    for (let playerState of playerStates) {
        for (let card of playerState.drawDeck) {
            card.state = CARD_STATE.drawDeck;
        }
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

    /* array of artifacts */
    let artifacts = shuffleArray(Object.keys(ARTIFACTS).map(key => {
        ARTIFACTS[key].state = CARD_STATE.inStore;
        return ARTIFACTS[key];
    }));

    let itemsSetup = drawCards(items, GLOBAL_VARS.itemsInStore);
    let artifactSetup = drawCards(artifacts, GLOBAL_VARS.artifactsInStore);


    for (let card of itemsSetup.drawCards) {
        card.state = CARD_STATE.inStore;
    }
    return {
        itemsOffer: itemsSetup.drawCards,
        artifactsOffer: artifactSetup.drawCards,
        itemsDeck: itemsSetup.deck,
        artifactsDeck: artifactSetup.deck
    }
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

export const GLOBAL_VARS = Object.freeze({
    handSize: 5,
    initialCards: [cloneDeep(ITEMS.fear), cloneDeep(ITEMS.fear), cloneDeep(ITEMS.coin), cloneDeep(ITEMS.coin), cloneDeep(ITEMS.explore), cloneDeep(ITEMS.explore)],
    itemsInStore: 5,
    artifactsInStore: 1,
    adventurers: 2,
    numOfPlayers: 2,
    playerColors: ["#FFD41A", "#2A8CFF", "#00CD27", "#CD1800"],
});


