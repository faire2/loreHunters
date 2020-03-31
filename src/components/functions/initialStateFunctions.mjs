import {
    ARTIFACT_IDs,
    GUARDIAN_IDs,
    ITEM_IDs,
    LOCATION_IDs,
    LOCATION_LEVEL,
    LOCATION_STATE,
    CARD_STATE,
    CARD_TYPE
} from "../../data/idLists.mjs";

export const GLOBAL_VARS = Object.freeze({
    handSize: 5,
    initialCards: [{...ITEM_IDs.coin}, {...ITEM_IDs.coin}, {...ITEM_IDs.explore}, {...ITEM_IDs.explore},
        {...ITEM_IDs.fear}, {...ITEM_IDs.fear}],
    itemsInStore: 5,
    artifactsInStore: 1,
    adventurers: 2,
    numOfPlayers: 2,
    playerColors: ["#FFD41A", "#2A8CFF", "#00CD27", "#CD1800"],
});

/* INITIAL PLAYER STATE */

export const emptyPlayerState = Object.freeze({
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
    color: null,
    actions: 1,
});

export default function getInitialPlayerStates() {
    let playerStates = [];

    for (let i = 0; i < GLOBAL_VARS.numOfPlayers; i++) {
        let playerState = {...emptyPlayerState};
        playerState.color = GLOBAL_VARS.playerColors[i];

        const initialCards = shuffleArray([...GLOBAL_VARS.initialCards]);
        const cardsSetup = drawCards(initialCards, GLOBAL_VARS.handSize);
        const hand = [];
        const drawDeck = [];

        /*cardsSetup.drawCards.push(ARTIFACTS.ringOfLight);*/

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
    let items = shuffleArray(Object.keys(ITEM_IDs).map(key => {
        return ITEM_IDs[key];
    }));
    items = items.filter(card => card.type !== CARD_TYPE.basic);

    /* array of artifacts */
    let artifacts = shuffleArray(Object.keys(ARTIFACT_IDs).map(key => {
        ARTIFACT_IDs[key].state = CARD_STATE.inStore;
        return ARTIFACT_IDs[key];
    }));

    let guardians = [];
    for (let key in GUARDIAN_IDs) {
        guardians.push(GUARDIAN_IDs[key]);
    }

    let itemsSetup = drawCards(items, GLOBAL_VARS.itemsInStore);
    let artifactSetup = drawCards(artifacts, GLOBAL_VARS.artifactsInStore);


    for (let card of itemsSetup.drawCards) {
        card.state = CARD_STATE.inStore;
    }
    return {
        itemsOffer: itemsSetup.drawCards,
        artifactsOffer: artifactSetup.drawCards,
        itemsDeck: itemsSetup.deck,
        artifactsDeck: artifactSetup.deck,
        guardians: shuffleArray(guardians),
    }
}

/* INITIAL Locations */
export function getInitialLocations() {
    let locations = LOCATION_IDs;
    for (let key in locations) {
        locations[key].state = (locations[key].level === LOCATION_LEVEL["1"]) ? LOCATION_STATE.explored : LOCATION_STATE.unexplored;
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

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
    return array;
}