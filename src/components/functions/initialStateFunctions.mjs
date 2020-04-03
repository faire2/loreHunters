import {
    ARTIFACT_IDs,
    CARD_STATE,
    CARD_TYPE,
    GUARDIAN_IDs,
    ITEM_IDs,
    LOCATION_IDs,
    LOCATION_LEVEL,
    LOCATION_STATE,
    LOCATION_TYPE
} from "../../data/idLists.mjs";

export const GLOBAL_VARS = Object.freeze({
    handSize: 5,
    initialCards: [{...ITEM_IDs.coin}, {...ITEM_IDs.coin}, {...ITEM_IDs.explore}, {...ITEM_IDs.explore},
        {...ITEM_IDs.fear}, {...ITEM_IDs.fear}],
    itemsInStore: 5,
    artifactsInStore: 1,
    adventurers: 2,
    numOfPlayers: 4,
    playerColors: ["#FFD41A", "#2A8CFF", "#00CD27", "#CD1800"],
});

export const LOCATION_LINE = Object.freeze({
    line1: "line1",
    line2: "line2",
    line3: "line3",
    line4: "line4"
})


/* INITIAL PLAYER STATE */

export const emptyPlayerState = Object.freeze({
    playerIndex: null,
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
    finishedRound: false,
});

export default function getInitialPlayerStates() {
    let playerStates = [];

    for (let i = 0; i < GLOBAL_VARS.numOfPlayers; i++) {
        let playerState = {...emptyPlayerState};
        playerState.playerIndex = i;
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

/* INITIAL LOCATIONS */
export function getInitialLocations() {
    let locations = LOCATION_IDs;
    const locationKeys = shuffleArray(Object.keys(locations));

    /* we need to get the right number of green and brown locations of each location level according to n of players */
    let level1Green = [];
    let level2Green = [];
    let level3Green = [];
    let level1Brown = [];
    let level2Brown = [];
    let level3Brown = [];

    let level2Max;
    let level3Max;

    switch (GLOBAL_VARS.numOfPlayers) {
        case 1:
        case 2:
            level2Max = 2;
            level3Max = 2;
            break;
        case 3:
            level2Max = 3;
            level3Max = 2;
            break;
        case 4:
            level2Max = 4;
            level3Max = 2;
            break;
        default:
            console.log("Unable to process number of players in getInitialLocations: " + GLOBAL_VARS.numOfPlayers);
    }

    for (let i = 0; i < locationKeys.length; i++) {
        let location = locations[locationKeys[i]];
        console.log("location level: " + location.level);
        switch (location.level) {
            case LOCATION_LEVEL["1"]:
                if (location.type === LOCATION_TYPE.brown) {
                    level1Brown.push(location);
                } else if (location.type === LOCATION_TYPE.green) {
                    level1Green.push(location);
                } else {
                    console.log("Unable to process location type in getInitialLocations: ");
                    console.log(location);
                }
                break;
            case LOCATION_LEVEL["2"]:
                if (location.type === LOCATION_TYPE.brown && level2Brown.length < level2Max) {
                    level2Brown.push(location);
                } else if (location.type === LOCATION_TYPE.green && level2Green.length < level2Max) {
                    level2Green.push(location);
                } else {
                    console.log("Unable to process location type in getInitialLocations: ");
                    console.log(location);
                }
                break;
            case LOCATION_LEVEL["3"]:
                if (location.type === LOCATION_TYPE.brown && level3Brown.length < level3Max) {
                    level3Brown.push(location);
                } else if (location.type === LOCATION_TYPE.green && level3Green.length < level3Max) {
                    level3Green.push(location);
                } else {
                    console.log("Unable to process location type in getInitialLocations: ");
                    console.log(location);
                }
                break;
            default:
                console.log("Unable to process location level in getInitialLocations: " + locations[locationKeys[i]]);
        }
    }

    /* level 1 locations start explored, other not */
    for (let key in locations) {
        locations[key].state = (locations[key].level === LOCATION_LEVEL["1"]) ? LOCATION_STATE.explored : LOCATION_STATE.unexplored;
    }

    /* there are is a specific spatial configuration for every player number variation: */
    let line1 = [...level1Brown, LOCATION_IDs.m1, ...level1Green];
    let line2 = [];
    let line3 = [];
    let line4 = [];

    switch (GLOBAL_VARS.numOfPlayers) {
        case 1:
        case 2:
            line2 = [...level2Brown, ...level2Green];
            line3 = [...level3Brown, ...level3Green];
            break;
        case 3:
            line2 = [level2Brown[0], level2Brown[1], level2Green[0], level2Green[1]];
            line3 = [level3Brown[0], level2Brown[2], level2Green[2], level3Green[0]];
            line4 = [level3Brown[1], "empty", level3Green[1]];
            break;
        case 4:
            line2 = [level2Brown[0], level2Brown[1], level2Green[0], level2Green[1]];
            line3 = [level2Brown[2], level2Brown[3], level2Green[2], level2Green[3]];
            line4 = [level3Brown[0], level3Brown[1], level3Green[0], level3Green[1]];
            break;
        default:
            console.log("Unable to process number of players in getInitialLocations: " + GLOBAL_VARS.numOfPlayers);
    }

    for (let location of line1) {
        location.line = LOCATION_LINE.line1;
    }
    for (let location of line2) {
        location.line = LOCATION_LINE.line2;
    }
    for (let location of line3) {
        location.line = LOCATION_LINE.line3;
    }
    if (line4.length > 0) {
        for (let location of line4) {
            if (location !== "empty") {
                location.line = LOCATION_LINE.line4;
            }
        }
    }
    console.log(line1[0]);

    return {
        [LOCATION_LINE.line1]: line1,
        [LOCATION_LINE.line2]: line2,
        [LOCATION_LINE.line3]: line3,
        [LOCATION_LINE.line4]: line4,
    };
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